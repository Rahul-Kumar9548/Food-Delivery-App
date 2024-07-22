import express from 'express';
import { getProfile } from '../controller/user.js';

const router = express.Router();

router.get("/get-profile", getProfile);




export default router;