import React, { useState, useEffect } from "react";
import Alert from "../../components/Alert";
import fetchUser from "../../utils/fetchUser";
import Sidebar from "../../components/Home/Sidebar/Sidebar";
import axios from "../../utils/axios";

const Profile = ({user}) => {
	const [isLoading, setIsLoading] = useState(false);

	const [alert, setAlert] = useState({
		error: "",
		success: "",
		info: "",
		warning: "",
	});

	useEffect(() => {
	}, []);

	return (
		<>
			<div className="flex border-2 w-full border-black ">
				<Sidebar user={user} />
				<div className="w-full bg-slate-300 h-full">
					<div className="home-container p-4 relative overflow-y-auto md:ml-[6rem] rounded-lg m-1 mt-2">
						<h1 className="text-center text-[40px]">
							Profile
						</h1>
						<div>
							
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

export default Profile;
