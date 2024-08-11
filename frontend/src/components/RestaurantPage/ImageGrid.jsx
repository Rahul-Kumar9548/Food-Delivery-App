import React,{useRef, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
// import { decodeBlurHash } from "fast-blurhash";
import canvasLoader from '../../utils/canvasLoader';

const ImageGrid = ({ coverImage, coverImageHash, images, isloading, hashes }) => {
	const [imageData, setImageData] = useState(null);

	const canvasRef1 = useRef(null);
	const canvasRef2 = useRef(null);
	const canvasRef3 = useRef(null);
	const canvasRef4 = useRef(null);
	const canvasRef5 = useRef(null);
	// let blurHash = "L8Bo{eMdIoI[~BROxZbc9}I;Rj%1";

	useEffect(() => {
		if (!isloading) {
			canvasLoader(
				"L8Bo{eMdIoI[~BROxZbc9}I;Rj%1",
				canvasRef1,
				setImageData
			);
			canvasLoader(
				"L7HA|L^$01^4.m?a=w9c-n%$9aMc",
				canvasRef2,
				setImageData
			);
			canvasLoader(
				"LQJaAib^NzRj~p%MRPWAADS5nhjY",
				canvasRef3,
				setImageData
			);
			canvasLoader(
				"LHIgo#_NPV.S9u%g_2tl%N?bS$WC",
				canvasRef4,
				setImageData
			);
			canvasLoader(
				"L3Fqgt4-19.R0zk=}o-p00?G01VE",
				canvasRef5,
				setImageData
			);
		}
	}, []);
	// console.log(hashes);

	return (
		<div className="hidden lg:grid grid-cols-2 gap-1 rounded-lg h-[20rem] xl:h-[25rem]">
			<div className="w-full h-full  overflow-hidden ">
				{isloading ? (
					<img
						src={coverImage}
						className="w-full h-full hover:scale-110 transition-all duration-300"
						alt="image"
					/>
				) : (
					<canvas
						className="w-full h-full animate-pulse"
						ref={canvasRef1}
					></canvas>
				)}
			</div>
			<div className="w-full h-full grid gap-1 grid-cols-3 overflow-hidden ">
				<div className="h-full grid grid-row-2 gap-1 col-span-2  overflow-hidden ">
					<div className="xl:h-[200px] overflow-hidden">
						{isloading ? (
							<img
								src={images?.[1]?.url}
								className="relative hover:scale-110 transition-all duration-300"
								alt="image"
							/>
						) : (
							<canvas
								className="w-full h-full animate-pulse"
								ref={canvasRef2}
							></canvas>
						)}
					</div>
					<div className="xl:h-[200px] grid grid-cols-2 gap-1  overflow-hidden ">
						<div className="h-full  overflow-hidden ">
							{isloading ? (
								<img
									src={images?.[0]?.url}
									className="h-full hover:scale-110 transition-all duration-300"
									alt="image"
								/>
							) : (
								<canvas
									className="w-full h-full animate-pulse"
									ref={canvasRef3}
								></canvas>
							)}
						</div>
						<div className="h-full  overflow-hidden ">
							{isloading ? (
								<img
									src={images?.[2]?.url}
									className="h-[200px] hover:scale-110 transition-all duration-300"
									alt="image"
								/>
							) : (
								<canvas
									className="w-full h-full animate-pulse"
									ref={canvasRef4}
								></canvas>
							)}
						</div>
					</div>
				</div>
				<div className=" h-full relative overflow-hidden ">
					{isloading ? (
						<img
							src={images?.[3]?.url}
							className=" h-full relative opacity-50  hover:scale-110 transition-all  duration-300"
							alt="image"
						/>
					) : (
						<canvas
							className="w-full h-full animate-pulse"
							ref={canvasRef5}
						></canvas>
					)}
					<div className="absolute top-[50%] left-[40%] z-10 underline underline-offset-4">
						<Link>View all</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageGrid