import User from "../models/users.js";
import customError from "../utils/errors.js";
import sendMessage from "../utils/messenger.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


class AuthControls {
    salt = 5
    register = async (req, res, next) => {
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password, this.salt);
            const newUser = new User({
                ...req.body,
                password: hashedPassword,
            });
            await newUser.save();
            res.status(201).send("User created");
        } catch (err) {
            next(err);
        }
    };
    login = async (req, res, next) => {
        try {
            const {email } = req.body
            const user = await User.findOne({ email});
            console.log(user)
            if (!user) return next(customError(404, "User not found!"));

            const confirmed = bcrypt.compareSync(req.body.password, user.password);
            if (!confirmed)
                return next(customError(400, "Wrong password or email!"));

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
                .send(others);
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
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email field must be supplied" });
    try {
      const user = await User.findOne({ email })
      if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ message: "email not registered" })
      const secret = process.env.JWT_KEY + user.password;
      const token = jwt.sign({ email: user.email, id: user._id }, secret, {
        expiresIn: "30m",
      });
      const link = `${process.env.EMAIL_FRONTEND_RESET_LINK}/${user._id}/${token}`;
      // send message
      const ret = sendMessage([user.email,], `Reset Password Your \n ${link}`, 'HotJobSpotter - RESET PASSWORD LINK');
      if (!ret)
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Something Went wrong please try again" })
      return res.status(StatusCodes.OK).json({ message: `resent link sent to ${user.email}. NOTE: password expires in 10 minute` })

    } catch (error) {
      console.log(error)
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
  }
      // changeNow
  changePassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) return res.status(StatusCodes.BAD_REQUEST).json({ status: "User does not exist" });
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
      await jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hashSync(password, this.salt);
      await User.updateOne(
        { _id: id },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
      return res.json({ message: "Password Updated" });
    } catch (error) {
      return res.status(400).json({ message: "reset password link expired" });
    }
  };

}
export default new AuthControls;  