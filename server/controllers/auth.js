import User from "../models/users.js";
import customError from "../utils/errors.js";
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
            const user = await User.findOne({ email: req.body.email });
            if (!user) return next(customError(404, "User not found!"));

            const confirmed = bcrypt.compareSync(req.body.password, user.password);
            if (!confirmed)
                return next(customError(400, "Wrong password or email!"));

            const token = jwt.sign(
                {
                    id: user._id,
                    isWorker: user.isWorker,
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

}
export default new AuthControls;  