import React,{useEffect} from 'react'
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

const CusineBtn = ({restaurantName,cusine,isloading,activeElement,setActiveElement}) => {
	const navigate = useNavigate();
	function clickHandler() {
		setActiveElement(cusine);
        navigate(`/restaurant/${restaurantName}/order-online/${cusine}`);
	}
	useEffect(() => {
		setActiveElement("irish");
	},[])
	
	if (!isloading) {
		return (
			<div className=" md:pl-20 xl:pl-32 border-slate-300 p-2 h-[2.5rem] w-full ">
				<Skeleton height={"100%"} width={"100%"} />
			</div>
		);
	}
	return (
		<div
			className={`capitalize cursor-pointer text-left md:pl-20 xl:pl-32 border-slate-300 p-3 w-full hover:font-bold hover:border-r-2 hover:border-r-orange-500 hover:bg-gradient-to-l hover:from-orange-100 hover:to-white ${
				activeElement === cusine
					? "  bg-gradient-to-l from-orange-100 to-white font-bold border-r-2 border-r-orange-500"
					: ""
			}`}
			onClick={() => clickHandler()}
		>
			{cusine}
		</div>
	);
};

export default CusineBtn