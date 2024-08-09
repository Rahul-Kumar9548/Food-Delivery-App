import React from 'react';
import { Link } from "react-router-dom";


const ImageGrid = ({ coverImage, images }) => {
    console.log(coverImage, images);
  return (
		<div className="hidden lg:grid grid-cols-2 gap-1 rounded-lg h-[20rem] xl:h-[25rem]">
			<div className="w-full h-full  overflow-hidden ">
				<img
					src={coverImage}
					className="w-full h-full hover:scale-110 transition-all duration-300"
					alt="image"
				/>
			</div>
			<div className="w-full h-full grid gap-1 grid-cols-3 overflow-hidden ">
				<div className="h-full grid grid-row-2 gap-1 col-span-2  overflow-hidden ">
					<div className="xl:h-[200px] overflow-hidden">
						<img
							src={images?.[1]?.url}
							className="relative hover:scale-110 transition-all duration-300"
							alt="image"
						/>
					</div>
					<div className="xl:h-[200px] grid grid-cols-2 gap-1  overflow-hidden ">
						<div className="h-full  overflow-hidden ">
							<img
								src={images?.[0]?.url}
								className="h-full hover:scale-110 transition-all duration-300"
								alt="image"
							/>
						</div>
						<div className="h-full  overflow-hidden ">
							<img
								src={images?.[2]?.url}
								className="h-[200px] hover:scale-110 transition-all duration-300"
								alt="image"
							/>
						</div>
					</div>
				</div>
				<div className=" h-full relative overflow-hidden ">
					<img
						src={images?.[3]?.url}
						className=" h-full relative opacity-50  hover:scale-110 transition-all  duration-300"
						alt="image"
					/>
					<div className="absolute top-[50%] left-[40%] z-10 underline underline-offset-4">
						<Link>View all</Link>
					</div>
				</div>
			</div>
		</div>
  );
}

export default ImageGrid