import React,{useState, useEffect} from 'react'
import formatDateTime from '../../utils/formatDateTime';
const OrderCard = ({ order, setViewOrder, setSelectedOrder }) => {
    const { address, date, items, totalPrice } = order;
    const [orderDate, setOrderDate] = useState(null);
    useEffect(() => {
        let formattedDate = formatDateTime(date);
        formattedDate = formattedDate.split(",").splice(0, 2).join(",")
        setOrderDate(formattedDate)
        // console.log(order._id);
	}, [order])
	
	const clickHandler = () => {
		setSelectedOrder(order._id);
		setViewOrder(true);
	};
    
  return (
		<div className="lg:w-[600px] xl:w-fit md:w-[400px] h-fit p-2 lg:p-4 border-2 border-slate-300 rounded-lg mx-auto shadow-nice flex items-center gap-3 lg:gap-4">
			<img
				src={order?.items?.[0]?.food?.images?.[0]?.url}
				alt=""
				className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px]"
			/>
			<div className="lg:p-3 lg:space-y-1 w-[300px] truncate ">
				<h1 className="text-sm lg:text-xl">
					Placed On {orderDate}
				</h1>
				<p className="text-xs lg:text-sm capitalize text-slate-600">
					{order?.items
						?.map((item) => item.food.name)
						.join(", ")}
				</p>
				<p className="text-xs lg:text-lg font-semibold">
					Total Price: ₹{order.totalPrice}
				</p>
			</div>
			<div className="flex items-center justify-center">
				<button
					class="hidden md:inline cursor-pointer transition-all bg-orange-500 text-white px-6 py-2 rounded-lg border-orange-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
					onClick={() => clickHandler()}
				>
					View <span className="hidden lg:inline">Order</span>
				</button>
				<img
					src="https://cdn-icons-png.flaticon.com/128/8249/8249488.png"
				  alt=""
				  className='w-[25px] md:hidden cursor-pointer active:scale-90 transition-all duration-300'
				  onClick={() => clickHandler()}
				/>
			</div>
		</div>
  );
}

export default OrderCard