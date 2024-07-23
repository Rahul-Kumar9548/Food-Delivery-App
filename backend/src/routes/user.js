import express from 'express';
import upload from '../utils/multer.js';
import {
	getProfile,
	postUpdateDetails,
	postAddAddress,
	postUpdateAddress,
	getDeleteAddress,
} from "../controller/user.js";

const router = express.Router();

router.get("/get-profile", getProfile);
router.post('/update-details', upload.single('image'), postUpdateDetails);
router.post('/add-address', postAddAddress);
router.post('/update-address/:id', postUpdateAddress);
router.get('/delete-address/:id', getDeleteAddress);



export default router;