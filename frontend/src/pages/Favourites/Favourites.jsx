import React,{useState, useEffect} from 'react'
import Alert from '../../components/Alert';
import fetchUser from '../../utils/fetchUser';
import Sidebar from '../../components/Home/Sidebar/Sidebar';
import axios from '../../utils/axios';
import Restaurants from '../../components/Home/Restaurants/Restaurants';

const Favourites = () => {
    const [user, setUser] = useState({});
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [favoriteRestaurant, setFavouriteRestaurant] = useState(null);

    const [alert, setAlert] = useState({
		error: "",
		success: "",
		info: "",
		warning: "",
    });


    useEffect(() => {
        // setIsLoading(true);
        fetchUser().then((res) => setUser(res));
        setFavouriteRestaurant(user.favourites)
        console.log(user);

        async function getRestaurants() {
			try {
				const { data } = await axios.get(
					"restaurant//get-favourites"
				);
               
                console.log(data.favourites);

                setRestaurants(data.favourites);
                setIsLoading(true);
				// console.log(favRestaurants);
			} catch (error) {
				console.log(error);
			}
        }
        getRestaurants();
    }, []);
  return (
		<>
			<div className="flex border-2 w-full border-black ">
				<Sidebar user={user} />
				<div className="w-full bg-slate-300 h-full">
					<div className="home-container p-4 relative overflow-y-auto md:ml-[6rem] rounded-lg m-1 mt-2">
						<h1 className="text-center text-[40px]">
							Favourites
						</h1>
						<div>
							<Restaurants
								restaurants={restaurants}
								isLoading={setIsLoading}
							/>
						</div>
						<Alert
							className="fixed top-4 lg:bottom-0 lg:row-[30%] lg:left-[70%] "
							alert={alert}
							setAlert={setAlert}
						/>
					</div>
				</div>
			</div>
		</>
  );
}

export default Favourites