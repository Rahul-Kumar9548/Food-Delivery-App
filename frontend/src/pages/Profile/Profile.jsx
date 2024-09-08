import React, { useState, useEffect, useRef } from "react";
import Alert from "../../components/Alert";
import Sidebar from "../../components/Home/Sidebar/Sidebar";
import axios from "../../utils/axios";
import AddressCard from "../../components/AddressCard";
import AddAddressCard from "../../components/AddAddressCard";
import Spinner from "../../components/Spinner/Spinner";
import FormData from "form-data";
import Logout from "../../components/Home/Logout/Logout";
import { setUser, getUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
	const user = useSelector((state) => state.user);
	const [isEdit, setIsEdit] = useState(false);
	const [current, setCurrent] = useState("about");
	const [select, setSelect] = useState("");
	const [addNewAddress, setAddNewAddress] = useState(false);
	const [spinning, setSpinning] = useState("");
	const [saving, setSaving] = useState(false);
	const [boxSpinning, setBoxSpinning] = useState(true);
	const dispatch = useDispatch();
	const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image

	let userRef = useRef();
	let usernameRef = useRef();
	let emailRef = useRef();
	let imageRef = useRef();
	let contactRef = useRef();

	const [alert, setAlert] = useState({
		error: "",
		success: "",
		info: "",
		warning: "",
	});

	useEffect(() => {
		setBoxSpinning(false);
		console.log(user);
	}, []);

	async function updateUser() {
		setSaving(true);
		console.log(imageRef.current.files[0]);
		let formData = new FormData();
		if (userRef.current.value)
			formData.append("name", userRef.current.value);
		if (usernameRef.current.value)
			formData.append("username", usernameRef.current.value);
		if (emailRef.current.value)
			formData.append("email", emailRef.current.value);
		if (contactRef.current.value)
			formData.append("contact", contactRef.current.value);
		if (imageRef.current.files[0])
			formData.append("image", imageRef.current.files[0]);

		try {
			const { data } = await axios.post(
				"/profile/update-details",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			// console.log(data);
			dispatch(setUser({ ...user, ...data.data }));
			setSaving(false);
			setIsEdit(false);
			setAlert({ alert, success: "Profile Updated Successfully!" });
		} catch (error) {
			console.log(error);
			setSaving(false);
			setIsEdit(false);
			setAlert({ alert, error: "Error On Updating Profile!" });
		}
	}

	async function deleteHandler(id) {
		setSpinning(id);
		try {
			const { data } = await axios.get(
				`/profile/delete-address/${id}`
			);
			// console.log(data);
			dispatch(setUser({ ...user, addresses: data.data }));
			setAlert({ alert, success: data.message });
			setSpinning("");
		} catch (error) {
			console.log(error);
			setSpinning("");
			setAlert({ alert, error: "Error On Deleeting Address!" });
		}
	}

	// Function to handle image selection
	const handleImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			setSelectedImage(URL.createObjectURL(event.target.files[0]));
		}
	};
	return (
		<>
			<div className="flex w-full ">
				<Sidebar user={user} />
				<div className="w-full bg-slate-300 h-full">
					<div
						className={`${
							addNewAddress ? "brightness-50 blur" : ""
						} home-container bg-white p-4 relative overflow-y-auto md:ml-[6rem] rounded-lg m-1 mt-2`}
					>
						<h1 className="text-center text-[30px] lg:text-[40px] w-[95%] lg:w-[60%] border-b-2 mx-auto mb-4">
							Your Profile!
						</h1>
						{boxSpinning ? (
							<Spinner className="w-12 h-12 absolute top-[300px] left-[50%] z-10" />
						) : (
							<div className=" lg:w-[60%] h-full mx-auto">
								<div className="relative mx-auto rounded-full w-[150px] lg:w-[200px] lg:h-[200px] h-[150px] overflow-hidden">
									<img
										src={selectedImage ? selectedImage : user?.image}
										className="rounded-full mx-auto w-[150px] lg:w-[200px] h-[150px] lg:h-[200px]"
										alt=""
									/>
									{isEdit && (
										<input
											type="file"
											className="absolute bottom-0 left-3 lg:left-9 w-[8rem] z-10 cursor-pointer opacity-0"
											name="editImage"
											ref={imageRef}
											onChange={
												handleImageChange
											}
										/>
									)}
									{isEdit && (
										<label
											htmlFor="editImage"
											className="absolute bottom-0 left-3 lg:left-9 w-[8rem] text-center bg-black opacity-50  cursor-pointer text-white "
										>
											Edit
										</label>
									)}
								</div>
								<h1 className="capitalize text-xl text-center p-2">
									{user.name}
								</h1>
								<div className="bg-white w-full text-center grid grid-cols-2">
									<div
										className={`border-b-2 p-3  ${
											current === "about"
												? "border-orange-500 bg-gradient-to-t from-orange-100 to-white cursor-pointer"
												: "border-slate-300"
										} `}
										onClick={() =>
											setCurrent("about")
										}
									>
										About
									</div>
									<div
										className={`border-b-2  p-3 ${
											current === "address"
												? "border-orange-500 bg-gradient-to-t from-orange-100 to-white cursor-pointer "
												: "border-slate-300"
										} `}
										onClick={() =>
											setCurrent("address")
										}
									>
										Address
									</div>
								</div>
								{current === "about" ? (
									<div className="w-full p-4 space-y-2 pl-12 relative">
										<div className="flex flex-row-reverse">
											<img
												src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
												alt=""
												className=" w-[20px] hover:scale-110 transition-all hover:shadow-lg"
												onClick={() =>
													setIsEdit(true)
												}
											/>
										</div>
										<p className="space-x-2">
											<span className="font-bold ">
												Full Name:
											</span>
											<span className="capitalize relative">
												{user.name}
												{isEdit && (
													<input
														type="text"
														ref={
															userRef
														}
														placeholder={
															user.name
														}
														className="capitalize border-b focus:outline-none absolute left-0"
													/>
												)}
											</span>
										</p>
										<p className="space-x-2">
											<span className="font-bold ">
												Username:
											</span>
											<span className="relative">
												{user.username}
												{isEdit && (
													<input
														type="text"
														ref={
															usernameRef
														}
														placeholder={
															user.username
														}
														className="border-b focus:outline-none absolute left-0"
													/>
												)}
											</span>
										</p>
										<p className="space-x-2">
											<span className="font-bold ">
												Contact:
											</span>
											<span className="relative">
												9854124354
												{isEdit && (
													<input
														type="text"
														ref={
															contactRef
														}
														placeholder={
															"9854124354"
														}
														className="capitalize border-b focus:outline-none absolute left-0"
													/>
												)}
											</span>
										</p>
										<p className="space-x-2">
											<span className="font-bold ">
												Email:
											</span>
											<span className="relative">
												{user.email}
												{isEdit && (
													<input
														type="text"
														ref={
															emailRef
														}
														placeholder={
															user.email
														}
														className=" border-b focus:outline-none absolute left-0"
													/>
												)}
											</span>
										</p>
										<div className="fixed bottom-[5rem] right-[1.5rem] md:hidden">
											{!isEdit && <Logout />}
										</div>
										<div className="flex flex-row-reverse">
											{isEdit && (
												<div className="flex gap-2">
													{saving ? (
														<Spinner className="w-12 h-12" />
													) : (
														<button
															className="cursor-pointer transition-all bg-green-500 text-white px-6 py-2 rounded-lg border-green-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
															onClick={
																updateUser
															}
														>
															Save
														</button>
													)}
													<button
														className="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-red-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
														onClick={() =>
														{
															setSelectedImage('');
															setIsEdit(false);
														}
														}
													>
														Cancel
													</button>
												</div>
											)}
										</div>
									</div>
								) : (
									<div className="w-full p-4 space-y-2 pl-12">
										<div className="flex flex-row-reverse mb-4">
											<button
												title="Add New"
												className="group cursor-pointer outline-none hover:rotate-90 duration-300"
												onClick={() =>
													setAddNewAddress(
														true
													)
												}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="50px"
													height="50px"
													viewBox="0 0 24 24"
													class="stroke-orange-400 fill-none group-hover:fill-orange-800 group-active:stroke-orange-200 group-active:fill-orange-600 group-active:duration-0 duration-300"
												>
													<path
														d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
														stroke-width="1.5"
													></path>
													<path
														d="M8 12H16"
														stroke-width="1.5"
													></path>
													<path
														d="M12 16V8"
														stroke-width="1.5"
													></path>
												</svg>
											</button>
										</div>
										{user?.addresses?.length ===
										0 ? (
											<div className="text-3xl mx-auto w-fit text-slate-400">
												Empty
											</div>
										) : (
											<div className="lg:col-span-3 space-y-4 mt-[1rem] ">
												{user?.addresses?.map(
													(
														address,
														index
													) => (
														<AddressCard
															key={
																index
															}
															select={
																select
															}
															setSelect={
																setSelect
															}
															address={
																address
															}
															selectDisplay={
																false
															}
															deleteEditDisplay={
																true
															}
															deleteHandler={
																deleteHandler
															}
															spinning={
																spinning
															}
														/>
													)
												)}
											</div>
										)}
									</div>
								)}
							</div>
						)}
						<Alert
							className="fixed top-4 lg:top-[90%] lg:row-[30%] lg:left-[70%] "
							alert={alert}
							setAlert={setAlert}
						/>
					</div>
					{addNewAddress ? (
						<AddAddressCard
							setAddAddress={setAddNewAddress}
							setUser={setUser}
						/>
					) : null}
				</div>
			</div>
		</>
	);
};

export default Profile;
