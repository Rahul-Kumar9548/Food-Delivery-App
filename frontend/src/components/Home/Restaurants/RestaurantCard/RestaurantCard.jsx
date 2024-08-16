import React, { useEffect, useState, useRef } from 'react'
import image1 from '../../../../assets/images/food/pikaso_texttoimage_35mm-film-photography-Cover-image-with-a-focus-on-.jpeg'
import HeartIcon from './HeartIcon/HeartIcon';
import StarIcon from './StarIcon/StarIcon';
import OrderOnlineBtn from './OrderOnlineBtn/OrderOnlineBtn';
import restuarant1 from '../../../../assets/images/restaurants/restaurant1.jpeg'
import { Link } from 'react-router-dom';
import canvasLoader from '../../../../utils/canvasLoader';
import Skeleton from 'react-loading-skeleton';
import DeleteBtnSmall from '../../../DeleteBtn/DeleteBtnSmall';

const RestaurantCard = ({ restaurant, isLoading, addToFavourite, onFavourite, deleteBtnHandler }) => {
	const [imageData, setImageData] = useState(null);
	const canvasRef = useRef(null);

	useEffect(() => {
		if (!isLoading) {
			canvasLoader(restaurant.coverImageHash, canvasRef, setImageData);
		}
	}, []);

	let list = restaurant.cusines.map((cusine) => {
		return cusine.category;
	});

	return (
		<>
			{isLoading ? (
				<div className="shadow-3d rounded-lg">
					<div className="relative w-[10rem] p-3 md:p-4 md:w-[12rem] lg:w-[15rem] max-h-fit overflow-hidden rounded-lg bg-[#ffffff] hover:scale-110 transition-all duration-300">
						<img
							src={restaurant.coverImage}
							className="w-full h-[60%] rounded-xl object-cover object-center shadow-nice mb-5"
							alt="image"
							loading="lazy"
							ref={canvasRef}
						/>
						{onFavourite ? (
							<DeleteBtnSmall
								deleteBtnHandler={deleteBtnHandler}
								restaurantId={restaurant._id}
							/>
						) : (
							<HeartIcon
								addToFavourite={addToFavourite}
								restaurantId={restaurant._id}
							/>
						)}
						<div class="flex w-full justify-between ">
							<div className="font-bold capitalize md:text-sm xl:text-base grow text-xs">
								<Link
									to={`/restaurant/${restaurant.name}`}
								>
									{restaurant.name}
								</Link>
							</div>
							<div className="flex items-center  space-x-2">
								<StarIcon />
								<span className="text-rating md:text-sm font-semibold">
									5.0
								</span>
							</div>
						</div>
						<div className="text-sm capitalize font-semibold text-slate-500 overflow-ellipsis whitespace-nowrap overflow-hidden">
							{list.join(", ")}
						</div>
						<OrderOnlineBtn
							restaurantName={restaurant.name}
						/>
					</div>
				</div>
			) : (
				<div className="relative w-[10rem] p-3 md:p-4 md:w-[12rem] lg:w-[15rem] h-[12rem] lg:h-[20rem] lg:pb-4 overflow-hidden rounded-lg bg-[#ffffff]">
					<canvas
						className="animate-pulse w-full h-[70%] lg:h-[70%] rounded-xl object-cover object-center shadow-nice mb-2 lg:mb-5"
						ref={canvasRef}
					></canvas>
					<Skeleton width={"90%"} height={"6%"} />
					<Skeleton width={"60%"} height={"6%"} />
					<div className="hidden lg:block ">
						<Skeleton width={"40%"} height={"6%"} />
					</div>
				</div>
			)}
		</>
	);
};

export default RestaurantCard