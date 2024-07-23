import User from "../models/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ErrorWrapper from "../utils/ErrorWrapper.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

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



export const postUpdateDetails = ErrorWrapper(async (req, res, next) => {
    const { name, username, email, password } = req.body;

    try {
        const user = await User.findOne({ _id: req.user._id });
        if (name) user.name = name;
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password;
        
        let cloudinaryResponse 
        if (req.file) {
            cloudinaryResponse = await uploadOnCloudinary(req.file.path)
            user.image = cloudinaryResponse.url;
        }

        await user.save();
        req.user = user;

        res.status(200).json({
            message: 'User details updated Successfully!',
            data: user
        })
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})



export const postAddAddress = ErrorWrapper(async (req, res, next) => {
    const { name, contact, location, landmark } = req.body;
    
    // console.log(name, contact, location, landmark);
    try {

        const incomingFields = Object.keys(req.body);
    
        //  Identifying the Missing  Fields
        const requiredFields = ['name', 'location', 'contact', 'landmark'];
        const missingFields = requiredFields.filter((field) => !incomingFields.includes(field));

        if (missingFields.length > 0) { // If there are missing fields
            throw new ErrorHandler(401, `Provide missing fields: ${missingFields.join(',')} for adding addess!`);
        }

        const user = await User.findOne({ _id: req.user._id });

        let newAddress = {
            name,
            contact,
            location,
            landmark
        }

        user.addresses.unshift(newAddress);

        await user.save();
        
        res.status(200).json({
            message: 'Address added successfully!',
            data: user.addresses
        })
        
    } catch(error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})