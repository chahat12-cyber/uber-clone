import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext"
import { useContext } from "react";
import LiveTracking from "../components/LiveTracking";
const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on('ride-ended', (data) => {
    console.log("Ride ended", data);
    // Navigate to the home page or any other page
    navigate("/home");
  }
  );
  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      {/* Map with Home Icon Overlay */}
      <div className="relative h-1/2 w-full">
        {/* Home Icon */}
        <Link
          to={"/home"}
          className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow">
          <i className="ri-home-9-line text-2xl text-gray-800"></i>
        </Link>

        {/* Map Image */}
       <LiveTracking/>
      </div>
      {/* Info Panel */}
      <div className="flex-1 bg-white rounded-t-3xl shadow-lg p-6">
        {/* Drag handle */}
        <div className="flex justify-center mb-4">
          <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
        </div>

        {/* Driver and Vehicle Info */}
        <div className="flex items-center justify-between mb-6">
          <img
            className="h-24 w-32 object-contain"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png"
            alt="Uber Go"
          />
          <div className="text-right">
            <h2 className="text-xl font-medium">{ride?.captain.fullname.firstname} {ride?.captain.fullname.lastname}</h2>
            <h4 className="text-lg font-semibold">{ride?.captain.vehicle.numberPlate}</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        {/* Pickup Address */}
        <div className="flex items-start gap-3 mb-6">
          <i className="text-lg ri-map-pin-3-fill text-gray-700 mt-1"></i>
          <div>

            <p className="text-base text-gray-600">
              {ride?.pickup}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 mb-6">
          <i className="text-lg ri-map-pin-3-fill text-gray-700 mt-1"></i>
          <div>

            <p className="text-base text-gray-600">
              {ride?.destination}
            </p>
          </div>
        </div>

        {/* Fare Info */}
        <div className="flex items-start gap-3 mb-8">
          <i className="ri-cash-line text-green-500 text-xl mt-1"></i>
          <div>
            <h3 className="text-base font-medium">₹{ride?.fare}</h3>
            <p className="text-sm text-gray-600">Cash</p>
          </div>
        </div>

        {/* Pay Button */}
        <button className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white py-3 rounded-lg text-lg font-semibold shadow">
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
