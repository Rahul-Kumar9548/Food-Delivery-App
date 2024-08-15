import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import signupCover from "../../assets/images/login2.jpeg";
import FormData from "form-data";
import axios from "../../utils/axios";
import MissFieldLogo from "../../components/Login&Signup/MissFieldLogo/MissFieldLogo";
import InlineAlert from "../../components/Login&Signup/InlineAlert/InlineAlert";

const Signup = () => {
	const nameRef = useRef();
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const imageRef = useRef();

	const [checkName, setCheckName] = useState(false);
	const [checkUsername, setCheckUsername] = useState(false);
	const [checkEmail, setCheckEmail] = useState(false);
	const [checkPassword, setCheckPassword] = useState(false);
	const [userExist, setUserExist] = useState(false);
	const [alert, setAlert] = useState("");
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		const name = nameRef.current.value.trim();
		const username = usernameRef.current.value.trim();
		const email = emailRef.current.value.trim();
		const password = passwordRef.current.value.trim();

		let formData = new FormData();
		formData.append("name", name);
		formData.append("username", username);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("image", imageRef.current.files[0]);

		if (!name) setCheckName(true);
		if (name) setCheckName(false);

		if (!username) setCheckUsername(true);
		if (username) setCheckUsername(false);

		if (!email) setCheckEmail(true);
		if (email) setCheckEmail(false);

		if (!password) setCheckPassword(true);
		if (password) setCheckPassword(false);
		setUserExist(false);

		try {
			if (
				name &&
				username &&
				email &&
				password &&
				imageRef.current.files[0]
			) {
				const { data } = await axios.post("signup", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				navigate("/login");
				// console.log(data);
			}
		} catch (error) {
			// console.log(error.response.data);
			if (error.response.data.status === 401) {
				setUserExist(true);
				setAlert(error.response.data.message);
			}
		}
	}

	return (
		<div className="flex justify-center w-full py-4 mx-auto h-screen xl:mx-3 xl:w-[98%] md:mx-3 md:w[95%]">
			<div className="h-full hidden lg:block w-2/6">
				<img
					src={signupCover}
					alt="signup"
					className="h-full shadow-nice rounded-s-xl w-full"
				/>
			</div>
			<div className=" lg:w-4/6 shadow-nice h-full rounded-e-xl bg-white border-2 px-6 md:w-11/12 flex justify-center items-center">
				<form className="container flex align-items-center flex-col gap-4 p-6 border-2 my-4 max-w-md border-grey-200 rounded-xl shadow-nice">
					<h2 className="text-xl text-center theme-color">
						Signup to The Gourmet Grub!
					</h2>

					<div className="form__group flex field">
						<input
							type="input"
							className="form__field"
							placeholder="Fullname"
							name="name"
							required=""
							ref={nameRef}
						/>
						{checkName && (
							<MissFieldLogo message="Please Provide Fullname!" />
						)}
						<label htmlFor="name" className="form__label">
							Fullname
						</label>
					</div>

					<div className="form__group flex field">
						<input
							type="input"
							className="form__field"
							placeholder="Username"
							required=""
							ref={usernameRef}
						/>
						{checkUsername && (
							<MissFieldLogo message="Please Provide Username" />
						)}
						<label htmlFor="username" className="form__label">
							Username
						</label>
					</div>

					<div className="form__group flex flex-col field">
						<div className="flex">
							<input
								type="input"
								className="form__field"
								placeholder="Email"
								required=""
								ref={emailRef}
							/>
							{checkEmail && (
								<MissFieldLogo message="Please Provide Email" />
							)}
							<label
								htmlFor="email"
								className="form__label"
							>
								Email
							</label>
						</div>
						{userExist && <InlineAlert message={alert} />}
					</div>

					<div className="form__group flex field ">
						<input
							type="password"
							className="form__field"
							placeholder="Password"
							required=""
							ref={passwordRef}
						/>
						{checkPassword && (
							<MissFieldLogo message="Please Provide Password" />
						)}
						<label htmlFor="password" className="form__label">
							Password
						</label>
					</div>

					<div className="mb-2">
						<label
							className="block mb-2 text-m font-medium text-gray-500"
							htmlFor="file_input"
						>
							Profile Image
						</label>
						<div className="flex gap-3">
							<input
								className="image-upload block w-10/12 text-sm  border border-gray-300 rounded cursor-pointer bg-gray-50 text-gray-400 focus:outline-none"
								id="file_input"
								type="file"
								ref={imageRef}
							/>
						</div>
					</div>

					<button className="button" onClick={handleSubmit}>
						Register
						<svg
							fill="currentColor"
							viewBox="0 0 24 24"
							className="icon"
						>
							<path
								clipRule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
								fillRule="evenodd"
							></path>
						</svg>
					</button>
					<div className="text-sm text-slate-600 mt-4">
						Already have an account ? &nbsp;
						<Link
							to="/login"
							className="theme-color underline"
						>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
