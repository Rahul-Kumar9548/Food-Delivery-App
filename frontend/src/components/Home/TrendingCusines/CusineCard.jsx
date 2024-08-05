import React from 'react'
import './CusineCard.css'

const CusineCard = ({ cusine }) => {
  return (
      <>
        <div className="trend-cusine flex flex-col justify-center items-center  ">
					<img
						src={
							cusine?.["food"][0]?.["images"][0]?.url
						}
						alt="image1"
						className="rounded-full mb-2 hover:scale-110 transition-all duration-300 shadow-nice hover:shadow-color"
					/>
              <div className="capitalize">{cusine?.category}</div>
        </div>
    </>
  )
}

export default CusineCard