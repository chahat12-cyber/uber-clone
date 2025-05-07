const ConfirmedRide = (props) => {
  return (
    <div>
      <h3 onClick={() => {}} className="flex justify-center mb-5 mr-2">
        <i className="text-3xl text-gray-500 ri-arrow-down-wide-fill"></i>
      </h3>

      <h3 className="text-2xl text-gray-600 text-center">Confirm Ride</h3>
      <div onClick={() => {}} className={" p-3 mb-4 flex justify-center"}>
        <img
          className="h-50 w-100 object-contain "
          src={
            "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png"
          }
          alt={"Uber Go"}
        />
      </div>
      <div className="flex items-center gap-5">
        <h2>
          <i className="text-lg  ri-map-pin-3-fill"></i>
        </h2>
        <div>
          <h3 className="text-lg font-medium"> 567/11-A</h3>
          <p className="text-sm -mt-1 text-gray-600">
            Oberoi Palace , Villey Parle, Mumbai-440012
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5 mt-10">
        <h2>
          <i className="text-lg  ri-map-pin-3-fill"></i>
        </h2>
        <div>
          <h3 className="text-lg font-medium"> 567/11-A</h3>
          <p className="text-sm -mt-1 text-gray-600">
            Oberoi Palace , Villey Parle, Mumbai-440012
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5 mt-10 mb-20">
        <h2>
        <i className="ri-cash-line text-green-400"></i>
        </h2>
        <div>
          <h3 className="text-lg font-medium"> 567/11-A</h3>
          <p className="text-sm -mt-1 text-gray-600">
            Oberoi Palace , Villey Parle, Mumbai-440012
          </p>
        </div>
      </div>
      <button className="w-full bg-black text-white rounded-lg h-10 font-semibold ">
        Confirm
      </button>
    </div>
  );
};

export default ConfirmedRide;
