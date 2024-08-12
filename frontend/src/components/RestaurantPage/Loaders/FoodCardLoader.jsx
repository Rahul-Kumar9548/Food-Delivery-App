import React from 'react'
import Skeleton from 'react-loading-skeleton';

const FoodCardLoader = ({canvasRef}) => {
  return (
		<>
			<div className="bg-white overflow-hidden p-2 pb-2 flex w-full gap-2 h-fit lg:gap-4 lg:w-[60%] lg:h-[9rem] rounded-lg shadow-nice">
				<canvas
					className="animate-pulse rounded-lg"
					ref={canvasRef}
					width={100}
					height={90}
				></canvas>
				<div className="w-[80%] pb-1">
					<Skeleton width={"90%"} />
					<Skeleton width={"60%"} />
					<Skeleton width={"40%"} />
				</div>
			</div>
		</>
  );
}

export default FoodCardLoader