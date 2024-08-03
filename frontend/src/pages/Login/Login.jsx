import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import loginCover from "../../assets/images/login.jpeg";
import axios from "../../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import MissFieldLogo from "../../components/MissFieldLogo/MissFieldLogo";
import InlineAlert from "../../components/InlineAlert/InlineAlert";

const Login = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const user = useSelector((state=>state.user));
	const dispatch = useDispatch();
	const [userFeildCheck, setUserFeildCheck] = useState(false);
	const [passwordFeildCheck, setPasswordFeildCheck] = useState(false);
	const [invalidEmail, setInvalidEmail] = useState({ invalid: false, alertMsg: "" })
	const [invalidPassword, setInvalidPassword] = useState({
		invalid: false,
		alertMsg: "",
	});


	async function handleSubmit(e) {
		e.preventDefault();
		const username = usernameRef.current.value.trim();
		const password = passwordRef.current.value.trim();
		if(!username) setUserFeildCheck(true);
		if (!password) setPasswordFeildCheck(true);
		if(username) setUserFeildCheck(false);
		if(password) setPasswordFeildCheck(false);

		setInvalidEmail({
			invalid: false,
			alertMsg: '',
		});
		setInvalidPassword({
			invalid: false,
			alertMsg: '',
		});
		

		try {
			if (username && password) {
				const { data } = await axios.post("login", {
					username,
					password,
				});
				console.log(data.user);
				dispatch(setUser(data.user));				
			}
			
		} catch (error) {
			console.log(error.response.data);
			if(error.response.data.status === 400)
				setInvalidEmail({ invalid: true, alertMsg: error.response.data.message });
			if(error.response.data.status === 401)
				setInvalidPassword({ invalid: true, alertMsg: error.response.data.message });
		}
		// console.log(user);
	}

	return (
		<div className="container flex justify-center w-full py-4 mx-auto h-screen">
			<div className="h-full hidden md:block w-2/6">
				<img
					src={loginCover}
					alt="login"
					className="h-full hidden md:block shadow-nice rounded-s-xl w-full"
				/>
			</div>
			<div className=" lg:w-4/6 shadow-nice h-full rounded-e-xl bg-white border-2 px-14 md:w-11/12">
				<form
					action="#"
					method="post"
					className="container flex flex-col gap-3 p-14 mx-auto border-2 my-24 border-grey-200 max-w-md rounded-xl shadow-nice"
				>
					<h2 className="text-xl text-center theme-color mb-4">
						Login to The Gourmet Grub
					</h2>

					<div className="form__group field">
						<div className="flex">
							<input
								type="input"
								class="form__field"
								placeholder="Username or Email"
								name="username"
								required=""
								ref={usernameRef}
							/>
							{userFeildCheck && (
								<MissFieldLogo message="Please Provide Username or Email" />
							)}
							<label for="name" className="form__label">
								Username or Email
							</label>
						</div>
						{invalidEmail.invalid && (
							<InlineAlert
								message={invalidEmail.alertMsg}
							/>
						)}
					</div>

					<div className="form__group field">
						<div className="flex">
							<input
								type="password"
								name="password"
								className="form__field"
								placeholder="Password"
								required=""
								ref={passwordRef}
							/>
							{passwordFeildCheck && (
								<MissFieldLogo message="Please Provide Password" />
							)}
							<label for="name" className="form__label">
								Password
							</label>
						</div>
						{invalidPassword.invalid && (
							<InlineAlert
								message={invalidPassword.alertMsg}
							/>
						)}
					</div>

					<div className="justify-self-end">
						<button
							className="button mt-8"
							onClick={handleSubmit}
						>
							Login
							<svg
								fill="currentColor"
								viewBox="0 0 24 24"
								className="icon"
							>
								<path
									clip-rule="evenodd"
									d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
									fill-rule="evenodd"
								></path>
							</svg>
						</button>
						<div className="text-sm text-slate-600 mt-4">
							Create a new account ? &nbsp;
							<Link
								to="/signup"
								className="theme-color underline"
							>
								Signup
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
