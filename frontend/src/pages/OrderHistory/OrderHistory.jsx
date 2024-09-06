import React, { useState, useEffect } from "react";
import Alert from "../../components/Alert";
import Sidebar from "../../components/Home/Sidebar/Sidebar";
import axios from "../../utils/axios";
import AddressCard from "../../components/AddressCard";
import AddAddressCard from "../../components/AddAddressCard";
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import OrderCard from "../../components/OrderHistory/OrderCard";
import ViewOrder from "../../components/OrderHistory/ViewOrder";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const OrderHistory = () => {
	const [orders, setOrders] = useState([]);
	const [spinning, setSpinning] = useState(true);
	const [viewOrder, setViewOrder] = useState('');
	const [selectedOrder, setSelectedOrder] = useState('');
	const user = useSelector((state)=>state.user)
	const dispatch = useDispatch();

	const [alert, setAlert] = useState({
		error: "",
		success: "",
		info: "",
		warning: "",
	});
	let discount = 100;
	let fee = 40;

	useEffect(() => {
		
		async function getOrders() {
			try {
				const { data } = await axios.get("/profile/order-history");
				// console.log(data);
				setOrders(data.orderHistory);
				setSpinning(false);
			} catch (error) {
				console.log(error);
				setAlert({ ...alert, error: error });
			}
		}
		getOrders();

		// console.log(user);
	}, []);

	return (
		<>
			<div className="flex w-full">
				<Sidebar user={user} />
				<div className="w-full bg-slate-300 h-full relative">
					{spinning ? (
						<Spinner className="w-12 h-12 absolute top-[300px] left-[50%]" />
					) :
						<div
						className={`${
							viewOrder ? "blur brightness-50" : ""
						} home-container relative overflow-y-auto md:ml-[6rem] rounded-lg m-1 mt-2 bg-white`}
					>
						<div className="text-center z-10 sticky bg-white top-0 p-4 flex justify-center text-[30px] lg:text-[40px] w-full pb-0">
							<h1 className="w-[80%] flex justify-center items-center gap-2 border-b-2 p-2">
								Your Orders!{" "}
								<img
									src="https://cdn-icons-png.flaticon.com/128/7662/7662133.png"
									alt="cartImg"
									className="w-[40px] h-[40px] "
								/>
							</h1>
						</div>
						<div className="w-[90%] mx-auto p-3 h-full">
							{orders?.length === 0 ? (
								<div className="text-[30px] text-slate-300 mt-[20%] text-center">
									Empty
								</div>
							) : (
								<div className="w-full h-full">
									<div className=" lg:w-[60%] space-y-3 md:space-y-5 p-2 lg:mx-auto h-[100%] ">
										{orders?.map((order, index) => (
											<OrderCard
												key={index}
												order={order}
												setViewOrder={
													setViewOrder
												}
												setSelectedOrder={
													setSelectedOrder
												}
											/>
										))}
									</div>
								</div>
							)}
						</div>
						<Alert
							className="fixed top-4 lg:top-[90%] lg:row-[30%] lg:left-[70%] "
							alert={alert}
							setAlert={setAlert}
						/>
					</div>}
					{viewOrder ? (
						<ViewOrder
							selectedOrder={selectedOrder}
							setViewOrder={setViewOrder}
							viewOrder={viewOrder}
							orders={orders}
						/>
					) : null}
				</div>
			</div>
		</>
	);
};

export default OrderHistory;
