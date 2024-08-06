import React,{useEffect, useState} from 'react'
import './Restaurants.css'
import RestaurantCard from './RestaurantCard/RestaurantCard'
import axios from '../../../utils/axios';

const Restaurants = () => {
	const [restaurants, setRestaurants] = useState([]);
	useEffect(() => {
		try {
			async function getRestaurants() {
				let { data } = await axios.get(
					"restaurant/all-restaurants"
				);
				console.log(data);
				setRestaurants(data.restaurants);
			}
			getRestaurants();
		} catch (error) {
			console.log(error);
		}
	}, []);

  return (
		<div className="restaurant-container gap-10 p-10 w-full h-1/2 flex flex-wrap justify-evenly">
			{restaurants.map(restaurant => (
				<RestaurantCard key={restaurant._id} restaurant={restaurant} />
			))}
		</div>
  );
}

export default Restaurants