import React, { useEffect, useState } from 'react'
import './Home.css'
import Sidebar from '../../components/Home/Sidebar/Sidebar'
import CoverImage from '../../components/Home/CoverImage/CoverImage';
import TrendingCusines from '../../components/Home/TrendingCusines/TrendingCusines';
import Loader from '../../components/Loader/Loader';
import Restaurants from '../../components/Home/Restaurants/Restaurants';
import axios from '../../utils/axios'
import fetchUser from "../../utils/fetchUser";


const Home = () => {
	let time;
	const [restaurants, setRestaurants] = useState([]);
	const [trendingCusinesSection, setTrendingCusinesSection] = useState([]);
	const [isCusinesLoading, setIsCusinesLoading] = useState(false);
	const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(false);
	const [isLoader, setIsLoader] = useState(false);
	const [user, setUser] = useState({});


	useEffect(() => {
		async function getRestaurants() {
			try {
				const { data } = await axios.get(
					"restaurant/all-restaurants"
				);
				setRestaurants(data.restaurants);
				setIsRestaurantsLoading(true);
				setIsLoader(true);
			} catch (error) {
				console.log(error);
			}
		}
		async function getCusines() {
			try {
				const { data } = await axios.get(
					"restaurant/get-all-cusines?restaurant_name=food bite"
				);
				// console.log(data.cusines);
				setTrendingCusinesSection(data.cusines.splice(0, 6));
				setIsCusinesLoading(true);
			} catch (error) {
				console.log(error);
			}
		}
		fetchUser().then((res) => setUser(res));
		getCusines();
		getRestaurants();
	}, [user]);

	return (
		<>
			{isLoader ? (
				<div
					style={{ height: "100rem" }}
					className="flex border-2 w-full  border-black"
				>
					<Sidebar user={user} />
					<div
						className="w-full mt-3 ml-2 mr-2 home-container md:ml-24 rounded-lg"
						style={{ height: "inherit" }}
					>
						<CoverImage isLoading={isRestaurantsLoading} />
						<TrendingCusines
							isLoading={isCusinesLoading}
							trendingCusines={trendingCusinesSection}
						/>
						<Restaurants
							restaurants={restaurants}
							isLoading={isRestaurantsLoading}
						/>
					</div>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
}

export default Home