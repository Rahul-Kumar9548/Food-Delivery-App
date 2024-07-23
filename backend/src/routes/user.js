import express from 'express';
import upload from '../utils/multer.js';
import {
	getProfile,
	postUpdateDetails,
	postAddAddress,
} from "../controller/user.js";

const router = express.Router();

router.get("/get-profile", getProfile);
router.post('/update-details', upload.single('image'), postUpdateDetails);
router.post('/add-address', postAddAddress);



export default router;