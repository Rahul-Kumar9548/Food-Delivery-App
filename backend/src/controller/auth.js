import User from '../models/user.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import ErrorWrapper from '../utils/ErrorWrapper.js';
import uploadOnCloudinary from '../utils/uploadOnCloudinary.js'
import jwt from 'jsonwebtoken'
import fs from 'fs';

export const postSignup = ErrorWrapper(async (req, res, next) => {
    const { username, password, email, name } = req.body;
    const incomingFields = Object.keys(req.body);
    // console.log("Request Aai for signup!!");
    // console.log("Req:", req.files.image);
    // console.log('Req Body:', req.body);
    //  Identifying the Missing  Fields
    const requiredFields = ['username', 'password', 'email', 'name'];
    const missingFields = requiredFields.filter((field) => !incomingFields.includes(field));

    if (missingFields.length > 0) { // If there are missing fields
        throw new ErrorHandler(401, `Provide missing fields are ${missingFields.join(',')} in Signup!`);
    }

    //  Checking User is already exist or not 
    let existingUser = await User.findOne({
        $or: [
            { username },
            {email}
        ]
    })
    if (existingUser) {
        throw new ErrorHandler(401, `User with ${username} or ${email} already exist!`);
    }
    
    //  Uploading Image to cloudinary and getting url to save in DB
    let cloudinaryResponse;
    try {
        cloudinaryResponse = await uploadOnCloudinary(req.files.image.tempFilePath);
    } catch (error) {
        throw new ErrorHandler(500, `Error while uploading image ${error.message}`);
    }

    //  Creating new user 
    try {
        const newUser = await User.create({
            username,
            password,
            email,
            name,
            image: cloudinaryResponse.secure_url
        });

        // newUser.save();
        console.log('New User Created Successfully!');

        //  Getting created user and sending user without password
        let user = await User.findOne({
            _id: newUser._id
        }).select('-password');

        res.status(201).json({
            success: true,
            user: user
        })
    } catch (error) {
        throw new ErrorHandler(500, `Error while creating new user ${error.message}`);
    }
}
)


const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        let user = await User.findOne({
            _id: userId
        })
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        throw new ErrorHandler(500, `Error while generating access token and refresh token:  ${error.message}`);
    }
}


export const postLogin = ErrorWrapper(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        throw new ErrorHandler(400, 'Please enter either username or email!');
    }

    if (!password) {
        throw new ErrorHandler(400, "Please provide your passord!");
    }

    let user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ErrorHandler(400, 'Invalid username or email!');
    }

    let passwordMatch = await user.isPasswordCorrect(password);
    if (!passwordMatch) {
        throw new ErrorHandler(401, "Invalid password!");
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
    
    user.refreshToken = refreshToken;
    
    await user.save();

    user = await User.findOne({
        $or:[{username}, {email}]
    }).select( '-password -refreshToken -createdAt -updatedAt');

    res.status(200)
        .cookie("RefreshToken", refreshToken, {
            httpOnly: false, // Set to false if you need to access the cookie on the frontend
            secure: true, // Required for HTTPS
            sameSite: 'None', // Required for cross-site requests
        })
        .cookie("AccessToken", accessToken, {
            httpOnly: false, // Set to false if you need to access the cookie on the frontend
            secure: true, // Required for HTTPS
            sameSite: 'None', // Required for cross-site requests
        })
        .json({
        message: "Login Successful!",
        success: true,
            user
    })
})