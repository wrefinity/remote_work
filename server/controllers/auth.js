import User from "../models/users.js";
import Token from "../models/Token.js"
import customError from "../utils/errors.js";
import sendMessage from "../utils/messenger.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto"

class AuthControls {
  salt = 5
  register = async (req, res, next) => {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, this.salt);
      const newUser = new User({
        ...req.body,
        password: hashedPassword,
      });
      const user = await newUser.save();
      if (!user.verified) {
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
          token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();


          const url = `${process.env.BASE_URL}users_verification/${user._id}/${token.token}`;
          const ret = await sendMessage([user.email,], `Activate Your Account \n ${url}`, 'JOBSPOTTER - ACTIVATION LINK')
          if (!ret)
            return res.status(400).send("Something Went wrong please try again")
        }
        return res.status(200).send("Kindly check your email for accout confirmation")
      }
      res.status(200).send("Kindly check your email for accout confirmation");
    } catch (error) {

      if (error.name === 'MongoServerError' && error.code === 11000) {
        // next(customError(400, ))
        return res.status(400).send(`${req.body.email} already registered`)
      } else {
        // Handle other errors

        res.status(400).send("ensure all fields are provided with exception to image");
      }

    }
  };
  login = async (req, res, next) => {
    try {
      const { email } = req.body
      const user = await User.findOne({ email });
      if (!user) return res.status(404).send("User not found!");


      if (!user.verified) {
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
          token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();


          const url = `${process.env.BASE_URL}users_verification/${user._id}/${token.token}`;
          const ret = await sendMessage([user.email,], `Activate Your Account \n ${url}`, 'JOBSPOTTER - ACTIVATION LINK')
          if (!ret)
            return res.status(400).send("Something Went wrong please try again")
        }

        return res.status(400).send("A confirmation email was sent to your account please verify")

      }

      const confirmed = bcrypt.compareSync(req.body.password, user.password);
      if (!confirmed)
        return res.status(400).send("Wrong password or email!");



      const token = jwt.sign(
        {
          id: user._id,
          isSeller: user.isSeller,
        },
        process.env.JWT_KEY
      );

      const { password, ...others } = user._doc;
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .send({...others, token});
    } catch (err) {
      next(err);
    }
  };

  logout = async (req, res) => {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out.");
  };

  // reset link sender
  reset_link = async (req, res) => {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .send("Email field must be supplied");
    try {
      const user = await User.findOne({ email })
      if (!user) return res.status(400).send("email not registered")

      let token = await Token.findOne({ userId: user._id });
      if (!token) {
          token = await new Token({
              userId: user._id,
              token: crypto.randomBytes(32).toString("hex"),
          }).save();
      }

      const link = `${process.env.EMAIL_FRONTEND_RESET_LINK}/${user._id}/${token.token}`;
      // send message
      const ret = sendMessage([user.email,], `Reset Password Your \n ${link}`, 'HotJobSpotter - RESET PASSWORD LINK');
      if (!ret)
        return res.status(400).send("Something Went wrong please try again")
      return res.status(200).send(`reset link sent to ${user.email}. NOTE: password expires in 10 minute`)

    } catch (error) {
      return res.status(400).send(error.message)
    }
  }
  // changeNow
  changePassword = async (req, res) => {
    const { password } = req.body;

    const oldUser = await User.findById(req.params.id);
    if (!oldUser) return res.status(400).send("User does not exist");

    try {
      const token_model = await Token.findOne({
        userId: oldUser._id,
        token: req.params.token,
      });
      if (!token_model) return res.status(400).send("Invalid link or expired");

      const hashedPassword = bcrypt.hashSync(req.body.password, this.salt);
      oldUser.password = hashedPassword;
      await oldUser.save();
      // await token_model.remove();
      await Token.deleteOne({ _id: token_model._id });
      return res.status(200).send("password reset")
    } catch (error) {
      return res.status(400).send("An error occured");
    }
  };

  confirmRegistration = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send("Invalid link");

      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token.toString(),
      });
      if (!token) return res.status(400).send("Invalid link");
      // await User.updateOne({ _id: user._id, verified: true });
      await User.updateOne({ _id: user._id }, { verified: true });

      // await token.remove();
      await Token.deleteOne({ _id: token._id });

      res.status(200).send("Email verified successfully");
    } catch (error) {
      res.status(500).send("token not found");
    }
  };

}
export default new AuthControls;  