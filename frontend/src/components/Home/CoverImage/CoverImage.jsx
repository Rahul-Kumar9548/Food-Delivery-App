import React, {useEffect, useRef, useState} from 'react'
import './CoverImage.css'
import canvasLoader from "../../../utils/canvasLoader";
import coverImage from '../../../assets/images/HomeCover.png'

const CoverImage = ({ isLoading }) => {
	const [imageData, setImageData] = useState(null);
	const canvasRef = useRef(null);

	useEffect(() => {
		if (!isLoading) {
			canvasLoader(
				"LQKd3l-;EOae_N%MM}jYT1R*Rit6",
				canvasRef,
				setImageData
			);
		}
	}, []);
  return (
		<>
			<div
				style={{
					backgroundImage: isLoading
						? `url(${coverImage})`
						: "none",
				}}
				className="cover-Image md:width-full rounded-t-lg md:relative overflow-hidden"
			>
				{isLoading ? (
					<div className="md:absolute relative -bottom-32 md:bottom-20 xl:bottom-[10rem] search-bar w-full">
						<form className="form relative w-[80%] md:w-[70%] mx-auto shadow-2xl rounded-full ">
							<button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
								<svg
									width="17"
									height="16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									role="img"
									aria-labelledby="search"
									className="w-5 h-5 text-gray-700"
								>
									<path
										d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
										stroke="currentColor"
										strokeWidth="1.333"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
								</svg>
							</button>
							<input
								className="input w-full rounded-full px-8 py-[0.35rem] md:py-3 border-2 border-transparent focus:outline-none focus:border-orange-500 placeholder-gray-400 focus:scale-110  transition-all duration-300 shadow-2xl"
								placeholder="Search..."
								required=""
								type="text"
							/>
							<button
								type="reset"
								class="absolute right-3 -translate-y-1/2 top-1/2 p-1"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-5 h-5 text-gray-700"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									></path>
								</svg>
							</button>
						</form>
					</div>
				) : (
					<canvas
						className="w-full h-full animate-pulse"
						ref={canvasRef}
					></canvas>
				)}
			</div>
		</>
  );
}

export default CoverImage