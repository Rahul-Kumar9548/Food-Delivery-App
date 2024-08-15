import React, { useRef, useState, useEffect, useContext } from "react";
import canvasLoader from '../../../utils/canvasLoader';
import FoodCardLoader from '../Loaders/FoodCardLoader';
import axios from '../../../utils/axios';
import { OutletContext } from "../../../pages/Restaurant/Restaurant";
import AddToCart from "./AddToCart/AddToCart";


const FoodCard = ({ foodItem, isloading, restaurant, cusine }) => {
	const {user, setUser, alert, setAlert } = useContext(OutletContext);
	const [imageData, setImageData] = useState(null);
	const canvasRef = useRef(null);

	useEffect(() => {
		if (!isloading) {
			canvasLoader(
				foodItem?.images?.[0]?.blurHash ? (foodItem?.images?.[0]?.blurHash):"LGF5?xYk^6#M@-5c,1J5@[or[Q6.",
				canvasRef,
				setImageData
			);
		}
	}, []);
	
	if (!isloading) {
		return (
			<FoodCardLoader canvasRef={canvasRef} />
		);
	}

	const clickHandler = async () => {
		
		try {
			console.log(restaurant,cusine,foodItem._id);
			const { data } = await axios.get(`cart/add-cart/${foodItem._id}?restaurant_name=${restaurant}&category=${cusine}`);
			setUser({ ...user, cart: data.cart })
			setAlert({...alert, success: data.message})
			console.log(data);
		} catch (error) {
			console.log(error);
			setAlert({ ...alert, error: error.response.data.message });
		}
	};
	
  return (
		<>
			<div className="bg-white p-2 flex w-fit gap-2 h-fit lg:gap-4 lg:w-[60%] lg:h-[10rem] rounded-lg shadow-nice pb-1 hover:scale-110 transition-all duration-300 ">
				<div className="w-[100px] h-[90px] lg:w-[160px] lg:h-[120px] rounded-lg overflow-hidden">
					<img
						className="w-full h-full object-cover object-center"
						src={foodItem?.images?.[0]?.url}
						alt="food"
						loading='lazy'
					/>
				</div>
				<div className="flex flex-col justify-around w-[80%] pb-1">
					<div className="w-full">
						<p className="font-bold capitalize text-sm lg:text-base">
							{foodItem.name}
						</p>
						<p className="font-thin capitalize text-xs lg:text-sm overflow-hidden overflow-ellipsis w-full h-[3rem] lg:h-[4rem]">
							{foodItem.description}
						</p>
					</div>
					<div className="flex pt-2 border-t-[1px] border-slate-300 justify-between items-center">
						<span className="text-sm lg:text-lg font-bold">
							₹{foodItem.price}
						</span>
						<div className="hover:bg-orange-400 block lg:hidden hover:border-orange-400 p-1 rounded-2xl border-slate-500 transition-all duration-300 cursor-pointer" onClick={clickHandler}>
							<svg
								className="h-[22px] w-[22px]"
								viewBox="0 0 20 20"
							>
								<path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
								<path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
								<path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
							</svg>
						</div>
						  <AddToCart clickHandler={clickHandler}/>
					</div>
				</div>
			</div>
		</>
  );
}

export default FoodCard