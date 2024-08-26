import React from 'react'
import Spinner from './Spinner/Spinner';

const AddressCard = ({
	address,
	select,
	setSelect,
	selectDisplay,
	deleteEditDisplay,
	deleteHandler,
	editHandler,
	spinning
}) => {
	const selectHandler = (id) => {
		setSelect(id);
	};
	return (
		<div className="capitalize hover:scale-110 transition-all duration-300 ease-in-out space-y-1 mx-auto w-[90%] bg-white p-3 rounded-lg border-2 border-slate-300 shadow-3d">
			<div className="space-x-2 ">
				<span className="font-bold">Name:</span>{" "}
				<span>{address?.name}</span>
			</div>
			<div className="space-x-2 ">
				<span className="font-bold">Address:</span>
				<span>{address?.location}</span>
			</div>
			<div className="flex justify-between flex-col md:flex-row">
				<div className="space-y-1">
					<div className="space-x-2 ">
						<span className="font-bold">Landmark:</span>
						<span>{address?.landmark}</span>
					</div>
					<div className="space-x-2 ">
						<span className="font-bold">Contact:</span>
						<span>{address?.contact}</span>
					</div>
				</div>
				{selectDisplay && (
					<button
						className={`w-[120px]  active:brightness-90 active:translate-y-[4px] bg-orange-600 h-[40px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] ${
							select === address._id
								? "bg-gradient-to-r from-[#009b49] to-[rgb(105,184,141)]"
								: ""
						} before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]`}
						onClick={() => selectHandler(address._id)}
					>
						Select
					</button>
				)}
				{deleteEditDisplay && (
					<div className="flex flex-row-reverse">
						{spinning === address._id ? (
							<Spinner
								className={"w-[20px] h-[20px] mr-8 "}
							/>
						) : (
							<button
								className="hidden md:flex justify-center active:translate-y-1 transition-all items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-orange-500  to-orange-800 hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
								onClick={() =>
									deleteHandler(address._id)
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
						)}
						{spinning === address._id ? (
							<Spinner
								className={"w-[20px] h-[20px] mr-8 "}
							/>
						) : (
							<button
								className="inline-flex md:hidden lg:hidden items-center px-2 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-full hover:-translate-y-1 hover:scale-110"
								onClick={() => deleteHandler(address._id)}
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
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default AddressCard