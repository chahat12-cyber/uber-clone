import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout= ()=> {
    const navigate = useNavigate();

    const handleLogout = async () => {
      const token = localStorage.getItem("token");
  
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logoutCaptain`, {
          headers: {
            Authorization: `Bearer ${token}` // ✅ with space
          }
        });
        localStorage.removeItem("token");
        navigate("/captain-login");
      } catch (err) {
        console.error("Logout failed:", err);
        navigate("/captain-login"); // optionally still navigate
      }
    };
  
    return (
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    );

}


export default CaptainLogout