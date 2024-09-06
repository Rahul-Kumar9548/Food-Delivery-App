import ErrorWrapper from "../utils/ErrorWrapper.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/user.js";

export const postOrder = ErrorWrapper(async (req, res, next) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = req.body;
    console.log(options);
    try {
        const order = await razorpay.orders.create(options);
        console.log(order);
        if (!order) throw new ErrorHandler(500, "Error while creating order!")
        
        res.status(200).json(order);        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})

export const postValidate = ErrorWrapper(async (req, res, next) => {
	const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
	
	try {
		const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
		sha.update(razorpay_order_id + "|" + razorpay_payment_id);
        const expectedSignature = sha.digest("hex");
        if (expectedSignature !== razorpay_signature) {
            throw new ErrorHandler(400, "Invalid Transaction!");
        }

        const user = await User.findOne({ _id: req.user._id });
        user.orderHistory[0].paymentDetails = {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
        }

        await user.save();

        res.status(200).json({
            message: "Transaction Successful!",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
        });
	} catch (error) {
		throw new ErrorHandler(error.statusCode || 500, error.message);
	}
});