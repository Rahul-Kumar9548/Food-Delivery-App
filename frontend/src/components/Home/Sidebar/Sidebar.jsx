import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import homeIcon from '../../../assets/images/Home24x24.svg'
import orderHistoryIcon from '../../../assets/images/OrderHistory.png'
import cartIcon from '../../../assets/images/cart.png'
import profileIcon from '../../../assets/images/profile.png'
import heartIcon from "../../../assets/images/heart-60.png";
import heartIcon1 from "../../../assets/images/icons8-favorite-24.png";
import Logout from "../Logout/Logout";


const Sidebar = ({user}) => {
    
	return (
		<>
			<div className=" hidden md:block">
				<div className="sidebar z-20 m-3 w-20 hover:w-64 flex flex-col justify-between rounded-lg">
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
									to="/cart"
									className="sidebar-link border-b-2 relative"
								>
									<img
										className="w-6"
										src={cartIcon}
										alt=""
									/>
									<span className="ml-5 overflow-x-hidden  overflow-y-hidden">
										<span className="msg-count">
											{user?.cart?.length}
										</span>
										Cart
									</span>
								</Link>
							</li>
							<li className="sidebar-item hover:scale-110 transition-all duration-300">
								<Link
									to="/profile"
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
									to="/favourites"
									className="sidebar-link border-b-2 relative"
								>
									<img
										className="w-6"
										src={heartIcon}
										alt=""
									/>
									<span className="ml-5 overflow-x-hidden overflow-y-hidden ">
										<span className="msg-count">
											{
												user?.favourites
													?.length
											}
										</span>
										Favourites
									</span>
								</Link>
							</li>
						</ul>
					</div>
					<Logout />
				</div>
			</div>
			{/* Mobile side bar */}
			<div className="md:hidden fixed z-10 bottom-5 w-full flex justify-center items-center">
				<div className="button-container">
					<Link to={"/home"}>
						<button className="mobile-button">
							<svg
								className="mobile-icon"
								stroke="currentColor"
								fill="currentColor"
								strokeWidth="10"
								viewBox="0 0 1024 1024"
								height="1em"
								width="1em"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
							</svg>
						</button>
					</Link>
					<Link to="/favourites">
						<button className="mobile-button relative">
							<img src={heartIcon1} alt="" />
							<span className="msg-count">
								{user?.favourites?.length}
							</span>
						</button>
					</Link>
					<Link to="/profile">
						<button className="mobile-button">
							<svg
								className="mobile-icon"
								stroke="currentColor"
								fill="currentColor"
								strokeWidth="0.7"
								viewBox="0 0 24 24"
								height="1em"
								width="1em"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
							</svg>
						</button>
					</Link>
					<div>
						<Link to="/cart">
							<button className="mobile-button relative">
								<svg
									className="mobile-icon"
									stroke="currentColor"
									fill="none"
									strokeWidth="2"
									viewBox="0 0 24 24"
									strokeLinecap="round"
									strokeLinejoin="round"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<circle
										cx="9"
										cy="21"
										r="1"
									></circle>
									<circle
										cx="20"
										cy="21"
										r="1"
									></circle>
									<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
								</svg>
								<span className=" mobile-msg-count">
									{user?.cart?.length}
								</span>
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
