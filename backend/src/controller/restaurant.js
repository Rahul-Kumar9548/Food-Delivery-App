import Restaurant from "../models/restaurant.js";
import ErrorHandler from '../utils/ErrorHandler.js';
import ErrorWrapper from '../utils/ErrorWrapper.js';
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";


export const postRestaurant = ErrorWrapper(async (req, res, next) => {
    const { name, address, email, contact } = req.body;
    
    const incomingFields = Object.keys(req.body);
    
    //  Identifying the Missing  Fields
    const requiredFields = ['name', 'address', 'email', 'contact'];
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
            coverImage: cloudinaryResponse.url
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

    let newCategoryList = name.split(',');
    newCategoryList = newCategoryList.map((c)=>c.trim().toLowerCase())
    // console.log("New List:", newCategoryList);
    if (!newCategoryList.length) throw new ErrorHandler(400, "Please enter atleast one category");
    
    try {
        let restaurant = await Restaurant.findOne({
            name: restaurant_name
        });
        if (!restaurant) throw new ErrorHandler(404, "Restaurant not found");

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