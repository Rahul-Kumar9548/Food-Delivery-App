import { Outlet, Navigate } from "react-router-dom";
import {useSelector} from "react-redux"

const ProtectedRoutes = () => {
    // const user = useSelector((state) => state.user);
    let user = localStorage.getItem("user");
    // console.log(user);
    if (user) {
        user = JSON.parse(user);
        return <Outlet />;
    }else{
        return <Navigate to="/login" />;
    }
    // console.log(user);
    // return user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;