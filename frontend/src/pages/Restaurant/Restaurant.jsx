import React, {useEffect, useState, createContext} from 'react'
import Sidebar from '../../components/Home/Sidebar/Sidebar';
import { Outlet, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import ImageSlider from '../../components/RestaurantPage/ImageSlider';
import ImageGrid from '../../components/RestaurantPage/ImageGrid';
import ResHeader from '../../components/RestaurantPage/ResHeader';
import { SkeletonTheme } from 'react-loading-skeleton';
import ResSubHeader from '../../components/RestaurantPage/ResSubHeader';

const OutletContext = createContext();
const Restaurant = () => {
    const { name } = useParams();
	const [restaurant, setRestaurant] = useState({});
	const [isloading, setIsloading] = useState(false);
	const [blurHashes, setBlurHashes] = useState([])
    
    const getRestaurant = async ()=> {
        try {
			const { data } = await axios.get(`/restaurant/get-restaurant/${name}`);
			    // Get blur hashes after restaurant is set
			if (data.restaurant && data.restaurant.images) {
				const hashes = data.restaurant.images.map((image) => image.blurHash);
				setBlurHashes([data.restaurant.coverImageHash, ...hashes]);
			}
			setRestaurant(data.restaurant);
			setIsloading(true);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
		getRestaurant();
		// let hashes = restaurant.images.map((image) => image.blurHash);
		// setBlurHashes([restaurant.coverImageHash, hashes]);
		
	}, []);

  return (
		<>
			<SkeletonTheme baseColor="#B2BEB5" highlightColor="#444">
				<div
					className="flex border-2 w-full border-black "
				>
					<Sidebar />
					<div className="w-full bg-slate-300 h-full">
						<div className="home-container relative overflow-y-auto md:ml-[6rem] rounded-lg m-1 mt-2">
							{/* Slider for Mobile */}
							<div className="h-[12rem] md:h-[15rem] lg:hidden w-full rounded-lg">
								<ImageSlider
									images={restaurant.images}
									isloading={isloading}
								/>
							</div>
							{/* Slider for Desktop */}
							<ImageGrid
								coverImage={restaurant.coverImage}
								coverImageHash={
									restaurant.coverImageHash
								}
								images={restaurant.images}
								isloading={isloading}
								hashes={blurHashes}
						  />		
						  	<div className='sticky top-0'>							  
								<ResHeader
									name={restaurant.name}
									address={restaurant.address}
									cusines={restaurant.cusines}
									isloading={isloading}
							  />
							  <ResSubHeader name={restaurant.name}/>
						  </div>
						  <OutletContext.Provider value={{ restaurant }}>
								<Outlet/>
						  </OutletContext.Provider>
						  
						  
						</div>
					</div>
				</div>
			</SkeletonTheme>
		</>
  );
}

export default Restaurant;
export {OutletContext}