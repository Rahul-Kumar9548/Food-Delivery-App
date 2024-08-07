import Restaurant from "../models/restaurant.js";
import ErrorHandler from '../utils/ErrorHandler.js';
import ErrorWrapper from '../utils/ErrorWrapper.js';
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";
import { uploadBatchOnCloudinary } from "../utils/uploadOnCloudinary.js";


export const postRestaurant = ErrorWrapper(async (req, res, next) => {
    const { name, address, contact } = req.body;
    const email = req.body.email || req.user.email;

    if (!email) throw  new ErrorHandler(401,"Please verify youe email and try  again");
    
    const incomingFields = Object.keys(req.body);
    
    //  Identifying the Missing  Fields
    const requiredFields = ['name', 'address', 'contact'];
    const missingFields = requiredFields.filter((field) => !incomingFields.includes(field));

    if (missingFields.length > 0) { // If there are missing fields
        throw new ErrorHandler(401, `Provide missing fields are ${missingFields.join(',')} for add restaurant!`);
    }

    // Checking ki already restaurant hai toh nahi
    let restaurant;
    try {
        restaurant = await Restaurant.findOne({
            $or: [{ name }, { address }]
        });
    } catch (error) {
        throw new ErrorHandler(500, `Error while searching for restaurant!: ${error.message}`);
    }

    if (restaurant) {
        throw new ErrorHandler(401, `Restaurant with name ${name} or address ${address} already exists!`);
    }

    let cloudinaryResponse;
    try {
        cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    } catch (error) {
        throw new ErrorHandler(500, `Error while uploading image on cloudinary!: ${error.message}`);
    }

    try {
        let newRestaurant = await Restaurant.create({
            name,
            address,
            email,
            contact,
            coverImage: cloudinaryResponse.url,
            ownerId: req.user._id
        })

        res.status(201).json({
            success: true,
            message: 'Restaurant added successfully!',
            data: newRestaurant
        })
    } catch (error) {
        throw new ErrorHandler(500, `Error while adding restaurant!: ${error.message}`);
    }
});











export const postCusineCategoryAdd = ErrorWrapper(async (req, res, next) => {
    const { name, restaurant_name } = req.body;
    name = name.trim().toLowerCase();
    restaurant_name = restaurant_name.trim().toLowerCase();

    let newCategoryList = name.split(',');
    newCategoryList = newCategoryList.map((c)=>c.trim().toLowerCase())
    // console.log("New List:", newCategoryList);
    if (!newCategoryList.length) throw new ErrorHandler(400, "Please enter atleast one category");
    
    try {
        let restaurant = await Restaurant.findOne({
            name: restaurant_name
        });
        if (!restaurant) throw new ErrorHandler(404, "Restaurant not found");

        if (restaurant.email !== req.user.email) throw new ErrorHandler(404, "You are not authorize to add cusine to this restaurant");

        let existingCusines = restaurant.cusines
        let existingCategoryList = existingCusines.map((cusine) => {
            return cusine.category;
        })
        // console.log("Existing List: ",existingCategoryList);

        //  filter already exist category from newCategoryList

        newCategoryList = newCategoryList.filter((category) => !existingCategoryList.includes(category));

        // console.log("Unique Category: ",newCategoryList);

        let newCusines = newCategoryList.map((category) => {
            let newCusine = {
                category: category,
                food: []
            }
            return newCusine;
        })
        restaurant.cusines = [...existingCusines, ...newCusines];
        // console.log("Results : ",restaurant.cusines);
        await restaurant.save();
        res.status(201).json({
            success: true,
            meassage: 'Cusine category added successfully',
            restaurant
        })
    } catch (error) {
        throw new ErrorHandler(500, `Error while adding cusine category!: ${error.message}`);
    }
})






