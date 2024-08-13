import React, {useState, useContext, useEffect } from "react";
import { OutletContext } from '../Restaurant'
import { useParams } from "react-router-dom";
import FoodCard from "../../../components/RestaurantPage/Outlets/FoodCard";


const FoodCardContainer = () => {
	const { restaurant, isloading } = useContext(OutletContext);
    const {cusine} = useParams();
	const [foodList, setFoodList] = useState([])
	// console.log(restaurant.cusines);

	useEffect(() => {
		let foods = restaurant?.cusines?.filter((cus)=>cus.category === cusine);
		setFoodList(foods?.[0]?.food);		
	},[cusine])
  return (
		<div className="flex flex-col gap-4">
			{foodList?.map((foodItem, index) => (
				<FoodCard key={index} foodItem={foodItem} isloading={isloading} restaurant={restaurant.name} cusine={cusine}/>
			))}
		</div>
  );
}

export default FoodCardContainer;