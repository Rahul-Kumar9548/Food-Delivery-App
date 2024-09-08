import React, { useState, useContext, useEffect, useRef } from 'react';
import { OutletContext } from '../Restaurant';
import CusineBtn from '../../../components/RestaurantPage/Outlets/CusineBtn';
import { Outlet, useNavigate } from 'react-router-dom';
import cusineIcon from '../../../assets/images/food.png'

const OrderOnline = () => {
  const { restaurant, cusines, isloading } = useContext(OutletContext);
  const navigate = useNavigate();
  const [activeElement, setActiveElement] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility
  const menuRef = useRef(null); // Ref for the menu container

  useEffect(() => {
    navigate(`${cusines[0]}`);
  }, [cusines]);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuRef]);

  return (
		<div className="h-fit grid grid-cols-2 md:grid-cols-4 bg-white relative">
			{/* Hamburger Menu Button */}
			<div className="w-fit h-[350px]  fixed bottom-[70px] z-50 left-[25px] flex flex-col-reverse">
				<button
					className=" w-fit md:hidden z-50 bg-orange-500 block p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
					onClick={toggleMenu}
				>
					<img src={cusineIcon} className="h-9 w-9" alt="" />
				</button>
				{/* Menu Container (hidden on larger screens) */}
				<div
					ref={menuRef}
					className={`md:hidden border-2 h-fit p-5 text-slate-900 bg-white shadow-md rounded-md z-10 transition-all duration-300 ${
						isMenuOpen
							? "opacity-100 visible"
							: "opacity-0 invisible"
					}`}
				>
					{cusines.map((cusine, index) => (
						<CusineBtn
							key={index}
							restaurantName={restaurant.name}
							cusine={cusines[index]}
							isloading={isloading}
							setActiveElement={setActiveElement}
							activeElement={activeElement}
							cusines={cusines}
							toggleMenu={toggleMenu}
						/>
					))}
				</div>
			</div>

			{/* Cusine Buttons (visible on larger screens) */}
			<div className="hidden md:block h-fit text-slate-900 sticky top-[140px] lg:top-[160px]">
				{cusines.map((cusine, index) => (
					<CusineBtn
						key={index}
						restaurantName={restaurant.name}
						cusine={cusines[index]}
						isloading={isloading}
						setActiveElement={setActiveElement}
						activeElement={activeElement}
						cusines={cusines}
						toggleMenu={toggleMenu}
					/>
				))}
			</div>

			<div className="border-2 p-1 col-span-2 lg:col-span-3 w-full h-full">
				<Outlet />
			</div>
		</div>
  );
};

export default OrderOnline;
