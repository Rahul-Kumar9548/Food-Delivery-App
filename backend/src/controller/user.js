import User from "../models/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ErrorWrapper from "../utils/ErrorWrapper.js";

export const getProfile = ErrorWrapper(async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user._id }).select('-password -refreshToken -createdAt -updatedAt');

        res.status(200).json({
            message: "User Fetched Successfully!",
            data:user
        })
        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})