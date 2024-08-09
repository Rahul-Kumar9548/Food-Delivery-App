import React, { useEffect, useState } from 'react'
import image1 from '../../../../assets/images/food/pikaso_texttoimage_35mm-film-photography-Cover-image-with-a-focus-on-.jpeg'
import HeartIcon from './HeartIcon/HeartIcon';
import StarIcon from './StarIcon/StarIcon';
import OrderOnlineBtn from './OrderOnlineBtn/OrderOnlineBtn';
import restuarant1 from '../../../../assets/images/restaurants/restaurant1.jpeg'
import {Link} from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
	const [cusineList, setCusineList] = useState([])
	// console.log(restaurant.cusines);
	
	let list = restaurant.cusines.map((cusine) => {
		return cusine.category;
	})
	// console.log(list);
	
  return (
		<div>
			<div className="drop-shadow-xl relative w-[10rem] p-3 md:p-4 md:w-[12rem] lg:w-[15rem] max-h-fit overflow-hidden rounded-lg bg-[#ffffff]">
				<img
					src={restaurant.coverImage}
					className="w-full h-[60%] rounded-xl object-cover object-center shadow-nice mb-5"
					alt="image"
				/>
				<HeartIcon />
				<div class="flex w-full justify-between ">
					<div className="font-bold capitalize md:text-sm xl:text-base grow text-xs">
						<Link to={`/restaurant/${restaurant.name}`}>{restaurant.name}</Link>
					</div>
					<div className="flex items-center  space-x-2">
						<StarIcon />
						<span className="text-rating md:text-sm font-semibold">5.0</span>
					</div>
				</div>
				<div className="text-sm capitalize font-semibold text-slate-500 overflow-ellipsis whitespace-nowrap overflow-hidden">
					{list.join(", ")}
				</div>
				<OrderOnlineBtn restaurantName={restaurant.name} />
			</div>
		</div>
  );
}

export default RestaurantCard