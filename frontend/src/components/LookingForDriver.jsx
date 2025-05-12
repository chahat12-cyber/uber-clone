const LookingForDriver = (props) => {
  return (
    <div>
      <h3 onClick={() => {
        props.setVehicleFound(false);

      }} 
      className="flex justify-center mb-5 mr-2">
      <i className="text-3xl text-gray-500 ri-arrow-down-wide-fill"></i>
    </h3>

    <h3 className="text-2xl text-gray-600 text-center">Looking For Driver</h3>
    <div className={" p-3 mb-4 flex justify-center"}>
      <img
        className="h-50 w-100 object-contain"
        src={
          props.image
            ? props.image
            : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png"
        }
        alt="Vehicle"
      />

    </div>
    <div className="flex items-center gap-5">
      <h2>
        <i className="text-lg  ri-map-pin-3-fill"></i>
      </h2>
      <div>
       
        <p className="text-sm -mt-1 text-gray-600">
        {props.pickup}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-5 mt-10">
      <h2>
        <i className="text-lg  ri-map-pin-3-fill"></i>
      </h2>
      <div>
       
        <p className="text-sm -mt-1 text-gray-600">
          {props.destination}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3 mt-10 mb-10">
      <h2>
        <i className="ri-cash-line text-green-400"></i>
      </h2>
      <div>
        <h3 className="text-base font-medium">{props.fare[props.vehicleType]}</h3>
        <p className="text-sm -mt-1 text-gray-600">
          Cash
        </p>
      </div>
    </div>
    <button
      onClick={() => {
        console.log("Confirm button clicked", props);
        props.createRide();
        props.setConfirmRide(false)
        props.setVehicleFound(true);
      }}
      className="w-full bg-green-500 text-white py-2 rounded-md">
      Confirm
    </button>
  </div>
  )
}



export default LookingForDriver;