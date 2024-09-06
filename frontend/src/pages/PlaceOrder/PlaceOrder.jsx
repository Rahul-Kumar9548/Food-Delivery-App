import React, { useState, useEffect } from "react";
import Alert from "../../components/Alert";
import Sidebar from "../../components/Home/Sidebar/Sidebar";
import axios from "../../utils/axios";
import AddressCard from "../../components/AddressCard";
import AddAddressCard from "../../components/AddAddressCard";
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/userSlice"
import { useDispatch, useSelector } from "react-redux";

const PlaceOrder = () => {
	const user = useSelector((state) => state.user);
	const [totalPrice, setTotalPrice] = useState(0);
	const [cart, setCart] = useState([]);
	const [spinning, setSpinning] = useState("");
	const [select, setSelect] = useState("");
	const [addAddress, setAddAddress] = useState(false);
	const navigate = useNavigate();
	const [address, setAddress] = useState([]);
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
		// console.log(cart);
		async function getCart() {
			try {
				const { data } = await axios.get("/cart/view-cart-items");
				// console.log(data);
				setCart(data.cart);
				setTotalPrice(data.totalPrice);
			} catch (error) {
				console.log(error);
				setAlert({ ...alert, error: error });
			}
		}
        getCart();
		// console.log(user.addresses)
	}, []);

	const totalAmount = totalPrice - discount + fee;
	const currency = 'INR';
	const receiptId = 'qndwjdsxi';
	async function paymentHandler() {
		const paymentDetails = {
			amount: totalAmount*100,
			currency,
			receipt:receiptId,
		};
		
		try {
			const {data} = await axios.post(`/payment/order`, paymentDetails);
			console.log(data);
			var options = {
				key: "rzp_test_qOHlp9C5HlpuB7", // Enter the Key ID generated from the Dashboard
				amount: totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
				currency: "INR",
				name: "Gourmet Hub", //your business name
				description: "Test Transaction",
				image: "https://example.com/your_logo",
				order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
				// callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
				handler: async function (response) {
					const body = { ...response,};
					console.log(body);
					const {data} = await axios.post(`/payment/order/validate`, body);
					console.log(data);
					dispatch(setUser({...user, cart:[]}))
					setAlert({ ...alert, success: data.message });
					navigate('/orders')
				},
				prefill: {
					//We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
					name: user.name, //your customer's name
					email: user.email,
					contact: "9000090000", //Provide the customer's phone number for better conversion rates
				},
				notes: {
					address: "Razorpay Corporate Office",
				},
				theme: {
					color: "#f97316",
				},
			};
			var rzp1 = new window.Razorpay(options);
			rzp1.on("payment.failed", function (response) {
				console.log(response);
				alert(response.error.code);
				alert(response.error.description);
			});
			rzp1.open();
			e.preventDefault();
		} catch (error) {
			console.log(error);
		}
	}

	async function placeOrderHandler() {
		setSpinning(true);
		try {
			const { data } = await axios.get(`/profile/place-order/?addressId=${select}`);
			console.log(data);
			await paymentHandler();
			// dispatch(setUser({...user, cart:[]}))
			// setAlert({ ...alert, success: data.message });
			// navigate('/orders')
			setSpinning(false);

		}	catch(error){
			console.log(error);
			setSpinning(false);
			setAlert({...alert, error:error.response.data})
		}
	}
	return (
		<>
			<div className="flex w-full  ">
				<Sidebar user={user} />
				<div className="w-full bg-slate-300 h-full relative">
					<div
						className={`${
							addAddress ? "blur brightness-50" : ""
						} home-container relative overflow-y-auto md:ml-[6rem] rounded-lg m-1 mt-2 bg-white`}
					>
						<div className="text-center z-10 sticky bg-white top-0 p-4 flex justify-center text-[30px] lg:text-[40px] w-full pb-0">
							<h1 className="w-[80%] flex justify-center items-center gap-2 border-b-2 p-2">
								Your Address!{" "}
								<img
									src="https://cdn-icons-png.flaticon.com/128/9062/9062564.png"
									alt="cartImg"
									className="w-[40px] h-[40px] "
								/>
							</h1>
						</div>
						<div className="w-[90%] mx-auto p-3 h-full">
							{user.cart?.length === 0 ? (
								<div className="text-[30px] text-slate-300 mt-[20%] text-center">
									Empty
								</div>
							) : (
								<div className="lg:grid  gap-16 grid-cols-5 h-full">
									<div className="lg:col-span-3 space-y-4 mt-[1rem] ">
										{user?.addresses?.map(
											(address) => (
												<AddressCard
													address={
														address
													}
													select={select}
													setSelect={
														setSelect
													}
													selectDisplay={
														true
													}
												/>
											)
										)}
										<div className="w-full flex justify-center items-center relative">
											<button
												className="cursor-pointer transition-all bg-orange-500 text-white px-6 py-2 rounded-lg border-orange-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
												onClick={() =>
													setAddAddress(
														!addAddress
													)
												}
											>
												Add New Address!
											</button>
										</div>
									</div>

									<div className="bg-white flex mt-[1rem] lg:fixed shadow-3d border-2 top-[8rem] right-[5rem] lg:flex flex-col rounded-xl col-span-2 lg:w-[30%] h-[25rem] space-y-4 p-4">
										<h1 className="text-center text-[20px] border-b-2 p-2 text-slate-500 ">
											Price Details
										</h1>
										<div className="text-slate-600">
											<p className="flex justify-between p-1">
												Price
												{`(${cart?.length} items)`}
												<span>
													₹{totalPrice}{" "}
												</span>
											</p>
											<p className="flex justify-between p-1">
												Discount{" "}
												<span className="text-red-600">
													-₹{discount}
												</span>
											</p>
											<p className="flex justify-between p-1">
												Platform fee{" "}
												<span>₹{fee} </span>
											</p>
											<p className="flex justify-between p-1">
												Delivery Charges{" "}
												<span className="text-green-600">
													Free
												</span>
											</p>
										</div>
										<p className="flex  text-lg justify-between border-y-2 p-2">
											Total Amount
											<span>
												₹{" "}
												{totalPrice +
													-discount +
													fee}
											</span>
										</p>

										{spinning ? (
											<Spinner className="mx-auto w-[30px] h-[30px]" />
										) : (
											<button
												className="cursor-pointer transition-all  bg-orange-600 text-white px-6 py-2 rounded-lg border-green-400 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
												onClick={() =>
													placeOrderHandler()
												}
											>
												Place Order!
											</button>
										)}
									</div>
									<div className="w-[2rem] h-[3rem]"></div>
								</div>
							)}
						</div>
						<Alert
							className="fixed top-4 lg:top-[90%] lg:row-[30%] lg:left-[70%] "
							alert={alert}
							setAlert={setAlert}
						/>
					</div>
					{addAddress ? (
						<AddAddressCard setAddAddress={setAddAddress} setUser={setUser} />
					) : null}
				</div>
			</div>
		</>
	);
};

export default PlaceOrder;
