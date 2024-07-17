import User from '../models/user.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import ErrorWrapper from '../utils/ErrorWrapper.js';
import uploadOnCloudinary from '../utils/uploadOnCloudinary.js'

export const postSignup = ErrorWrapper(async (req, res, next) => {
    const { username, password, email, name } = req.body;
    const incomingFields = Object.keys(req.body);
    
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
        cloudinaryResponse = await uploadOnCloudinary(req.file.path);
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


export const postLogin = (req, res) => {
    
}