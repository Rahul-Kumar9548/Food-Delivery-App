import express from 'express';
import upload from '../utils/multer.js';
import { getProfile, postUpdateDetails } from "../controller/user.js";

const router = express.Router();

router.get("/get-profile", getProfile);
router.post('/update-details', upload.single('image'), postUpdateDetails);



export default router;