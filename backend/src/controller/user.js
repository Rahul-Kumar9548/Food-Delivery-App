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





export const postUpdateAddress = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { name, contact, location, landmark } = req.body;
    
    try {

        const user = await User.findOne({ _id: req.user._id });

        let addressIndex = user.addresses.findIndex(address => address._id.toString() === id.toString());

        if (addressIndex === -1) throw new ErrorHandler(404, `Address with id: ${id} not found!`);
        
        if (name) user.addresses[addressIndex].name = name;
        if (contact) user.addresses[addressIndex].contact = contact;
        if (location) user.addresses[addressIndex].location = location;
        if (landmark) user.addresses[addressIndex].landmark = landmark;
        

        await user.save();
        
        res.status(200).json({
            message: 'Address updated successfully!',
            data: user.addresses
        })
        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})
    




export const getDeleteAddress = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    
    try {

        const user = await User.findOne({ _id: req.user._id });

        let addressIndex = user.addresses.findIndex(address => address._id.toString() === id.toString());

        if (addressIndex === -1) throw new ErrorHandler(404, `Address with id: ${id} not found!`);
        
        user.addresses.splice( addressIndex, 1 );

        await user.save();
        
        res.status(200).json({
            message: 'Address Deleted successfully!',
            data: user.addresses
        })
        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})




export const getPlaceOrder = ErrorWrapper(async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        
        let cart = user.cart;

        let newOrder = {
            items:cart
        }
        user.orderHistory.unshift(newOrder);
        user.cart = [];
        await user.save();

        res.status(200).json({
            message: 'Order Placed successfully!',
            data: newOrder
        })
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})



export const getOrderHistory = ErrorWrapper(async (req, res, next) => {
    try {
        
        const user = await User.findOne({ _id: req.user._id });
        res.status(200).json({
            message: 'Order History Fetched Successfully!!',
            data: user.orderHistory
        })
    } catch (error) {
        throw  new ErrorHandler(error.statusCode || 500, error.message); 
    }
})

export const getUser = ErrorWrapper(async (req, res, next) => {
    try {
        
        const user = await User.findOne({ _id: req.user._id }).select("-password -refreshToken");
        res.status(200).json({
            message: 'User Fetched Successfully!!',
            user
        })
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})

export const getAddFavourite = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    // console.log(id);
    try {
        const user = await User.findOne({ _id: req.user._id })
        
        let favRestaurant = {
            restaurantId: id,
        }
        let favIds = user.favourites.map((restaurant) => restaurant.restaurantId)
    
        if (!favIds.includes(id)) user.favourites.unshift(favRestaurant);
        let msg;
        if (favIds.includes(id)) msg = "Restaurant already added to favourite!"
            
        await user.save();
		res.status(200).json({
			message: msg|| "Restaurant added to favourite successfully!!",
		});
    } catch (error) {
		throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})

export const getDeleteFavourite = ErrorWrapper(async (req, res, next) => {
     const { id } = req.params;
	// console.log(id);
	try {
		const user = await User.findOne({ _id: req.user._id });

        let favIds =[];
        user.favourites.forEach((fav) => {
            if (!(fav.restaurantId == id))
                favIds.push(fav);
        });
        
        user.favourites = favIds;
		await user.save();
		res.status(200).json({
			message: "Restaurant removed from favourite successfully!!",
		});
	} catch (error) {
		throw new ErrorHandler(error.statusCode || 500, error.message);
	}
})