import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignUp = () => {
  const navigate= useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Vehicle info
  const [color, setColor] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);


  const submitHandler = async(e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        numberPlate: numberPlate,
        capacity: Number(capacity),
        vehicleType: vehicleType,
      },
    };

   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, newCaptain)
if(response.status=== 200){
   setCaptain(response.data.captain);
   localStorage.setItem('token', response.data.token);
   navigate('/captain-home')
   
}
  };

  return (
    <div className="p-7 h-screen flex-col flex justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
        />

        <form onSubmit={submitHandler}>
          {/* Name */}
          <h3 className="text-lg font-medium mb-2">What's Your Name</h3>
          <div className="flex gap-4 mb-7">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2"
              placeholder="First Name"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2"
              placeholder="Last Name"
            />
          </div>

          {/* Email */}
          <h3 className="text-lg font-medium mb-2">What's Your Email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full"
            placeholder="email@example.com"
          />

          {/* Password */}
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full"
            placeholder="Password"
          />

          {/* Vehicle Info */}
          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
            className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full"
            placeholder="Color"
          />
          <input
            type="text"
            value={numberPlate}
            onChange={(e) => setNumberPlate(e.target.value)}
            required
            className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full"
            placeholder="Number Plate"
          />
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full"
            placeholder="Capacity"
          />
          <input
            type="text"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full"
            placeholder="Vehicle Type (e.g., car, bike)"
          />

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-10">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
