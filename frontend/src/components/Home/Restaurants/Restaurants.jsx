import React,{useEffect, useState} from 'react'
import RestaurantCard from './RestaurantCard/RestaurantCard'
import axios from '../../../utils/axios';

const Restaurants = ({restaurants}) => {
	// const [restaurants, setRestaurants] = useState([]);
	// useEffect(() => {
	// 	try {
	// 		async function getRestaurants() {
	// 			let { data } = await axios.get(
	// 				"restaurant/all-restaurants"
	// 			);
	// 			console.log(data);
	// 			setRestaurants(data.restaurants);
	// 		}
	// 		getRestaurants();
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }, []);

  return (
		<div className="p-5 px-1 gap-2 md:gap-10 md:gap-x-[0.5rem] md:p-[1rem] lg:p-10 w-full h-fit flex flex-wrap justify-evenly">
			{restaurants.map(restaurant => (
				<RestaurantCard key={restaurant._id} restaurant={restaurant} />
			))}
		</div>
  );
}

export default Restaurants