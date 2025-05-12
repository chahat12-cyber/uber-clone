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
                <div className="text-right">
                    <h2 className="text-lg font-medium">Chahat </h2>
                    <h4 className="text-xl font-semibold -mt-1 -mb-1">MH31 AB 1234</h4>
                    <p className="text-sm text-gray-600 ">Maruti Suzuki Alto</p>
                </div>
            </div>

            <div className="flex items-center gap-5">
                <h2>
                    <i className="text-lg  ri-map-pin-3-fill"></i>
                </h2>
                <div>
                    <h3 className="text-base font-medium"> 567/11-A</h3>
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
                    <h3 className="text-base font-medium"> 567/11-A</h3>
                    <p className="text-sm -mt-1 text-gray-600">
                        Oberoi Palace , Villey Parle, Mumbai-440012
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3 mt-10 mb-10">
                <h2>
                    <i className="ri-cash-line text-green-400"></i>
                </h2>
                <div>
                    <h3 className="text-base font-medium">193.45</h3>
                    <p className="text-sm -mt-1 text-gray-600">
                        Cash
                    </p>
                </div>
            </div>

        </div>
    );
}


export default WaitForDriver;