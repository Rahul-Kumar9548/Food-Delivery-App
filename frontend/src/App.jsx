import React, { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import { useDispatch } from "react-redux";
import { setUser } from "../src/redux/slices/userSlice";
import Restaurant from './pages/Restaurant/Restaurant';
import OrderOnline from './pages/Restaurant/Outlets/OrderOnline';
import Reviews from './pages/Restaurant/Outlets/Reviews';
import Photos from './pages/Restaurant/Outlets/Photos';
import Menu from './pages/Restaurant/Outlets/Menu';
import FoodCardContainer from "./pages/Restaurant/Outlets/FoodCardContainer";
import { SkeletonTheme } from 'react-loading-skeleton';
import Favourites from './pages/Favourites/Favourites';
import Cart from './pages/Cart/Cart';
import Profile from './pages/Profile/Profile';
import fetchUser from "./utils/fetchUser";
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';


const App = () => {
	const [user, setUser] = useState({});

	const dispatch = useDispatch();
	useEffect(() => {
		// const savedUser = JSON.parse(localStorage.getItem("user"));
		// // console.log("Running useEffect");
		// if (savedUser) {
		// 	dispatch(setUser(savedUser));
		// }
		fetchUser().then((res) => setUser(res));

	})
  return (
		<>
			<SkeletonTheme baseColor="#B2BEB5" highlightColor="#444">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/home" element={<Home user={user}/>} />
						<Route path="/favourites" element={<Favourites user={user}/>}/>
					  	<Route path='/cart' element={<Cart user={user} setUser={setUser} cart={user?.cart} />} />
					  <Route path="/profile" element={<Profile user={user} />} />
					  <Route path="/place-order" element={<PlaceOrder user={user} setUser={setUser} />} />
						<Route
							path="/restaurant/:name"
							element={<Restaurant user={user} setUser={setUser} />}
						>
							<Route
								path="order-online"
								element={<OrderOnline />}
							>
								<Route
									index
									path=":cusine"
									element={<FoodCardContainer />}
								></Route>
							</Route>
							<Route
								path="reviews"
								element={<Reviews />}
							></Route>
							<Route
								path="photos"
								element={<Photos />}
							></Route>
							<Route
								path="menu"
								element={<Menu />}
							></Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</SkeletonTheme>
		</>
  );
}

export default App