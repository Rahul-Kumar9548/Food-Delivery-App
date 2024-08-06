import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import homeIcon from '../../../assets/images/Home24x24.svg'
import orderHistoryIcon from '../../../assets/images/OrderHistory.png'
import cartIcon from '../../../assets/images/cart.png'
import profileIcon from '../../../assets/images/profile.png'
import heartIcon from "../../../assets/images/heart-60.png";
import Logout from "../Logout/Logout";


const Sidebar = () => {
	const user = useSelector((state) => state.user);
    // console.log(user);
	return (
		<div className="sidebar z-10 m-3 w-20 hover:w-64 flex flex-col justify-between rounded-lg">
			<div>
				<div className="sidebar-header">
					<img
						src={user.image}
						alt="Profile"
						className="sidebar-profile-pic w-10 h-10 "
					/>
					<h3 className="sidebar-username overflow-x-hidden overflow-y-hidden h-6">
						{user.name}
					</h3>
				</div>
				<ul className="sidebar-list">
					<li className="sidebar-item hover:scale-110 transition-all duration-300">
						<Link
							to="/home"
							className="sidebar-link w-full flex   border-b-2"
						>
							<img
								className=""
								src={homeIcon}
								alt="icon"
							/>
							<span className="ml-5 overflow-x-hidden overflow-y-hidden">
								Home
							</span>
						</Link>
					</li>
					<li className="sidebar-item hover:scale-110 transition-all duration-300">
						<Link
							to="/orders"
							className="sidebar-link w-full flex   border-b-2"
						>
							<img
								className="w-6"
								src={orderHistoryIcon}
								alt=""
							/>
							<span className="ml-5 overflow-x-hidden overflow-y-hidden">
								Orders
							</span>
						</Link>
					</li>
					<li className="sidebar-item hover:scale-110 transition-all duration-300">
						<Link
							to="/profile"
							className="sidebar-link border-b-2 relative"
						>
							<img className="w-6" src={cartIcon} alt="" />
							<span className="ml-5 overflow-x-hidden  overflow-y-hidden">
								<span className="msg-count">
									{user.cart.length}
								</span>
								Cart
							</span>
						</Link>
					</li>
					<li className="sidebar-item hover:scale-110 transition-all duration-300">
						<Link
							to="/logout"
							className="sidebar-link border-b-2"
						>
							<img
								className="w-6"
								src={profileIcon}
								alt=""
							/>
							<span className="ml-5 overflow-x-hidden overflow-y-hidden ">
								Profile
							</span>
						</Link>
					</li>
					<li className="sidebar-item hover:scale-110 transition-all duration-300">
						<Link
							to="/logout"
							className="sidebar-link border-b-2"
						>
							<img
								className="w-6"
								src={heartIcon}
								alt=""
							/>
							<span className="ml-5 overflow-x-hidden overflow-y-hidden ">
								Favourites
							</span>
						</Link>
					</li>
				</ul>
			</div>
			<Logout />
		</div>
	);
};

export default Sidebar;
