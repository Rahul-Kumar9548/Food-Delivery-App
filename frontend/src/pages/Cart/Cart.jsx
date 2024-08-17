import React, { useState, useEffect } from "react";
import Alert from "../../components/Alert";
import Sidebar from "../../components/Home/Sidebar/Sidebar";
import axios from "../../utils/axios";
import CartCard from "../../components/Cart/CartCard";

const Cart = ({user, setUser}) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [cart, setCart] = useState([]);
    const [spinning, setSpinning] = useState("");
    const [spinningDelete, setSpinningDelete] = useState("");

	const [alert, setAlert] = useState({
		error: "",
		success: "",
		info: "",
		warning: "",
    });
    let discount = 650;
    let fee = 40;

	useEffect(() => {
		// console.log(cart);

        async function getCart() {
            try {
                const { data } = await axios.get("/cart/view-cart-items");
                console.log(data);
                setCart([...cart, ...data.cart])
                setTotalPrice(data.totalPrice)
            } catch (error) {
                console.log(error);
                setAlert({...alert, error:error})
            }
        }
        getCart();
        // console.log(cart, totalPrice)

    }, []);
    
    async function increaseHandler(restaurant_name, category, id) {
        setSpinning(id);
        try {
            const { data } = await axios.get(`cart/cart-item-increase/${id}?restaurant_name=${restaurant_name}&category=${category}`);
            console.log(data)
            setUser({ ...user, cart: data.cart })
            setCart(data.cart);
            setTotalPrice(data.totalPrice);
            setSpinning('');
            setAlert({ ...alert, success: data.message });
        } catch (error) {
            console.log(error)
            setSpinning("");
            setAlert({ ...alert, error: error });

        }
        
    }
    async function decreaseHandler(restaurant_name, category, id) {
        setSpinning(id);
		try {
			const { data } = await axios.get(
				`cart/cart-item-decrease/${id}?restaurant_name=${restaurant_name}&category=${category}`
			);
			console.log(data);
			setUser({ ...user, cart: data.cart });
			setCart(data.cart);
			setTotalPrice(data.totalPrice);
			setSpinning("");
			setAlert({ ...alert, success: data.message });
		} catch (error) {
			console.log(error);
			setSpinning("");
			setAlert({ ...alert, error: error });
		}
    }

    async function deleteHandler(restaurant_name, category, id) {
		setSpinningDelete(id);
		try {
			const { data } = await axios.get(
				`cart/cart-item-delete/${id}?restaurant_name=${restaurant_name}&category=${category}`
			);
			console.log(data);
			setUser({ ...user, cart: data.cart });
			setCart(data.cart);
			setTotalPrice(data.totalPrice);
			setSpinningDelete("");
			setAlert({ ...alert, success: data.message });
		} catch (error) {
			console.log(error);
			setSpinningDelete("");
			setAlert({ ...alert, error: error });
		}
    }

	return (
		<>
			<div className="flex border-2 w-full border-black ">
				<Sidebar user={user} />
				<div className="w-full bg-slate-300 h-full">
					<div className="home-container relative overflow-y-auto md:ml-[6rem] rounded-lg m-1 mt-2 bg-white">
						<div className="text-center sticky bg-white top-0 p-4 flex justify-center  text-[40px] w-full pb-0">
							<h1 className="w-[80%] flex justify-center items-center gap-2 border-b-2 p-2">
								Your Cart!{" "}
								<img
									src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png"
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
								<div className="grid  gap-16 grid-cols-5 h-full ">
									<div className="col-span-3 space-y-4 mt-[1rem] ">
										{cart?.map(
											(cartItem, index) => (
												<CartCard
													key={index}
													food={
														cartItem.food
													}
													quantity={
														cartItem.quantity
													}
													restaurant_name={
														cartItem.restaurant_name
													}
													category={
														cartItem.category
													}
													decreaseHandler={
														decreaseHandler
													}
													increaseHandler={
														increaseHandler
													}
													spinning={
														spinning
													}
													deleteHandler={
														deleteHandler
													}
													spinningDelete={
														spinningDelete
													}
												/>
											)
										)}
									</div>
									<div className="bg-white fixed shadow-3d border-2 top-[8rem] right-[7rem] flex flex-col rounded-xl col-span-2 w-[30%] h-[22rem] space-y-4 p-4">
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
													discount +
													fee}
											</span>
										</p>

										<button className="cursor-pointer mb-8 transition-all  bg-orange-600 text-white px-6 py-2 rounded-lg border-green-400 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none">
											Place Order!
										</button>
									</div>
								</div>
							)}
						</div>
						<Alert
							className="fixed top-4 lg:top-[90%] lg:row-[30%] lg:left-[70%] "
							alert={alert}
							setAlert={setAlert}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Cart;
