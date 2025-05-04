import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}` // ✅ with space
        }
      });
      localStorage.removeItem("token");
      navigate("/user-login");
    } catch (err) {
      console.error("Logout failed:", err);
      navigate("/user-login"); // optionally still navigate
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
};

export default UserLogout;
