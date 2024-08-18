import React,{useState} from 'react'

const AddressCard = ({ address, select, setSelect }) => {
   
    const selectHandler = (id) => {
        setSelect(id)
    }
  return (
		<div className="capitalize space-y-1 mx-auto w-[90%] bg-white p-3 rounded-lg border-2 border-slate-300 shadow-3d">
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
			</div>
		</div>
  );
}

export default AddressCard