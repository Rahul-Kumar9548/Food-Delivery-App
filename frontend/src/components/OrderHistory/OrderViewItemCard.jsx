import React from 'react'

const OrderViewItemCard = ({ item }) => {
	// const{food, quantity, restaurant_name, category} = item;
	const food = item?.food;
	const quantity = item?.quantity;
	const restaurant_name = item?.restaurant_name;
	const category = item?.category;
	// console.log(food.images);
	return (
		<div className="flex p-2 border-b gap-2 capitalize">
			<img
				className="w-[60px] h-[60px]"
				src={food?.images?.[0]?.url}
				alt=""
			/>
			<div className='space-y-1'>
				<p className='text-sm font-bold'>{food?.name}</p>
				<p className='text-xs text-slate-500'>
					<span>{category} | </span>
					<span>{restaurant_name}</span>
				</p>
				<p className='text-xs text-slate-500'>
					<span>Qty: {quantity}</span>
					<span> | Price: {food?.price}</span>
				</p>
			</div>
		</div>
	);
}

export default OrderViewItemCard