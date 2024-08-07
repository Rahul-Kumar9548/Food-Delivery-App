import React, {useEffect, useState} from 'react'
import Sidebar from '../../components/Home/Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
const Restaurant = () => {
    const { name } = useParams();
    const [restaurant, setRestaurant] = useState({});
    
    const getRestaurant = async ()=> {
        try {
            const {data} = await axios.get(`/restaurant/get-restaurant/${name}`);
            console.log(data.restaurant);
            setRestaurant(data.restaurant);
            // let image1 = restaurant?.images[0]?.url
            // let image2 = restaurant?.images[1]?.url
            // let image3 = restaurant?.images[2]?.url
            // let image4 = restaurant?.images[3]?.url 
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getRestaurant();
    }, []);
  return (
		<>
			<div
				style={{ height: "100rem" }}
				className="flex border-2 w-full  border-black"
			>
				<Sidebar />
				<div
					className="w-full mt-3 h-fit mr-2 bg-[#f0f0f0] ml-24 rounded-lg"
					style={{ height: "inherit" }}
				>
					<div className="h-[25%] border-2 flex gap-2 border-black rounded-lg">
						<div className="w-full h-full  overflow-hidden">
							<img
								src={restaurant.coverImage}
								className="w-full h-full hover:scale-110 transition-all duration-300"
								alt="image"
							/>
						</div>
						<div className="flex w-full h-full gap-2">
							<div className="w-full flex flex-row flex-wrap gap-2 ">
								<div className="w-full h-[50%] col-span-2 overflow-hidden">
									<img
										src={restaurant?.images?.[1]?.url}
										className="bottom-24 relative hover:scale-110 transition-all duration-300"
										alt="image"
									/>
								</div>

								<div className="w-[49%] h-[48%] overflow-hidden">
									<img
										src={restaurant?.images?.[0]?.url}
						
										className="hover:scale-110 transition-all duration-300"
										alt="image"
									/>
								</div>
								<div className="w-[49%] h-[48%] overflow-hidden">
									<img
            							src={restaurant?.images?.[2]?.url}
										className="hover:scale-110 transition-all duration-300"
										alt="image"
									/>
								</div>
							</div>
							<div className="w-[20%] h-full overflow-hidden">
								<img
									src={restaurant?.images?.[3]?.url}
									className=" h-full relative  hover:scale-110 transition-all duration-300"
									alt="image"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
  );
}

export default Restaurant