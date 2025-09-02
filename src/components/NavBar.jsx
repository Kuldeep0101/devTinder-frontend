import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";

const NavBar = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/login")
        } catch (error) {
            //error handle logic- redirect to error page
           
            console.log(error);
        }
    };

    return (
        <>
            <div className="navbar bg-cyan-50 base-300 shadow-sm">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">
                        PullRequest ❤️
                    </Link>
                </div>
                <div className="flex-none">
                    {user && (
                        <div className="dropdown dropdown-end mx-1.5">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img alt="User_Image" src={user.photoUrl} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        {user.firstName}'s Profile
                                        {/* <span className="badge">New</span> */}
                                    </Link>
                                </li>

                                <li>
                                    
                                </li>
{/* 
                                <li>
                                    <a>Settings</a>
                                </li> */}
                                <li>
                                    <a className=" hover:bg-red-300 active:bg-blue-800" onClick={handleLogout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default NavBar;
