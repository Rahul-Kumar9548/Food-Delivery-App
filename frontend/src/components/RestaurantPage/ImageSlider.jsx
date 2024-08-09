import React,{useState, useEffect} from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const ImageSlider = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? images?.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
		const isLastSlide = currentIndex === images?.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
		setCurrentIndex(slideIndex);
  };
    useEffect(() => {
    setTimeout(() => {
      nextSlide();
    }, 5000);  
  },[currentIndex])
  return (
		<div className="h-full w-full m-auto relative group">
			<div
				style={{
					backgroundImage: `url(${images?.[currentIndex]?.url})`,
				}}
				className="w-full h-full bg-center bg-cover duration-500"
			></div>
			{/* Left Arrow */}
			<div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
				<BsChevronCompactLeft onClick={prevSlide} size={30} />
			</div>
			{/* Right Arrow */}
			<div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
				<BsChevronCompactRight onClick={nextSlide} size={30} />
			</div>
			<div className="flex absolute bottom-0 left-0 w-full justify-center py-2">
				{images?.map((slide, slideIndex) => (
					<div
						key={slideIndex}
						onClick={() => goToSlide(slideIndex)}
						className="text-2xl cursor-pointer"
					>
						<RxDotFilled style={{ color: "white" }} />
					</div>
				))}
			</div>
		</div>
  );
}

export default ImageSlider