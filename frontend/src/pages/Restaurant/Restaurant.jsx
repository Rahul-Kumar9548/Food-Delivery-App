import React, {useEffect, useState, createContext} from 'react'
import Sidebar from '../../components/Home/Sidebar/Sidebar';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import ImageSlider from '../../components/RestaurantPage/ImageSlider';
import ImageGrid from '../../components/RestaurantPage/ImageGrid';
import ResHeader from '../../components/RestaurantPage/ResHeader';
import ResSubHeader from '../../components/RestaurantPage/ResSubHeader';
import fetchUser from '../../utils/fetchUser';
import Alert from '../../components/Alert';


const OutletContext = createContext();
const Restaurant = ({user, setUser}) => {
    const { name } = useParams();
	const [restaurant, setRestaurant] = useState({});
	const [isloading, setIsloading] = useState(false);
	const [blurHashes, setBlurHashes] = useState([]);
	const [cusines, setCusines] = useState([]);
	const navigate = useNavigate();
	const [alert, setAlert] = useState({
		error: "",
		success: "",
		info: "",
		warning: "",
	})

    
    const getRestaurant = async ()=> {
        try {
			const { data } = await axios.get(`/restaurant/get-restaurant/${name}`);
			    // Get blur hashes after restaurant is set
			if (data.restaurant && data.restaurant.images) {
				const hashes = data.restaurant.images.map((image) => image.blurHash);
				setBlurHashes([data.restaurant.coverImageHash, ...hashes]);
				let cusinesList = data.restaurant.cusines?.map(
					(cuisine) => cuisine.category
				);
				setCusines(cusinesList);
			}
			setRestaurant(data.restaurant);
			setIsloading(true);
        } catch (error) {
			console.log(error);
        }
    }
	useEffect(() => {
		getRestaurant();
		navigate(`order-online`);
		
	}, []);

  return (
		<>
			<div className="flex border-2 w-full border-black ">
				<Sidebar user={user} />
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
							coverImageHash={restaurant.coverImageHash}
							images={restaurant.images}
							isloading={isloading}
							hashes={blurHashes}
						/>
						<div className="sticky top-0 z-10">
							<ResHeader
								name={restaurant.name}
								address={restaurant.address}
								cusines={cusines}
								isloading={isloading}
							/>
							<ResSubHeader name={restaurant.name} />
						</div>
						<OutletContext.Provider
							value={{
								restaurant,
								cusines,
								isloading,
								setUser,
								user,
								setRestaurant,
								setAlert,
								alert,
							}}
						>
							<Outlet />
						</OutletContext.Provider>
						<Alert
							className="fixed top-4 lg:top-[90%] lg:left-[70%] "
							alert={alert}
							setAlert={setAlert}
						/>
					</div>
				</div>
			</div>
		</>
  );
}

export default Restaurant;
export {OutletContext}