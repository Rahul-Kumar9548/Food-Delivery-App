import React, { useEffect, useState } from 'react'
import './Home.css'
import Sidebar from '../../components/Home/Sidebar/Sidebar'
import CoverImage from '../../components/Home/CoverImage/CoverImage';
import TrendingCusines from '../../components/Home/TrendingCusines/TrendingCusines';
import Loader from '../../components/Loader/Loader';
import Restaurants from '../../components/Home/Restaurants/Restaurants';
import axios from '../../utils/axios'


const Home = () => {
	let time;
	const [restaurants, setRestaurants] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoader, setIsLoader] = useState(false);

	useEffect(() => {
		async function getRestaurants() {
			try {
				const { data } = await axios.get(
					"restaurant/all-restaurants"
				);
				// console.log(data.cusines);
				setRestaurants(data.restaurants);
				setIsLoading(true);
				setIsLoader(true);
			} catch (error) {
				console.log(error);
			}
		}
		getRestaurants();
	}, []);

	return (
		<>
			{isLoader ? (
				<div
					style={{ height: "100rem" }}
					className="flex border-2 w-full  border-black"
				>
					<Sidebar />
					<div
						className="w-full mt-3 ml-2 mr-2 home-container md:ml-24 rounded-lg"
						style={{ height: "inherit" }}
					>
						<CoverImage isLoading={isLoading} />
						<TrendingCusines />
						<Restaurants restaurants={restaurants} />
					</div>
				</div>
			 ) : (
				<Loader />
			)} 
		</>
	);
}

export default Home