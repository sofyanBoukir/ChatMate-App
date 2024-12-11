import { Outlet,Navigate } from "react-router-dom";

const useAuth = () =>{
    const tokenExists = localStorage.getItem("token");
    return tokenExists !== null ? true : false;
}

export const UserAuth = () =>{
    const isUserAuthenticated = useAuth();
    return (
        isUserAuthenticated ? <Outlet /> : <Navigate to={"/"} />
    )
}