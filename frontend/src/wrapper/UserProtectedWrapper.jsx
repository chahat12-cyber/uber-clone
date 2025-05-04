import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/user-login");
    }
    const fetchUserProfile = async () => {
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
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching captain profile:", error);
        localStorage.removeItem("token");
        navigate("/captain-login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, navigate, setUser]); // dependencies go here

  return <>{children}</>;
};

export default UserProtectedWrapper;
