import React, { useEffect, useState } from 'react'
import image1 from '../../../../assets/images/food/pikaso_texttoimage_35mm-film-photography-Cover-image-with-a-focus-on-.jpeg'
import HeartIcon from './HeartIcon/HeartIcon';
import StarIcon from './StarIcon/StarIcon';
import OrderOnlineBtn from './OrderOnlineBtn/OrderOnlineBtn';
import restuarant1 from '../../../../assets/images/restaurants/restaurant1.jpeg'
const RestaurantCard = ({ restaurant }) => {
	const [cusineList, setCusineList] = useState([])
	// console.log(restaurant.cusines);
	
	let list = restaurant.cusines.map((cusine) => {
		return cusine.category;
	})
	// console.log(list);
	
  return (
		<div>
			<div className="drop-shadow-xl relative p-4 w-[15rem] max-h-fit overflow-hidden rounded-lg bg-[#ffffff]">
				<img
					src={restaurant.coverImage}
					className="w-full h-[60%] rounded-xl object-cover object-center shadow-nice mb-5"
					alt="image"
				/>
				<HeartIcon />
				<div class="flex w-full justify-between ">
					<div className="font-bold capitalize">
						{restaurant.name}
					</div>
					<div className="flex items-center  space-x-2">
						<StarIcon />
						<span className="text-sm font-semibold">5.0</span>
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