import React,{useEffect, useState} from 'react'
import RestaurantCard from './RestaurantCard/RestaurantCard';

const Restaurants = ({ restaurants, isLoading, addToFavourite, onFavourite, deleteBtnHandler }) => {
	return (
		<div className="p-5 px-1 gap-2 md:gap-10 md:gap-x-[0.5rem] md:p-[1rem] lg:p-10 w-full h-fit flex flex-wrap justify-evenly">
			{restaurants?.map((restaurant) => (
				<RestaurantCard
					key={restaurant._id}
					restaurant={restaurant}
					isLoading={isLoading}
					addToFavourite={addToFavourite}
					onFavourite={onFavourite}
					deleteBtnHandler={deleteBtnHandler}
				/>
			))}
		</div>
	);
};

export default Restaurants