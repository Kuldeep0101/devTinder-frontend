import { Navigate, Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userData = useSelector((store) => store.user)

    const fetchUser = async () => {
        try {
            const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true })
            dispatch(addUser(res.data))
        } catch (error) {
            //if the error is related to 401 status (we made sure in verifyRoute middleware if user not loggedin then throw 401 error) we will redirect user to login page. 
            //if error is not about 401, show a popup or card of that perticular error
            if (error.status === 401) {
                navigate("/login")
            }

            console.log(error)
        }
    }
    useEffect(() => {
        if (!userData) {
            fetchUser()
        }

    }, [])

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Body;