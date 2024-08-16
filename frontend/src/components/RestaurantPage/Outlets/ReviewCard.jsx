import React, { useEffect, useState, useRef } from 'react'
import formatDateTime from '../../../utils/formatDateTime';

const ReviewCard = ({
	review,
	deleteReviewHandler,
	user,
	updateReviewHandler,
}) => {
	const { username, message, rating, userImage, date, images, userId } =
		review;
	let ratingStars = [" ", "★", "★★", "★★★", "★★★★", "★★★★★"];

	const formattedDate = formatDateTime(date);

	function editHandler(reviewId) {
		updateReviewHandler(reviewId, message, rating);
		// console.log(reviewId, message, rating);
	}

	return (
		<>
			<div class="flex shadow-nice flex-col p-4 lg:p-8 rounded-2xl border bg-white">
				<div class="flex">
					<div class="flex gap-4 items-center">
						{userImage ? (
							<img
								src={userImage}
								className="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] rounded-full"
								alt="profile"
							/>
						) : (
							<img
								src="https://img.icons8.com/?size=48&id=23240&format=png"
								className="w-[50px] h-[50px] rounded-full"
								alt=""
							/>
						)}
						<div class="flex text-sm lg:text-lg text-[#4b587c] font-semibold capitalize cursor-pointer">
							{username}
						</div>
					</div>
				</div>
				<div class="mt-2 lg:mt-4 text-orange-500 text-sm lg:text-xl relative tracking-[2px]">
					<span className="text-slate-400">★★★★★</span>
					<span className="absolute left-0">
						{ratingStars[rating]}
					</span>
				</div>
				<div class="italic lg:mt-2 text-sm lg:text-[18px] text-[#4b587c] captalize font-normal">
					{message}
				</div>
				<div className="flex flex-wrap gap-3 mt-2">
					{images.map((image) => (
						<a
							href={image.url}
							target='_blank'
						>
							<img
								className="hover:scale-110  transition-all duration-300 w-[50px] h-[50px] lg:w-[100px] lg:h-[100px]"
								src={image.url}
								alt="image"
							/>
						</a>
					))}
				</div>

				<div class="flex gap-2 text-[#4b587c] text-[10px] lg:text-[12px] mt-4 relative">
					<span class="cursor-pointer">{formattedDate}</span>
					<span class="-mt-3 cursor-pointer text-xl tracking-[1px]">
						.
					</span>
					{userId === user._id && (
						<div className="flex gap-2">
							<a href="#edit">
								<span
									className="hover:text-orange-500 cursor-pointer"
									onClick={() => {
										editHandler(review._id);
									}}
								>
									Edit
								</span>
							</a>
							<span class="-mt-3 cursor-pointer text-xl tracking-[1px]">
								.
							</span>
							<span
								className="hover:text-orange-500 cursor-pointer"
								onClick={() => {
									deleteReviewHandler(review._id);
								}}
							>
								Delete
							</span>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default ReviewCard