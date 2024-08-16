import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const ResSubHeader = ({ name }) => {
	const [pageActive, setPageActive] = useState(null);
	useEffect(() => {
		setPageActive("order-online");
	},[])
  return (
		<div className="border-b-2 text-slate-800 border-slate-300 bg-white flex justify-around items-center h-[2.5rem] lg:[4rem]">
			<Link
				to={"/restaurant/" + name + "/order-online"}
				className={`px-2 lg:px-4 hover:font-bold hover:border-b-orange-500 h-full hover:border-b-2 hover:bg-gradient-to-t hover:from-orange-100 hover:to-white ${
					pageActive === "order-online"
						? "border-b-orange-500 font-bold border-b-2 bg-gradient-to-t from-orange-100 to-white"
						: ""
				}`}
				onClick={() => setPageActive("order-online")}
			>
				Order Online
			</Link>
			<Link
				to={"/restaurant/" + name + "/reviews"}
				className={`px-2 lg:px-4 hover:font-bold hover:border-b-orange-500 h-full hover:border-b-2 hover:bg-gradient-to-t hover:from-orange-100 hover:to-white ${
					pageActive === "reviews"
						? "border-b-orange-500 font-bold border-b-2 bg-gradient-to-t from-orange-100 to-white"
						: ""
				}`}
				onClick={() => setPageActive("reviews")}
			>
				Reviews
			</Link>
			<Link
				to={"/restaurant/" + name + "/photos"}
				className={`px-2 lg:px-4 hover:font-bold hover:border-b-orange-500 h-full hover:border-b-2 hover:bg-gradient-to-t hover:from-orange-100 hover:to-white ${
					pageActive === "photos"
						? "border-b-orange-500 font-bold border-b-2 bg-gradient-to-t from-orange-100 to-white"
						: ""
				}`}
				onClick={() => setPageActive("photos")}
			>
				Photos
			</Link>
		</div>
  );
}

export default ResSubHeader