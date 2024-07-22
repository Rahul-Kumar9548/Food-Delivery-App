import express from 'express';
import { getAddCart } from '../controller/user.js';

const router = express.Router();


router.get("/add-cart/:id", getAddCart);
// router.get("/delete")






export default router;
// HOMEWORK
// - CRUD CART
// CRUD DETAILS
// RAZORPAY API DUMMY INTEGRATION
// CR - ORDER HISTORY
