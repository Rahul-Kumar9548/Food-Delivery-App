import React, {useState, useContext, useEffect } from 'react'
import { OutletContext } from '../Restaurant'
import CusineBtn from '../../../components/RestaurantPage/Outlets/CusineBtn';
import { Outlet, useNavigate } from 'react-router-dom';

const OrderOnline = () => {
	const { restaurant, cusines, isloading } = useContext(OutletContext);
	const navigate = useNavigate();
	const [activeElement, setActiveElement] = useState(null);
	
	// console.log(cusines);
	useEffect(() => {
		navigate(`${cusines[0]}`);
	}, [cusines]);

	return (
		<div className="h-[150rem] grid grid-cols-3 lg:grid-cols-4 bg-white relative">
			<div className=" h-fit  text-slate-900">
				{cusines.map((cusine, index) => (
					<CusineBtn
						key={index}
						restaurantName={restaurant.name}
						cusine={cusines[index]}
						isloading={isloading}
						setActiveElement={setActiveElement}
						activeElement={activeElement}
					/>
				))}
			</div>
			<div className="border-2 p-1 col-span-2 lg:col-span-3 w-full h-full">
				<Outlet />
			</div>
		</div>
	);
}

export default OrderOnline