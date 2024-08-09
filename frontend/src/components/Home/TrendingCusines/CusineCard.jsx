import React from 'react'

const CusineCard = ({ cusine }) => {
  return (
      <>
        <div className="lg:w-[9rem] lg:h-[11rem] md:w-[6rem] md:h-[8rem] w-[4rem] h-[6rem] first:hidden md:first:flex flex flex-col justify-center items-center mt-3  ">
					<img
						src={
							cusine?.["food"][0]?.["images"][0]?.url
						}
						alt="image1"
						className="rounded-full w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem]  mb-2 hover:scale-110 transition-all duration-300 shadow-nice hover:shadow-color"
					/>
              <div className="capitalize text-xs md:text-base text-center ">{cusine?.category}</div>
        </div>
    </>
  )
}

export default CusineCard