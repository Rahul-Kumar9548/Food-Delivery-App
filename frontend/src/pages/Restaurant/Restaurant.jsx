import React, {useEffect, useState} from 'react'
import Sidebar from '../../components/Home/Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import ImageSlider from '../../components/RestaurantPage/ImageSlider';
import ImageGrid from '../../components/RestaurantPage/ImageGrid';
import ResHeader from '../../components/RestaurantPage/ResHeader';

const Restaurant = () => {
    const { name } = useParams();
    const [restaurant, setRestaurant] = useState({});
    
    const getRestaurant = async ()=> {
        try {
            const {data} = await axios.get(`/restaurant/get-restaurant/${name}`);
            setRestaurant(data.restaurant);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getRestaurant();
	}, []);
	console.log(restaurant.images);
  return (
		<>
			<div style={{ height: "100rem" }}	className="flex border-2 w-full  border-black">
				<Sidebar />
				<div className="w-full bg-slate-300">
				  <div className="home-container overflow-hidden md:ml-[6rem] rounded-lg m-1 mt-2">
					  {/* Slider for Mobile */}
						<div className="h-[12rem] md:h-[15rem] lg:hidden w-full rounded-lg">
							<ImageSlider images={restaurant.images} />
					  </div>
					  {/* Slider for Desktop */}
					  <ImageGrid coverImage={restaurant.coverImage} images={restaurant.images} />
					  <ResHeader restaurant={restaurant} />
					</div>
				</div>
			</div>
		</>
  );
}

export default Restaurant