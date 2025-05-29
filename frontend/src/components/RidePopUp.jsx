const RidePopUp = (props) => {
  return (
    <div className="h-full flex flex-col justify-between">
      {/* Top Section (Content) */}
      <div className="overflow-y-auto px-2 pb-4">
        <h3
          onClick={() => {
            props.setRidePopUpPanel(false);
          }}
          className="flex justify-center mb-3"
        >
          <i className="text-2xl text-gray-500 ri-arrow-down-wide-fill"></i>
        </h3>

        <h3 className="text-xl text-gray-700 font-semibold mb-4">New ride available!</h3>

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
          <div className="flex items-center gap-3">
            <i className="text-lg ri-map-pin-3-fill"></i>
            <div>

              <p className="text-lg text-gray-600 -mt-1 capitalize">{props.ride?.pickup}</p>
            </div>
          </div>

          {/* Drop Address */}
          <div className="flex items-center gap-3">
            <i className="text-lg ri-map-pin-3-fill"></i>
            <div>
              <p className="text-lg text-gray-600 -mt-1 capitalize">{props.ride?.destination}</p>
            </div>
          </div>

          {/* Fare Info */}
          <div className="flex items-start gap-3">
            <i className="text-lg ri-cash-line text-green-500"></i>
            <div>
              <h3 className="text-lg text-gray-600 -mt-1 capitalize">₹{props.ride?.fare}</h3>
              <p className="text-xs text-gray-600 -mt-1">Cash</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between items-center gap-3 px-2">
        <button
          onClick={() => props.setRidePopUpPanel(false)}
          className="w-full bg-gray-300 text-white py-2 rounded-md text-sm"
        >
          Ignore
        </button>
        <button
          onClick={() => {
            props.setConfirmRidePopUpPanel(true);
            props.confirmRide();
          }}
          className="w-full bg-green-500 text-white py-2 rounded-md text-sm"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
