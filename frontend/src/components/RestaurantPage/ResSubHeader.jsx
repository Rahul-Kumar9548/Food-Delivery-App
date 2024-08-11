import React from 'react'
import { Link } from 'react-router-dom';

const ResSubHeader = ({ name }) => {

  return (
		<div className="border-b-2 text-slate-800 border-slate-300 bg-white flex justify-around items-center h-[2.5rem] lg:[4rem]">
			<Link
				to={"/restaurant/" + name + "/order-online"}
				className="px-2 lg:px-4 hover:font-bold hover:border-b-orange-500 h-full hover:border-b-2 hover:bg-gradient-to-t hover:from-orange-100 hover:to-white"
			>
				Order Online
			</Link>
			<Link
				to={"/restaurant/" + name + "/reviews"}
				className="px-2 lg:px-4 hover:font-bold hover:border-b-orange-500 h-full hover:border-b-2 hover:bg-gradient-to-t hover:from-orange-100 hover:to-white "
			>
				Reviews
			</Link>
			<Link
				to={"/restaurant/" + name + "/photos"}
				className="px-2 lg:px-4 hover:font-bold active:border-b-orange-500 hover:border-b-orange-500 h-full hover:border-b-2 hover:bg-gradient-to-t hover:from-orange-100 hover:to-white "
			>
				Photos
			</Link>
			<Link
				to={"/restaurant/" + name + "/menu"}
				className="px-2 lg:px-4 hover:font-bold hover:border-b-orange-500 h-full hover:border-b-2 hover:bg-gradient-to-t hover:from-orange-100 hover:to-white "
			>
				Menu
			</Link>
		</div>
  );
}

export default ResSubHeader