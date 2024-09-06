/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../Components/Loading/Loading";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()
    
 if(loading){
    return <Loading/>
 }

if(user){
    return children;
}

return <Navigate state={location?.pathname} to="/login"/>

};

export default PrivateRoute;