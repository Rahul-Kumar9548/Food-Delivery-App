import express from "express";
import {
	postRestaurant,
	postCusineCategoryAdd,
	postAddFoodItem,
	postUpdateFoodItem,
	getDeleteFoodItem,
	getFoodItem,
	getFoodItems,
	getAllCusines,
	postAddFoodImages,
} from "../controller/restaurant.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/register", upload.single("coverImage"), postRestaurant);
router.post("/add-cusine-category", postCusineCategoryAdd);
router.post("/add-food-item", upload.single('image'), postAddFoodItem)


// Food CRUD:
router.post('/update-food-item/:id', upload.single('image'), postUpdateFoodItem);
router.get('/delete-food-item/:id', getDeleteFoodItem);
router.get("/get-food-item/:id", getFoodItem);
router.get("/get-food-items", getFoodItems);
router.get("/get-all-cusines", getAllCusines);

//  Food --> Image:

router.post("/add-food-images/:id",upload.array('images', 6),postAddFoodImages);


export default router;
