import React,{useContext} from 'react'
import { OutletContext } from '../Restaurant'

const Photos = () => {
  const { restaurant, isloading } = useContext(OutletContext);
  const images = restaurant.images;
  console.log(images);
  return (
		<div className="grid lg:grid-cols-5 lg:gap-4 grid-cols-3 gap-2 p-2 lg:p-4 bg-white">
			{images?.map((image, index) => (
				<div className="h-[10rem] border-2">
					<a href={image.url} target="_blank">
						<img
							className="hover:scale-110 h-full w-full transition-all duration-300 "
							src={image.url}
							key={index}
							alt=""
						/>
					</a>
				</div>
			))}
			{images?.map((image, index) => (
				<div className="h-[10rem] border-2">
					<a href={image.url} target="_blank">
						<img
							className="hover:scale-110 h-full w-full transition-all duration-300 "
							src={image.url}
							key={index}
							alt=""
						/>
					</a>
				</div>
			))}
			{images?.map((image, index) => (
				<div className="h-[10rem] border-2">
					<a href={image.url} target="_blank">
						<img
							className="hover:scale-110 h-full w-full transition-all duration-300 "
							src={image.url}
							key={index}
							alt=""
						/>
					</a>
				</div>
			))}
		</div>
  );
}

export default Photos