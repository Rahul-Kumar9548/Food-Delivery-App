import { Outlet, Navigate } from "react-router-dom";
import {useSelector} from "react-redux"

const ProtectedRoutes = () => {
    // const user = useSelector((state) => state.user);
    let user = localStorage.getItem("user");
     
    if(user) user = JSON.parse(user);
    // console.log(user);
    return user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;