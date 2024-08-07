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
	postAddReview,
	postUpdateReview,
	getDeleteReview,
	getAllReviews,
	getReview,
	getAllRestaurants,
	getRestaurant,
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

router.post("/add-food-images/:id", upload.array('images', 6), postAddFoodImages);

//Add review
router.post('/add-review', upload.array('images', 12), postAddReview);
router.post("/update-review/:id", postUpdateReview);
router.get('/delete-review/:id', getDeleteReview)
router.get("/get-all-reviews", getAllReviews);
router.get("/get-review/:id", getReview);

//	Get All restaurant
router.get("/all-restaurants", getAllRestaurants);
//	Get Restaurant by name
router.get("/get-restaurant/:name", getRestaurant);

export default router;