export const postAddFoodItem = ErrorWrapper(async (req, res, next) => {
    let { category, name, price, veg, restaurant_name, description } = req.body;
    category = category.trim().toLowerCase();
    name = name.trim().toLowerCase();
    price = price.trim().toLowerCase();
    veg = veg.trim().toLowerCase();
    restaurant_name = restaurant_name.trim().toLowerCase();
    description = description.trim().toLowerCase();


    const incomingFields = Object.keys(req.body);
    
    //  Identifying the Missing  Fields
    const requiredFields = [
		"name",
		"category",
		"price",
		"veg",
		"restaurant_name",
		"description",
    ];
    const missingFields = requiredFields.filter((field) => !incomingFields.includes(field));

    if (missingFields.length > 0) { // If there are missing fields
        throw new ErrorHandler(401, `Provide missing fields are ${missingFields.join(',')} for add food item!`);
    }

     // Checking ki already restaurant hai toh nahi
    let restaurant;
    try {
        restaurant = await Restaurant.findOne({
            name:restaurant_name
        });
    } catch (error) {
        throw new ErrorHandler(500, `Error while searching restaurant for adding food!: ${error.message}`);
    }

    if (!restaurant) {
        throw new ErrorHandler(
			401,
			`Restaurant with name ${restaurant_name} is not exists!`
		);
    }

    if (restaurant.email !== req.user.email) throw new ErrorHandler(404, "You are not authorize to add food to this restaurant");

    //  getting index of category
    let index = -1;
    restaurant.cusines.forEach((cusine, indx) => {
        if (cusine.category === category)
            index = indx;
    })

    if (index == -1) throw new ErrorHandler(404, "This category is not available in this restaurant");

    // console.log("Index; ", index);
    //   Check karo food already hai ya nahi
    let  food;
    food = restaurant.cusines[index]['food'].find((food) => {
        if (food.name == name) return true;
    })

    if(food) throw new ErrorHandler(401, "Food already exists");
    
    let cloudinaryResponse;
    if (req.file.path) {
        try {
            cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            // restaurant.cusines[index].images.unshift({ url:cloudinaryResponse.url})
        } catch (error) {
            throw new ErrorHandler(500, `Error while uploading image on cloudinary!: ${error.message}`);
        }
    }

    let newFoodItem = {
        name,
        price,
        veg,
        description,
        images: [{ url:cloudinaryResponse.url}] || []
    }
    restaurant.cusines[index]["food"].push(newFoodItem);

    await restaurant.save();
    
    res.status(200).json({
        message: "Food item added successfully",
        data: restaurant,
    })

})








export const postUpdateFoodItem = ErrorWrapper(async (req, res) => {
    const { id } = req.params;
    let { name, price, veg, description, category, restaurant_name } = req.body;
    if(category) category = category.trim().toLowerCase();
    if (name) name = name.trim().toLowerCase();
    if (price) price = price.trim().toLowerCase();
    if (veg) veg = veg.trim().toLowerCase();
    if (restaurant_name) restaurant_name = restaurant_name.trim().toLowerCase();
    if (description) description = description.trim().toLowerCase();

    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });

        if (!restaurant) {
        throw new ErrorHandler(401,`Restaurant with name ${restaurant_name} is not exists!`);
        }

        if (restaurant.email !== req.user.email) throw new ErrorHandler(404, "You are not authorize to update food to this restaurant");
        // console.log(restaurant);
        //  getting index of category
        const index = restaurant.cusines.findIndex((cusine) => cusine.category === category);

        if (index == -1) throw new ErrorHandler(404, "This category is not available in this restaurant");
        // console.log('Index: ', index);
        const foodIndex = restaurant.cusines[index]["food"].findIndex((food) => food._id.toString() === id.toString());

        if (foodIndex == -1) throw new ErrorHandler(404, "Please provide the correct food_id to update deatils");
        // console.log("Food Index: ", foodIndex);

        if(name) restaurant.cusines[index]["food"][foodIndex].name = name;
        if(price) restaurant.cusines[index]["food"][foodIndex].price = price;
        if(veg) restaurant.cusines[index]["food"][foodIndex].veg = veg;
        if(description) restaurant.cusines[index]["food"][foodIndex].description = description;

        // console.log(restaurant.cusines[index]["food"][foodIndex]);

        await restaurant.save();

        res.status(200).json({
            message: 'Food Updated Successfully!',
            data: restaurant,
        })

    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }


})









export const getDeleteFoodItem = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { restaurant_name, category } = req.query;

    try {
         const restaurant = await Restaurant.findOne({ name: restaurant_name });

        if (!restaurant) {
        throw new ErrorHandler(401,`Restaurant with name ${restaurant_name} is not exists!`);
        }

        if (restaurant.email !== req.user.email) throw new ErrorHandler(404, "You are not authorize to delete food to this restaurant");
        // console.log(restaurant);
        //  getting index of category
        const index = restaurant.cusines.findIndex((cusine) => cusine.category === category);

        if (index == -1) throw new ErrorHandler(404, "This category is not available in this restaurant");
        // console.log('Index: ', index);
        const foodIndex = restaurant.cusines[index]["food"].findIndex((food) => food._id.toString() === id.toString());

        if (foodIndex == -1) throw new ErrorHandler(404, "Please provide the correct food_id to delete food");

        restaurant.cusines[index]['food'].splice(foodIndex, 1);

        await restaurant.save();

        res.status(200).json({
            message: 'Food Deleted Successfully!',
            data:restaurant
        })


    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})







