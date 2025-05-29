const WaitForDriver = (props) => {
    return (
        <div>
            <h3 onClick={() => { }} className="flex justify-center mb-5 mr-2">
                <i className="text-3xl text-gray-500 ri-arrow-down-wide-fill"></i>
            </h3>
            <div className="flex items-center justify-between mt-5">
                <img
                    className="h-30 "
                    src={
                        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png"
                    }
                    alt={"Uber Go"}
                />
                <div className="text-right px-2 flex flex-col justify-between space-y-1">
                    <h2 className="text-xl font-semibold capitalize">
                        {props.ride?.captain.fullname.firstname} {props.ride?.captain.fullname.lastname}
                    </h2>
                    <h4 className="text-base font-semibold text-gray-800">
                        {props.ride?.captain.vehicle.numberPlate}
                    </h4>
                    <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
                    <h1 className="text-base font-semibold text-gray-700">
                        OTP: {props.ride?.otp}
                    </h1>
                </div>

            </div>

            <div className="flex items-center gap-5 mt-10">
                <h2>
                    <i className="text-lg  ri-map-pin-3-fill"></i>
                </h2>
                <div>

                    <p className="text-lg -mt-1 text-gray-600">
                        {props.ride?.pickup}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-5 mt-10">
                <h2>
                    <i className="text-lg  ri-map-pin-3-fill"></i>
                </h2>
                <div>

                    <p className="text-lg -mt-1 text-gray-600">
                        {props.ride?.destination}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-5 mt-10 mb-10">
                <h2>
                    <i className="text-lg ri-cash-line text-green-400"></i>
                </h2>
                <div>
                    <h3 className="text-lg font-medium">{props.ride?.fare}</h3>
                    <p className="text-sm -mt-1 text-gray-600">
                        Cash
                    </p>
                </div>
            </div>

        </div>
    );
}


export default WaitForDriver;