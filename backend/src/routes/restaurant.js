import express from "express";
import {
	postRestaurant,
	postCusineCategoryAdd,
	postAddFoodItem,
	postUpdateFoodItem,
} from "../controller/restaurant.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/register", upload.single("coverImage"), postRestaurant);
router.post("/add-cusine-category", postCusineCategoryAdd);
router.post("/add-food-item", upload.single('image'), postAddFoodItem)


// Food CRUD:
router.post('/update-food-item/:id', upload.single('image') ,postUpdateFoodItem);
export default router;
