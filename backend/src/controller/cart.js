import User from '../models/user.js';
import Restaurant from "../models/restaurant.js";
import ErrorHandler from '../utils/ErrorHandler.js';
import ErrorWrapper from '../utils/ErrorWrapper.js';

export const getAddCart = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    let { restaurant_name, category } = req.query;
    // quantity = +quantity;
    let quantity = 1;

    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });

        if (!restaurant) {
        throw new ErrorHandler(401,`Restaurant with name ${restaurant_name} is not exists!`);
        }
        
        const {foodItem} = await restaurant.getFoodItem(category, id);

        let cartItem = { food:foodItem, quantity, restaurant_name, category };

        const user = await User.findOne({ _id: req.user._id });

        let existingFoodIndex = user.cart.findIndex(item => item.food._id.toString() === foodItem._id.toString());
        
        if (existingFoodIndex === -1)
            user.cart.unshift(cartItem);
        else
            user.cart[existingFoodIndex].quantity += quantity;
        
        await user.save();

        res.status(200).json({
            message: 'Requested Food Item added to cart successfully!',
            cart: user.cart,
        })
        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})

export const getCartItemIncrease = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    let { restaurant_name, category } = req.query;

    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });

        if (!restaurant) {
        throw new ErrorHandler(401,`Restaurant with name ${restaurant_name} is not exists!`);
        }
        
        const {foodItem} = await restaurant.getFoodItem(category, id);

        const user = await User.findOne({ _id: req.user._id });

        let existingFoodIndex = user.cart.findIndex(item => item.food._id.toString() === foodItem._id.toString());

        if(existingFoodIndex === -1) throw new ErrorHandler(401,`Food Item with id ${id} is not exists in your cart!`);
        
        user.cart[existingFoodIndex].quantity ++;
        
        let totalPrice = 0;
		user.cart.forEach((cartItem) => {
			let price = cartItem.quantity * cartItem.food.price;
			// console.log(cartItem.food.name, price);
			totalPrice = totalPrice + price;
		});

        await user.save();

        res.status(200).json({
			message: "Cart Item quantity increased Successfully!",
            cart: user.cart,
            totalPrice,
		});
        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})

export const getCartItemDecrease = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    let { restaurant_name, category } = req.query;

    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });

        if (!restaurant) {
        throw new ErrorHandler(401,`Restaurant with name ${restaurant_name} is not exists!`);
        }
        
        const { foodItem } = await restaurant.getFoodItem(category, id);
        
        const user = await User.findOne({ _id: req.user._id });
        
        let existingFoodIndex = user.cart.findIndex(item => item.food._id.toString() === foodItem._id.toString());
        
        if(existingFoodIndex === -1) throw new ErrorHandler(401,`Food Item with id ${id} is not exists in your cart!`);
        
        user.cart[existingFoodIndex].quantity--;

        if (user.cart[existingFoodIndex].quantity < 1)
            user.cart.splice(existingFoodIndex, 1);
        let totalPrice = 0;
		user.cart.forEach((cartItem) => {
			let price = cartItem.quantity * cartItem.food.price;
			// console.log(cartItem.food.name, price);
			totalPrice = totalPrice + price;
		});
        
        await user.save();

        res.status(200).json({
            message: 'Cart Item quantity decreased Successfully!',
            cart: user.cart,
            totalPrice,
        })
        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})

export const getCartItemDelete = ErrorWrapper(async (req, res, next) => {
	const { id } = req.params;
	let { restaurant_name, category } = req.query;

	try {
		const restaurant = await Restaurant.findOne({
			name: restaurant_name,
		});

		if (!restaurant) {
			throw new ErrorHandler(
				401,
				`Restaurant with name ${restaurant_name} is not exists!`
			);
		}

		const { foodItem } = await restaurant.getFoodItem(category, id);

		const user = await User.findOne({ _id: req.user._id });

		let existingFoodIndex = user.cart.findIndex(
			(item) => item.food._id.toString() === foodItem._id.toString()
		);

		if (existingFoodIndex === -1)
			throw new ErrorHandler(
				401,
				`Food Item with id ${id} is not exists in your cart!`
			);

        user.cart.splice(existingFoodIndex, 1);

        let totalPrice = 0;
		user.cart.forEach((cartItem) => {
			let price = cartItem.quantity * cartItem.food.price;
			// console.log(cartItem.food.name, price);
			totalPrice = totalPrice + price;
		});

		await user.save();

		res.status(200).json({
			message: "Cart Item deleted Successfully!",
            cart: user.cart,
            totalPrice,
		});
	} catch (error) {
		throw new ErrorHandler(error.statusCode || 500, error.message);
	}
});




export const getCartItems = ErrorWrapper(async (req, res, next) => {

	try {
        const user = await User.findOne({ _id: req.user._id });

        let totalPrice = 0;
		user.cart.forEach((cartItem) => {
			let price = cartItem.quantity * cartItem.food.price;
			// console.log(cartItem.food.name, price);
			totalPrice = totalPrice + price;
		});

		res.status(200).json({
			message: "Cart Items fetched Successfully!",
            cart: user.cart,
            totalPrice
		});
	} catch (error) {
		throw new ErrorHandler(error.statusCode || 500, error.message);
	}
})