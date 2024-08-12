import React, { useEffect,useState } from "react";
import axios from '../../../utils/axios'
import CusineCard from "./CusineCard";

const TrendingCusines = ({ trendingCusines, isLoading }) => {
	return (
		<div className="w-full py-2 md:py-4 h-fit">
			<h1 className="text-center text-xl md:text-2xl">
				Trending Cusines
			</h1>
			<div className="flex flex-row justify-evenly">
				{trendingCusines.map((cusine, indx) => {
					return (
						<CusineCard
							key={trendingCusines[indx]?.["food"][0]?._id}
							cusine={cusine}
							isLoading={isLoading}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default TrendingCusines