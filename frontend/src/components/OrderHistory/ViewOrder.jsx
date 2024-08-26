import React, { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import OrderViewItemCard from "./OrderViewItemCard";

const ViewOrder = ({ setViewOrder, orders ,selectedOrder }) => {
	const [spinning, setSpinning] = useState("");
	const [totalPrice, setTotalPrice] = useState(0);
	const [address, setAddress] = useState();
	const [items, setItems] = useState([]);
	const [orderId, setOrderId] = useState(null);
	useEffect(() => {
		let order = orders.filter((order)=>selectedOrder === order._id)
		console.log(order)
		setOrderId(order[0]._id)
		setTotalPrice(order[0].totalPrice)
		setAddress(order[0].address)
		setItems(order[0].items)
		console.log(items[0])
		// console.log(totalPrice)
		// console.log(address)

	},[])
	
	return (
		<>
			<div className="absolute p-4 top-[5rem] w-[21rem] left-[1.5rem] md:w-[30rem]  md:left-[25%] lg:left-[35%] h-[30rem] bg-white rounded-xl border-2 z-10 transition-all duration-300 ease-in-out overflow-y-auto">
				<div className="flex justify-end gap-[2rem] md:gap-[6rem]">
					<div className="text-2xl">Order Summary!</div>
					<img
						src="https://cdn-icons-png.flaticon.com/128/399/399274.png"
						className="w-[20px] h-[20px] cursor-pointer hover:scale-110 transition-all duration-300 active:translate-y-1"
						alt=""
						onClick={() => setViewOrder(false)}
					/>
				</div>
				<div className="p-4 space-y-2">
					<p className="space-x-2 ">
						<span className="font-bold text-sm ">Order Id:</span>
						<span className="text-sm">{orderId}</span>
					</p>
					<span>Items Ordered:</span>
					{items?.map((item, index) => (
						<OrderViewItemCard key={index} item={item} />
					))}
					{/* <OrderViewItemCard item={items[0]}/> */}
				</div>
				<div className="p-4 space-y-1 capitalize">
					<span>Delivered to:</span>
					<p className="space-x-2 ">
						<span className="font-bold">Name:</span>
						<span className="">{address?.name}</span>
					</p>
					<p className="space-x-2 ">
						<span className="font-bold">Address:</span>
						<span className="">{address?.location}</span>
					</p>
					<p className="space-x-2 ">
						<span className="font-bold">Landmark:</span>
						<span className="">{address?.landmark}</span>
					</p>
					<p className="space-x-2 ">
						<span className="font-bold">Contact:</span>
						<span className="">{address?.contact}</span>
					</p>
				</div>
			</div>
		</>
	);
};

export default ViewOrder;
