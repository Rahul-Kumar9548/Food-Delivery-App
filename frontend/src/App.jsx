import React, { useEffect } from 'react'
import './App.css'
import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import { useDispatch } from "react-redux";
import { setUser } from "../src/redux/slices/userSlice";


const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const savedUser = JSON.parse(localStorage.getItem("user"));
		console.log("Running useEffect");
		if (savedUser) {
			dispatch(setUser(savedUser));
		}
	})
  return (
	  <>
		  <BrowserRouter>
			  <Routes>
				  <Route path="/" element={<Login />} />
				  <Route path="/login" element={<Login />} />
				  <Route path="/signup" element={<Signup />} />
				  <Route path="/home" element={<Home />} />
			  </Routes>
		  </BrowserRouter>
		</>
  );
}

export default App