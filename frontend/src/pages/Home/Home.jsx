import React, { useEffect, useState } from 'react'
import './Home.css'
import Sidebar from '../../components/Home/Sidebar/Sidebar'
import CoverImage from '../../components/Home/CoverImage/CoverImage';
import TrendingCusines from '../../components/Home/TrendingCusines/TrendingCusines';
import Loader from '../../components/Loader/Loader';
import Restaurants from '../../components/Home/Restaurants/Restaurants';


const Home = () => {
	let time;
	const [isLoader, setIsLoader] = useState(false);
	useEffect(() => {
		time = setTimeout(() => {
			setIsLoader(true);
			// console.log("Runned SetTimeout!");
		}, 2000)
		return () => clearTimeout(time);
	}, [])
	return (
		<>
			{!isLoader && <Loader />}
			{isLoader && <div style={{ height: "100rem" }} className="flex border-2 w-full  border-black">	
				<Sidebar />
				<div className="w-full mt-3 mr-2 home-container ml-24 rounded-lg" style={{ height: "inherit" }}>
					<CoverImage />
					<TrendingCusines />
					<Restaurants />
				</div>
				
			</div>}
		</>
	);
}

export default Home