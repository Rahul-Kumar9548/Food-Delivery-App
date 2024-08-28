import React, { useEffect, useState } from 'react'
import './Home.css'
import Sidebar from '../../components/Home/Sidebar/Sidebar'
import CoverImage from '../../components/Home/CoverImage/CoverImage';
import TrendingCusines from '../../components/Home/TrendingCusines/TrendingCusines';
import Loader from '../../components/Loader/Loader';
import Restaurants from '../../components/Home/Restaurants/Restaurants';
import axios from '../../utils/axios'
import Alert from '../../components/Alert';
import fetchUser from '../../utils/fetchUser';
import { setUser, getUser } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';


const Home = ({ loading }) => {
	const user = useSelector((state)=>state.user)
	const [restaurants, setRestaurants] = useState([]);
	const [trendingCusinesSection, setTrendingCusinesSection] = useState([]);
	const [isCusinesLoading, setIsCusinesLoading] = useState(false);
	const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(false);
	const [isLoader, setIsLoader] = useState(false);
	const [onFavourite, setOnFavourite] = useState(false);
	const [alert, setAlert] = useState({
		error: "",
		success: "",
		info: "",
		warning: "",
	});
	const dispatch = useDispatch();

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
		fetchUser().then((res) => {
			dispatch(setUser(res));
		});
		getCusines();
		getRestaurants();
	}, []);

	async function addToFavourite(restaurantId) {
		try {
			const { data } = await axios.get(
				`profile/add-favourite/${restaurantId}`
			);
			// console.log(data.user.favourites);
			let fav = data.user.favourites;
			dispatch(setUser({ ...user, favourites:[...fav]}));
			setAlert({ ...alert, success: data.message });
		} catch (error) {
			console.log(error);
			setAlert({ ...alert, error: "Error On Adding Favourite" });
		}
		// console.log("Id",restaurantId);
	}

	return (
		<>
			{!loading ? (
				<div
					style={{ height: "100rem" }}
					className="flex w-full "
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
							addToFavourite={addToFavourite}
							onFavourite={onFavourite}
						/>
					</div>
					<Alert
						alert={alert}
						setAlert={setAlert}
						className="fixed w-fit top-4 lg:top-[90%] lg:left-[80%] "
					/>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export default Home