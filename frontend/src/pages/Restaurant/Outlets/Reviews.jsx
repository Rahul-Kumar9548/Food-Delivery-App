import React, { useState, useContext, useRef } from "react";
import { OutletContext } from "../Restaurant";
import FormData from "form-data";
import ReviewCard from "../../../components/RestaurantPage/Outlets/ReviewCard";
import axios from "../../../utils/axios";
import StarRating from "../../../components/RestaurantPage/Outlets/StarRating/StarRating";
import Spinner from "../../../components/Spinner/Spinner";

const Reviews = () => {
	const { user, restaurant, setRestaurant, setAlert, alert } = useContext(OutletContext);
	let reviewRef = useRef();
	let imageRef = useRef();
	const [sendingReview, setSendingReview] = useState(false);
	const [rating, setRating] = useState('')
	const [updateReview, setUpdateReview] = useState(false)
	const [updateReviewId, setUpdateReviewId] = useState('');
	
	// console.log(restaurant);
	function ratingHandler(stars) {
		setRating(stars);
	}

	async function handleSubmit() {
	
		setSendingReview(true);
		let review = reviewRef.current.value.trim();
		let formData = new FormData();

		for(let i = 0; i < imageRef.current.files.length; i++){
			formData.append("images", imageRef.current.files[i]);
		}
		
		formData.append("message", review);
		formData.append("rating", rating);
		formData.append("restaurant_name", restaurant.name);
		
		try {
			const { data } = await axios.post("restaurant/add-review", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(data);	
			reviewRef.current.value = "";
			imageRef.current.value = "";
			setSendingReview(false);
			setRestaurant(data.restaurant);
			setAlert({...alert, success: "Review added successfully!!!"})
		} catch (error) {
			setSendingReview(false);
			setAlert({ ...alert, error: error.response.data.message });
			console.log(error);
		}
	}

	async function deleteReviewHandler(reviewId){
		try {
			const { data } = await axios.get(`restaurant/delete-review/${reviewId}?restaurant_name=${restaurant.name}`);
			// console.log(data);
			setRestaurant(data.restaurant);
			setAlert({ ...alert, success: "Review Deleted successfully!!!" });
		} catch (error) {
			console.log(error)
			setAlert({ ...alert, error: error.response.data.message });
		}
		console.log('Inside Delete', reviewId);
	}

	async function handleUpdateSubmit() {
		setSendingReview(true);
		let review = reviewRef.current.value.trim();
		// console.log("Updated:",review);
		let formData = new FormData();

		formData.append("message", review);
		formData.append("rating", rating);
		formData.append("restaurant_name", restaurant.name);
		console.log(restaurant.name, updateReviewId, review,rating );

		try {
			const { data } = await axios.post(
				`restaurant/update-review/${updateReviewId}`, {
					message: review,
					rating: rating,
					restaurant_name: restaurant.name,
				});
			console.log("Updated data",data);
			reviewRef.current.value = "";
			setRestaurant(data.restaurant);
			console.log("Restaurant:",restaurant);
			setSendingReview(false);
			setAlert({ ...alert, success: "Review Updated successfully!!!" });
			setUpdateReview(false);
		} catch (error) {
			setSendingReview(false);
			setUpdateReview(false);
			setAlert({ ...alert, error: error.response.data.message });
			console.log(error);
		}
		
	}

	function updateReviewHandler(reviewId, message) {
		setUpdateReview(true);
		reviewRef.current.value = message;
		setUpdateReviewId(reviewId);
		// console.log(reviewId, message);
	}

	
	return (
		<div className="w-full h-full lg:grid lg:grid-cols-5 relative">
			{!restaurant.reviews && (
				<div className="col-span-3 text-center">
					<div className="text-xl text-slate-500 mt-[30%]">
						No reviews
					</div>
				</div>
			)}
			{restaurant.reviews && (
				<div className="col-span-3">
					<div className=" text-slate-500 flex flex-col gap-2 p-2 h-full">
						{restaurant.reviews.map((review) => (
							<ReviewCard
								key={review._id}
								review={review}
								deleteReviewHandler={
									deleteReviewHandler
								}
								user={user}
								updateReviewHandler={
									updateReviewHandler
								}
							/>
						))}
					</div>
				</div>
			)}
			<div id="#edit" className="col-span-2 p-2 ">
				<div className="sticky shadow-nice rounded-xl border-none bg-white top-[190px] h-fit p-5 mt-1 border-l-slate-300">
					<h2 className="text-xl font-semibold text-slate-800 mb-4">
						{updateReview ? "Update Review:" : "Write a Review:"}
					</h2>
					<textarea
						className="bg-orange-100 w-full h-[15rem] rounded-lg border-2  focus:outline-orange-500"
						name=""
						id=""
						ref={reviewRef}
					></textarea>
					<div>
						<div className="flex gap-2 items-center my-2">
							<span>Rating: </span>{" "}
							<StarRating ratingHandler={ratingHandler} />
						</div>
						{!updateReview ?<input
							className="image-upload block w-10/12 text-sm  border border-gray-300 rounded cursor-pointer bg-gray-50 text-gray-400 focus:outline-none"
							id="file_input"
							type="file"
							multiple
							ref={imageRef}
						/>: null}
						{!updateReview && (
							<button
								className="py-3 px-[2.5rem] rounded-full text-sm bg-[#E9563C] mt-4 shadow-nice transition-all duration-300 hover:scale-110 hover:bg-[#23c483] hover:translate-y-[-7px] active:translate-y-[-1px] text-white"
								onClick={handleSubmit}
							>
								{sendingReview ? (
									<Spinner className={"h-4 w-4"} />
								) : (
									"REVIEW"
								)}
							</button>
						)}
						{updateReview && (
							<button
								className="py-3 px-[2.5rem] rounded-full text-sm bg-[#E9563C] mt-4 shadow-nice transition-all duration-300 hover:scale-110 hover:bg-[#23c483] hover:translate-y-[-7px] active:translate-y-[-1px] text-white"
								onClick={handleUpdateSubmit}
							>
								{sendingReview ? (
									<Spinner className={"h-4 w-4"} />
								) : (
									"UPDATE"
								)}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Reviews;
