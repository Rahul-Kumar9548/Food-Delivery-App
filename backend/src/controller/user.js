import User from '../models/user.js';
import Restaurant from "../models/restaurant.js";
import ErrorHandler from '../utils/ErrorHandler.js';
import ErrorWrapper from '../utils/ErrorWrapper.js';

export const getAddCart = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    let { restaurant_name, category, quantity } = req.query;
    quantity = +quantity;

    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });

        if (!restaurant) {
        throw new ErrorHandler(401,`Restaurant with name ${restaurant_name} is not exists!`);
        }
        
        const {foodItem} = await restaurant.getFoodItem(category, id);

        let cartItem = { food:foodItem, quantity };

        const user = await User.findOne({ _id: req.user._id });

        let existingFoodIndex = user.cart.findIndex(item => item.food._id.toString() === foodItem._id.toString());
        
        if (existingFoodIndex === -1)
            user.cart.unshift(cartItem);
        else
            user.cart[existingFoodIndex].quantity += quantity;
        
        await user.save();

        res.status(200).json({
            message: 'Done',
            data: user.cart
        })
        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})