import { Outlet, Navigate } from "react-router-dom";
import {useSelector} from "react-redux"

const ProtectedRoutes = () => {
    const user = useSelector((state) => state.user);
    console.log(user);
    return user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;