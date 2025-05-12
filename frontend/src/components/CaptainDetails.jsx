import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);


  return (
    <div className="h-1/2 bg-black rounded-t-3xl shadow-lg p-4 mt-30">
      {/* Driver and Vehicle Info */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          {/* Driver Image */}
          <img
            className="w-16 h-16 rounded-full border-2 border-gray-300"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4UlS1Ehv87B7_HRdQWlKz8Jw13A0zxuiuQ&s"
            alt="driver"
          />
          {/* Driver Info */}
          <div className="ml-4 flex-1 flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold text-white capitalize">{captain.fullname.firstname} {captain.fullname.lastname}</h4>

              <p className="text-sm text-white">Captain</p>
            </div>
            <div className="text-right">
              <h4 className="text-xl font-bold text-white">₹295.7</h4>
              <p className="text-sm text-white">Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex justify-between px-2">
        <div className="text-center">
          <i className="text-2xl ri-time-line text-white"></i>
          <h5 className="text-lg font-medium text-white">10.2</h5>
          <p className="text-sm text-white">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl ri-speed-up-line text-white"></i>
          <h5 className="text-lg font-medium text-white">36 km/h</h5>
          <p className="text-sm text-white">Avg Speed</p>
        </div>
        <div className="text-center">
          <i className="text-2xl ri-booklet-line text-white"></i>
          <h5 className="text-lg font-medium text-white">22</h5>
          <p className="text-sm text-white">Trips</p>
        </div>
      </div>
    </div>
  )
}


export default CaptainDetails;