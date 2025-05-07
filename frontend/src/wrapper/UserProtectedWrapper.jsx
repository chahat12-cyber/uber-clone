import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext);
  const token = localStorage.getItem("token");
  const [isloading, setLoading]= useState(true);
  useEffect(() => {
    if (!token) {
      navigate("/user-login");
    }
    const fetchUserProfile = async () => {
      console.log(token);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/getUserProfile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.status);
        if (response.status === 200) {
          setUser(response.data);
      
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        localStorage.removeItem("token");
        navigate("/user-login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, navigate]); // dependencies go here
if(isloading){
  return(
    <div>Loading...</div>
  )
}


  return <>{children}</>;
};

export default UserProtectedWrapper;
