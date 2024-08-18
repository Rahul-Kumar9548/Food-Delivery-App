import React,{useState, useEffect} from 'react'
import Alert from '../../components/Alert';
import fetchUser from '../../utils/fetchUser';
import Sidebar from '../../components/Home/Sidebar/Sidebar';
import axios from '../../utils/axios';
import Restaurants from '../../components/Home/Restaurants/Restaurants';

const Favourites = ({user}) => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [favoriteRestaurant, setFavouriteRestaurant] = useState(null);
    const [onFavourite, setOnFavourite] = useState(true);


    const [alert, setAlert] = useState({
		error: "",
		success: "",
		info: "",
		warning: "",
    });


    useEffect(() => {
        setFavouriteRestaurant(user.favourites)
        console.log(user);

        async function getRestaurants() {
			try {
				const { data } = await axios.get(
					"restaurant/get-favourites"
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

    async function deleteBtnHandler(restaurantId) {
        try {
			await axios.get(
				`profile/delete-favourite/${restaurantId}`
            );
            const { data } = await axios.get("restaurant/get-favourites");
			fetchUser().then((res) => setUser(res));
			console.log(data.favourites);

			setRestaurants(data.favourites);
			setIsLoading(true);
        setAlert({...alert, success:"Restaurant removed Successfully!"})
		} catch (error) {
            console.log(error);
            setAlert({...alert, error: error.response.data})
		}
    }
  return (
		<>
			<div className="flex border-2 w-full border-black ">
				<Sidebar user={user} />
				<div className="w-full bg-slate-300 h-full">
					<div className="home-container p-4 relative overflow-y-auto md:ml-[6rem] rounded-lg m-1 mt-2">
						<h1 className="mx-auto w-[90%] self-center text-[30px] lg:text-[40px] flex justify-center items-center gap-2 border-b-2 p-2">
							Your Favourites{" "}
							<img
								src="https://cdn-icons-png.flaticon.com/128/263/263417.png"
								className="w-[40px] h-[40px]"
								alt=""
							/>
						</h1>
						<div>
							{restaurants.length === 0 ? (
								<div className="text-[30px] text-slate-300 mt-[20%] text-center">
									Empty
								</div>
							) : (
								<Restaurants
									restaurants={restaurants}
									isLoading={setIsLoading}
									onFavourite={onFavourite}
									deleteBtnHandler={deleteBtnHandler}
								/>
							)}
						</div>
						<Alert
							className="fixed top-4 lg:top-[90%] lg:row-[30%] lg:left-[70%] "
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