import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [ otp, setOtp ] = useState('')
  const navigate = useNavigate()

  const submitHander = async (e) => {
      e.preventDefault()

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
          params: {
              rideId: props.ride._id,
              otp: otp
          },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      if (response.status === 200) {
          props.setConfirmRidePopUpPanel(false);
          navigate('/captain-riding', { state: { ride: props.ride } })
      }


  }
  return (
    <div className="h-full flex flex-col justify-between">
      {/* Top Section (Content) */}
      <div className="overflow-y-auto px-2 pb-4">
        <h3
          onClick={() => {
            props.setConfirmRidePopUpPanel(false);
          }}
          className="flex justify-center mb-3"
        >
          <i className="text-2xl text-gray-500 ri-arrow-down-wide-fill"></i>
        </h3>

        <h3 className="text-xl text-gray-700 font-semibold mb-4">Confirm This Ride To Start</h3>

        <div className="flex items-center justify-between gap-4 p-3 mb-3 bg-yellow-200 rounded-md">
          <div className="flex items-center gap-3">
            <img
              className="h-10 w-10 object-cover rounded-full shadow"
              src="https://miro.medium.com/v2/resize:fit:1400/1*y_uyQN1xEjppGVWJJkibMQ.jpeg"
              alt="user-img"
            />
            <h2 className="text-sm font-medium">{props.ride?.user.firstName} {props.ride?.user.lastName}</h2>
          </div>
          <h5 className="text-sm font-semibold">2.2 KM</h5>
        </div>



        <div className="items-start mt-8 space-y-10">
          {/* Pickup Address */}
          <div className="flex items-start gap-3">
            <i className="text-lg ri-map-pin-3-fill"></i>
            <div>

              <p className="text-xs text-gray-600 -mt-1">{props.ride?.pickup}</p>
            </div>
          </div>

          {/* Drop Address */}
          <div className="flex items-start gap-3">
            <i className="text-lg ri-map-pin-3-fill"></i>
            <div>

              <p className="text-xs text-gray-600 -mt-1">{props.ride?.destination}</p>
            </div>
          </div>

          {/* Fare Info */}
          <div className="flex items-start gap-3">
            <i className="text-lg ri-cash-line text-green-500"></i>
            <div>
              <h3 className="text-sm font-medium">{props.ride?.fare}</h3>
              <p className="text-xs text-gray-600 -mt-1">Cash</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Buttons */}
      <div className="mt-6 w-full">

      <form onSubmit={submitHander}>
        <input
          id="otpInput"
          type="text"
          onChange={(e) => {
            // Handle OTP input change if needed
            setOtp(e.target.value);

          }}
          className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3 ml-3 mr-3 "
          placeholder="Enter OTP"
          required
        />

       <div className="flex items-center justify-between gap-3 ml-3 mr-3 mb-10">
       <button
          type="submit"
          className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
        >
          Confirm
        </button>

        <button
          type="button"
          onClick={() => {
            props.setConfirmRidePopUpPanel(false);
            props.setRidePopupPanel(false);
          }}
          className="w-full mt-5 text-lg flex justify-center bg-red-600 text-white font-semibold p-3 rounded-lg"
          >
          Cancel
        </button>
       </div>
      </form>
    </div>
    </div>
  );
}


export default ConfirmRidePopUp;






