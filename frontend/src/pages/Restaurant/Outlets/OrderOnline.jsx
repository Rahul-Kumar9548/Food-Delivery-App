import React, { useContext } from 'react'
import { OutletContext } from '../Restaurant'
const OrderOnline = () => {
  const {restaurant} = useContext(OutletContext);
  console.log(restaurant);
  return (
		<div className="h-[150rem] grid grid-cols-3 relative">
      <div className="bg-red-400 h-96 border-2 ">
        
      </div>
      <div className="border-2 col-span-2 bg-green-300 w-full h-full">
        
      </div>
		</div>
  );
}

export default OrderOnline