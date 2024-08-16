import React,{useState,useEffect,useRef} from 'react'
import canvasLoader from '../../../utils/canvasLoader';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const CusineCard = ({ cusine, isLoading }) => {
	const [imageData, setImageData] = useState(null);
	const canvasRef = useRef(null);

	useEffect(() => {
		if (!isLoading) {
			canvasLoader(
				cusine?.["food"][0]?.["images"][0]?.blurHash,
				canvasRef,
				setImageData
			);
		}
	}, []);

	if (!isLoading) {
		return (
			<div className="lg:w-[9rem] lg:h-[11rem] md:w-[6rem] md:h-[8rem] w-[4rem] h-[6rem] first:hidden md:first:flex flex flex-col justify-center items-center mt-3  ">
				<canvas
					className="animate-pulse rounded-full w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem]  mb-2 "
					ref={canvasRef}
				></canvas>
				<Skeleton width={100} containerClassName='flex-1'/>
			</div>
		);
	}
  return (
		<>
			<Link
				to={`/restaurant/food%20bite/order-online/${cusine?.category}`}
				className="lg:w-[9rem] lg:h-[11rem] md:w-[6rem] md:h-[8rem] w-[4rem] h-[6rem] first:hidden md:first:flex flex flex-col justify-center items-center mt-3  "
			>
				<img
					src={cusine?.["food"][0]?.["images"][0]?.url}
					loading="lazy"
					alt="image1"
					className="rounded-full w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem]  mb-2 hover:scale-110 transition-all duration-300 shadow-nice hover:shadow-color"
				/>

				<div className="capitalize text-xs md:text-base text-center ">
					{cusine?.category}
				</div>
			</Link>
		</>
  );
}

export default CusineCard