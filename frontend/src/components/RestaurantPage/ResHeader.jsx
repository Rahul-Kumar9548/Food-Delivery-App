import React, {useState} from 'react'
import StarIcon from '../Home/Restaurants/RestaurantCard/StarIcon/StarIcon';
import { useEffect } from 'react';

const ResHeader = ({ restaurant }) => {
    const [cusines, setCusines] = useState([])
    useEffect(() => {
        let cusinesList = restaurant?.cusines
        cusinesList = cusinesList?.map(cuisine => cuisine.category);
        cusinesList =cusinesList?.slice(0, 4);
        cusinesList = cusinesList?.join(", ")
        console.log(cusinesList);
        setCusines([...cusinesList]);
    }, []);
    
  return (
		<div className="bg-red-300 capitalize w-full p-3 lg:p-5 h-[6rem] lg:h-[10rem]">
			<div className=" flex justify-between text-2xl font-bold ">
				<span>{restaurant.name}</span>
				<div className="bg-green-700 flex justify-center gap-1 items-center p-2 w-fit h-[1.5rem] rounded-lg">
					<span className="text-white text-sm">4.5</span>
					<StarIcon fontSize={"1rem"} fill={"white"} />
				</div>
			</div>
			<div className="">{cusines}</div>
		</div>
  );
}

export default ResHeader