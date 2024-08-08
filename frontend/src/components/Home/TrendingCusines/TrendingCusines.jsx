import React, { useEffect,useState } from "react";
import axios from '../../../utils/axios'
import CusineCard from "./CusineCard";

const TrendingCusines = () => {
	const [TrendingCusines, setTrendingCusines] = useState([]);
		
		useEffect(() => {
			async function getCusines() {
				try {
					const { data } = await axios.get("restaurant/get-all-cusines?restaurant_name=food bite");
					// console.log(data.cusines);
					setTrendingCusines(data.cusines.splice(0, 6));
				} catch (error) {
					console.log(error);
				}
			}
			getCusines();
    	}, []);
	// console.log(TrendingCusines[1]["food"][0]['images'][0].url);

  return (
		<div className="w-full py-2 md:py-4 h-fit">
			<h1 className="text-center text-xl md:text-2xl">Trending Cusines</h1>
			<div className="flex flex-row justify-evenly">
			  {TrendingCusines.map((cusine, indx) => {
				  return <CusineCard key={TrendingCusines[indx]?.["food"][0]?._id} cusine={cusine} />;
			  })}
			</div>
		</div>
  );
}

export default TrendingCusines