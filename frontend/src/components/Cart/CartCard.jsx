import React from 'react'
import Spinner from "../Spinner/Spinner"
const CartCard = ({
	food,
	quantity,
	restaurant_name,
	category,
	increaseHandler,
    decreaseHandler,
    deleteHandler,
    spinning,
    spinningDelete,
}) => {
	return (
		<div className="flex w-full hover:scale-105 transition-all duration-200 shadow-nice gap-3 items-center bg-white p-3 rounded-lg">
			<div className="flex gap-2 items-center w-[8rem] flex-col">
				<img
					src={food.images[0].url}
					alt="foodImage"
					className="w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] rounded-full"
				/>
				<p className="text-xs text-slate-600 hidden lg:block">
					Qty:{" "}
				</p>
				{spinning === food._id ? (
					<div className=''>
						<Spinner className="w-[20px] h-[20px] " />
					</div>
				) : (
					<div className="flex text-xs lg:text-sm gap-2 items-center">
						<button
							className="bg-slate-200 hover:bg-slate-300 active:translate-y-1 transition-all duration-300 rounded-full py-[1px] px-2"
							onClick={() =>
								decreaseHandler(
									restaurant_name,
									category,
									food._id
								)
							}
						>
							-
						</button>
						<span>{quantity}</span>
						<button
							className="bg-slate-200 hover:bg-slate-300 active:translate-y-1 transition-all duration-300 rounded-full py-[1px] px-2"
							onClick={() =>
								increaseHandler(
									restaurant_name,
									category,
									food._id
								)
							}
						>
							+
						</button>
					</div>
				)}
			</div>
			<div className=" lg:space-y-2 w-[80%]">
				<p className="text-sm lg:text-xl capitalize font-bold">
					{" "}
					{food.name}{" "}
				</p>
				<p className="text-xs lg:text-base capitalize overflow-hidden h-[2rem] lg:h-[3rem] font-semibold">
					{food.description}
				</p>
				<p className="text-xs lg:text-base text-slate-500 font-bold">
					Price: ₹{food.price}
				</p>
			</div>
			<div>
				{spinningDelete === food._id ? (
					<Spinner className="w-[30px] h-[30px] ml-10" />
				) : (
					<div>
						<button
							className="hidden md:flex justify-center active:translate-y-1 transition-all items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-orange-500  to-orange-800 hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
							onClick={() =>
								deleteHandler(
									restaurant_name,
									category,
									food._id
								)
							}
						>
							<svg
								viewBox="0 0 15 15"
								className="w-5 fill-white"
							>
								<svg
									className="w-6 h-6"
									stroke="currentColor"
									strokeWidth="1.5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
										strokeLinejoin="round"
										strokeLinecap="round"
									></path>
								</svg>
								Remove
							</svg>
						</button>
						<button
							className="inline-flex md:hidden lg:hidden items-center px-2 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-full hover:-translate-y-1 hover:scale-110"
							onClick={() =>
								deleteHandler(
									restaurant_name,
									category,
									food._id
								)
							}
						>
							<svg
								stroke="currentColor"
								viewBox="0 0 24 24"
								fill="none"
								className="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									strokeWidth="2"
									strokeLinejoin="round"
									strokeLinecap="round"
								></path>
							</svg>
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartCard