import User from "../models/users.js";
import customError from "../utils/errors.js";


class UserControls {
    deleteUser = async (req, res, next) => {
        const {id} = req.params
        const user = await User.findById(id);
        if (req.userId !== user._id.toString()) {
            return next(customError(403, "You can delete only your account!"));
        }
        try {
            const deletedUser = await User.findOneAndUpdate(
                { id},
                {
                    $set: {
                        isDeleted: true,
                    },
                },
                { new: true }
            );

            res.status(200).send("deleted");
        } catch (err) {
            next(err);
        }
    };
    getUser = async (req, res, next) => {
        const {id} = req.params
        const user = await User.findById(id);
        res.status(200).send(user);
    };

}

export default new UserControls