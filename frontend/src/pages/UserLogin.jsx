import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setpasword] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const {user, setUser} = useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );
    console.log(response.status);

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate("/home");
    }
    setEmail("");
    setpasword("");
  };
  return (
    <div className="p-7 h-screen flex-col flex justify-between ">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2 ">What's Your Email</h3>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            placeholder="email@example.com"
          ></input>

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => {
              setpasword(e.target.value);
            }}
            required
            placeholder="password"
          ></input>
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-10">
          {" "}
          New here ?{" "}
          <Link to="/user-signup" className=" mb-3 text-blue-600 ">
            Register as a User
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b401] flex items-center justify-center  text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign In As Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
