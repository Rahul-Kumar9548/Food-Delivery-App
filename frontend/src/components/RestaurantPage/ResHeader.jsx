import React from 'react'
import StarIcon from '../Home/Restaurants/RestaurantCard/StarIcon/StarIcon';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ResHeader = ({ name, address, cusines, isloading }) => {
  
  let cusinesList = cusines?.map(cuisine => cuisine.category);
  cusinesList = cusinesList?.slice(0, 4);
  cusinesList = cusinesList?.join(", ")
  console.log(address);
  console.log(cusinesList);
  return (
		<div className="bg-white capitalize w-full p-3 lg:p-5 ">
			<div className=" flex justify-between text-2xl font-bold ">
				<span className="w-[8rem]">
					{isloading ? (
						<div className="">{name}</div>
					) : (
						<Skeleton />
					)}
				</span>
				<div className="flex gap-1 justify-center items-center">
					<div className="bg-green-700 flex justify-center gap-1 items-center p-2 w-fit h-[1.5rem] rounded-lg">
						<span className="text-white text-sm">4.5</span>
						<StarIcon fontSize={"1rem"} fill={"white"} />
					</div>
					<div
						className="text-slate-500 text-[10px] font-extralight"
						style={{ lineHeight: "10px" }}
					>
						<div className='text-slate-900'>3,054</div>
						<div className=" border-b border-dashed">Rating</div>
					</div>
				</div>
			</div>
			<div className=" text-sm lg:text-base text-slate-600">
				{isloading ? (
					<div className="">{cusinesList}</div>
				) : (
					<Skeleton width={"30%"} />
				)}
				{isloading ? (
					<div className="">{address}</div>
				) : (
					<Skeleton width={"20%"} />
				)}
			</div>
		</div>
  );
}

export default ResHeader