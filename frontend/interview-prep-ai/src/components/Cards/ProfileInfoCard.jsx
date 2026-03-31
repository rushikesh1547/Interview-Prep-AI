import React, {useContext} from "react";
import {UserContext} from "../../context/userContext";
import {useNavigate} from "react-router-dom";

import { BASE_URL } from "../../utils/apiPaths";

// Fix image URLs that were saved with localhost during development
const fixImageUrl = (url) => {
    if (!url) return "/default-avatar.png";
    // Replace localhost:8000 with production backend URL
    if (url.includes("localhost:8000") && BASE_URL && !BASE_URL.includes("localhost")) {
        return url.replace(/https?:\/\/localhost:8000/, BASE_URL);
    }
    return url;
};

const ProfileInfoCard = () => {
    const {user , clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handelLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/")
    };
    return(
         user && (
        <div className="flex items-center">
            <img 
            src={fixImageUrl(user.profileImageUrl)}
            alt="profile" 
            className="w-11 h-11 bg-gray-300 rounded-full mr-3" />
            <div>
                <div 
                className="text-[15px] text-black font-bold leading-3"
                >
                    {user?.name || ""}

                </div>
                <button 
                className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
                onClick={handelLogout}
                >
                    Logout

                </button>
            </div>
        </div>
    )
  )
}

export default ProfileInfoCard