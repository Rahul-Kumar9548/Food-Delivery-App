import React from 'react'
import './App.css'
import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup/Signup';


const App = () => {
  return (
	  <>
		  <BrowserRouter>
			  <Routes>
				  <Route path="/" element={<Login />} />
				  <Route path="/login" element={<Login />} />
				  <Route path="/signup" element={<Signup />} />
			  </Routes>
		  </BrowserRouter>
		</>
  );
}

export default App