export const getFoodItem = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { restaurant_name, category } = req.query;

    try {
         const restaurant = await Restaurant.findOne({ name: restaurant_name });

        if (!restaurant) {
        throw new ErrorHandler(401,`Restaurant with name ${restaurant_name} is not exists!`);
        }

        if (restaurant.email !== req.user.email) throw new ErrorHandler(404, "You are not authorize to get food to this restaurant");
        // console.log(restaurant);
        //  getting index of category
        const index = restaurant.cusines.findIndex((cusine) => cusine.category === category);

        if (index == -1) throw new ErrorHandler(404, "This category is not available in this restaurant");
        // console.log('Index: ', index);
        const foodIndex = restaurant.cusines[index]["food"].findIndex((food) => food._id.toString() === id.toString());

        if (foodIndex == -1) throw new ErrorHandler(404, "Please provide the correct food_id to fetch food");

        let food = restaurant.cusines[index]['food'][foodIndex];

        res.status(200).json({
            message: 'Food Fetched Successfully!',
            data:food
        })


    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})






export const getFoodItems = ErrorWrapper(async (req, res, next) => {
	const { restaurant_name, category } = req.query;

	try {
		const restaurant = await Restaurant.findOne({
			name: restaurant_name,
		});

		if (!restaurant) {
			throw new ErrorHandler(
				401,
				`Restaurant with name ${restaurant_name} is not exists!`
			);
		}

		if (restaurant.email !== req.user.email)
			throw new ErrorHandler(
				404,
				"You are not authorize to get food to this restaurant"
			);
		// console.log(restaurant);
		//  getting index of category
		const index = restaurant.cusines.findIndex(
			(cusine) => cusine.category === category
		);

		if (index == -1)
			throw new ErrorHandler(
				404,
				"This category is not available in this restaurant"
			);
		// console.log('Index: ', index);

		let cusine = restaurant.cusines[index];

		res.status(200).json({
			message: "All Food items Fetched of asked category Successfully!",
			data: cusine,
		});
	} catch (error) {
		throw new ErrorHandler(error.statusCode || 500, error.message);
	}
})







export const getAllCusines =  ErrorWrapper(async (req, res, next) => {
	const { restaurant_name } = req.query;

	try {
		const restaurant = await Restaurant.findOne({
			name: restaurant_name,
		});

		if (!restaurant) {
			throw new ErrorHandler(
				401,
				`Restaurant with name ${restaurant_name} is not exists!`
			);
		}

		// if (restaurant.email !== req.user.email)
		// 	throw new ErrorHandler(
		// 		404,
		// 		"You are not authorize to get food to this restaurant"
		// 	);
		// console.log(restaurant);

		let cusines = restaurant.cusines;

		res.status(200).json({
			message: "All cusines items Fetched of asked restaurant Successfully!",
			cusines,
		});
	} catch (error) {
		throw new ErrorHandler(error.statusCode || 500, error.message);
	}
})







export const postAddFoodImages = ErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { restaurant_name, category } = req.body;
   
    try {
        const restaurant = await Restaurant.findOne({ name: restaurant_name });

        if (!restaurant) {
        throw new ErrorHandler(401,`Restaurant with name ${restaurant_name} is not exists!`);
        }

        if (restaurant.email !== req.user.email) throw new ErrorHandler(404, "You are not authorize to get food to this restaurant");
        // console.log(restaurant);
        //  getting index of category
        const index = restaurant.cusines.findIndex((cusine) => cusine.category === category);

        if (index == -1) throw new ErrorHandler(404, "This category is not available in this restaurant");
        // console.log('Index: ', index);
        const foodIndex = restaurant.cusines[index]["food"].findIndex((food) => food._id.toString() === id.toString());

        if (foodIndex == -1) throw new ErrorHandler(404, "Please provide the correct food_id to add images in food");

        let food = restaurant.cusines[index]['food'][foodIndex];

        const images = req.files;
        if (!images) throw new Errorhandler(400, "Please provide images!");
        
        let imagesUrls = [];

        const cloudinaryBatchResult = await uploadBatchOnCloudinary(images)
        
        cloudinaryBatchResult.forEach((image) => {
            let imageUrl = {
                url:image.url
            }
            imagesUrls.push(imageUrl);
        })
        
        food.images = [...imagesUrls, ...food.images];

        await restaurant.save();

        res.status(200).json({
            message: 'Image uploaded Successfully!',
            data:food
        })


    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})




