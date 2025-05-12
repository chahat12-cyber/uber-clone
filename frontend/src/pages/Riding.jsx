import { Link } from "react-router-dom";

const Riding = () => {
    
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
          <img
            className="h-full w-full object-cover"
            alt="uber-map-logo"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          />
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
              <h2 className="text-lg font-medium">Chahat</h2>
              <h4 className="text-xl font-semibold">MH31 AB 1234</h4>
              <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
            </div>
          </div>
  
          {/* Pickup Address */}
          <div className="flex items-start gap-3 mb-6">
            <i className="text-xl ri-map-pin-3-fill text-gray-700 mt-1"></i>
            <div>
              <h3 className="text-base font-medium">567/11-A</h3>
              <p className="text-sm text-gray-600">
                Oberoi Palace, Villey Parle, Mumbai - 440012
              </p>
            </div>
          </div>
  
          {/* Fare Info */}
          <div className="flex items-start gap-3 mb-8">
            <i className="ri-cash-line text-green-500 text-xl mt-1"></i>
            <div>
              <h3 className="text-base font-medium">₹193.45</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
  
          {/* Pay Button */}
          <button className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white py-3 rounded-lg text-lg font-semibold shadow">
            Pay Me
          </button>
        </div>
      </div>
    );
  };
  
  export default Riding;
  