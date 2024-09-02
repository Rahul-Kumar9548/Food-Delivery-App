import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
});

const uploadOnCloudinary = async (filePath) => {
    console.log("FilePath", filePath)
    try {
        if (!filePath) return null;
        
        console.log('Uploading file to cloudinary...');
        const response = await cloudinary.uploader.upload(filePath);
        
        console.log("File is uploaded on cloudinary", response.url);
        fs.unlinkSync(filePath);
        return response;
    }
    catch (error) {
        fs.unlinkSync(filePath);
        console.error("Error uploading file on cloudinary", err);
        return error;
    }

}

async function uploadBatchOnCloudinary(images) {
    try {
        console.log("Uploading batch of images to cloudinary...");

        const promises = images.map(async (image) => {
            const response = await cloudinary.uploader.upload(image.path);
            return response;
        })

        const results = await Promise.all(promises);

        console.log("Batch of images uploaded on cloudinary");

        images.map((image) => fs.unlinkSync(image.path));

        return results;
    } catch (error) {
        images.map((image) => fs.unlinkSync(image.path));
        throw new ErrorHandler(500, "Error uploading batch of images on cloudinary", error);
    }
}

export default uploadOnCloudinary;
export { uploadBatchOnCloudinary };