export const postAddReview = ErrorWrapper(async (req, res, next) => {
    const { restaurant_name, message, rating } = req.body;
    const name = req.user.name;
    const userId = req.user._id;
    
    try {
        let restaurant = await Restaurant.findOne({name: restaurant_name});

        if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");

        if (userId.toString() === restaurant.ownerId.toString()) throw new ErrorHandler(400, "You are not authorized to review own restaurant!");
        
        if (Number(rating) < 1 || Number(rating) > 5) throw new ErrorHandler(400, "Please give Valid Rating!");

        if (!message) throw new ErrorHandler(400, 'Please provide review!!!');

        let cloudinaryResponse = await uploadBatchOnCloudinary(req.files);

        let imageUrls = cloudinaryResponse.map((res) => {
            return {
                url: res.url
            }
        })

        const review = {
            username: name,
            rating: +rating,
            message,
            userId,
            images: imageUrls,
        }

        restaurant.reviews.unshift(review);
        await restaurant.save()

        res.status(200).json({
			message: "Review added Successfully!",
			data: restaurant,
		});
        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})

export const postUpdateReview = ErrorWrapper(async (req, res, next) => {
    const { restaurant_name, message, rating } = req.body;
    const userId = req.user._id;
    const { id } = req.params;
    
    try {
        let restaurant = await Restaurant.findOne({name: restaurant_name});

        if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");

        if (userId.toString() === restaurant.ownerId.toString()) throw new ErrorHandler(400, "You are not authorized to review own restaurant!");
        
        if (Number(rating) < 1 || Number(rating) > 5) throw new ErrorHandler(400, "Please give Valid Rating!");

        if (!message) throw new ErrorHandler(400, 'Please provide review!!!');

        let index = restaurant.reviews.findIndex((r) => r._id.toString() === id.toString());

        if (index === -1) throw new ErrorHandler(400, 'Review not found!');

        if(message) restaurant.reviews[index].message = message;
        if(rating) restaurant.reviews[index].rating = rating;
        
        await restaurant.save()

        res.status(200).json({
			message: "Review updated Successfully!",
			data: restaurant.reviews,
		});
        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})

export const getDeleteReview = ErrorWrapper(async (req, res, next) => {
    const { restaurant_name } = req.query;
    const userId = req.user._id;
    const { id } = req.params;
    
    try {
        let restaurant = await Restaurant.findOne({name: restaurant_name});

        if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");

        if (userId.toString() === restaurant.ownerId.toString()) throw new ErrorHandler(400, "You are not authorized to review own restaurant!");

        let index = restaurant.reviews.findIndex((r) => r._id.toString() === id.toString());

        if (index === -1) throw new ErrorHandler(400, 'Review not found!');

        restaurant.reviews.splice(index, 1);
        
        await restaurant.save()

        res.status(200).json({
			message: "Review deleted Successfully!",
			data: restaurant.reviews,
		});
        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})



export const getAllReviews = ErrorWrapper(async (req, res, next) => {
    const { restaurant_name } = req.query;
    
    try {
        let restaurant = await Restaurant.findOne({name: restaurant_name});

        if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");

        if (restaurant.reviews == []) throw new ErrorHandler(400, 'No Reviews, Please Review us!');

        res.status(200).json({
			message: "All Review fetched Successfully!",
			data: restaurant.reviews,
		});
        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})


export const getReview = ErrorWrapper(async (req, res, next) => {
    const { restaurant_name } = req.query;
    const { id } = req.params;
    
    try {
        let restaurant = await Restaurant.findOne({name: restaurant_name});

        if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");

        let index = restaurant.reviews.findIndex((r) => r._id.toString() === id.toString());

        if (index === -1) throw new ErrorHandler(400, 'Review not found!');

        res.status(200).json({
			message: "Requested Review fetched Successfully!",
			data: restaurant.reviews[index],
		});
        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})


export const getAllRestaurants = ErrorWrapper(async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find({});

        res.status(200).json({
            message: 'All Restaurants Fetched Successfully!',
            restaurants
        })
        
    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
})


export const getRestaurant = ErrorWrapper(async (req, res, next) => {
    const { name } = req.params;
    
	try {
        const restaurant = await Restaurant.findOne({
            name
        });

		res.status(200).json({
			message: `Restaurant by name ${name} Fetched Successfully!`,
			restaurant,
		});
	} catch (error) {
		throw new ErrorHandler(error.statusCode || 500, error.message);
	}
});
