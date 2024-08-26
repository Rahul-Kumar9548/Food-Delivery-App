import React, { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
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
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import OrderHistory from './pages/OrderHistory/OrderHistory';

const App = () => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(false);
	},[])
  return (
		<>
			<SkeletonTheme baseColor="#B2BEB5" highlightColor="#444">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route
							path="/home"
							element={
								<Home
									loading={loading}
									setLoading={setLoading}
								/>
							}
						/>
						<Route
							path="/favourites"
							element={
								<Favourites
								/>
							}
						/>
						<Route
							path="/cart"
							element={
								<Cart
								/>
							}
						/>
						<Route
							path="/profile"
							element={
								<Profile
								/>
							}
						/>
						<Route
							path="/place-order"
							element={
								<PlaceOrder
								/>
							}
						/>
						<Route
							path="/orders"
							element={
								<OrderHistory
								/>
							}
						/>
						<Route
							path="/restaurant/:name"
							element={
								<Restaurant
								/>
							}
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