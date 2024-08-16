import express from 'express';
import upload from '../utils/multer.js';
import {
	getProfile,
	postUpdateDetails,
	postAddAddress,
	postUpdateAddress,
	getDeleteAddress,
	getPlaceOrder,
	getOrderHistory,
	getUser,
	getAddFavourite,
	getDeleteFavourite,
} from "../controller/user.js";

const router = express.Router();

router.get("/get-profile", getProfile);
router.post('/update-details', upload.single('image'), postUpdateDetails);
router.post('/add-address', postAddAddress);
router.post('/update-address/:id', postUpdateAddress);
router.get('/delete-address/:id', getDeleteAddress);
router.get('/place-order', getPlaceOrder);
router.get('/order-history', getOrderHistory);
router.get('/get-user', getUser)
router.get("/add-favourite/:id", getAddFavourite);
router.get("/delete-favourite/:id", getDeleteFavourite);


export default router;