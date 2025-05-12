const VehiclePanel = (props) => {
  const vehicleOptions = [
    {
      id: "uber-go",
      type: "car", // <-- match with backend key
      title: "Uber Go",
      seats: 4,
      time: "2 mins away",
      description: "Affordable, compact rides",
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png",
    },
    {
      id: "uber-moto",
      type: "moto",
      title: "Uber Moto",
      seats: 1,
      time: "10 mins away",
      description: "Affordable motorcycle rides",
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png",
    },
    {
      id: "uber-auto",
      type: "auto",
      title: "Uber Auto",
      seats: 3,
      time: "2 mins away",
      description: "Affordable auto rides",
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
    },
  ];

  return (
    <>
      <h3
        onClick={() => {
          props.setVehiclePanelOpen(false);
        }}
        className="flex justify-center mb-5 mr-2"
      >
        <i className="text-3xl text-gray-500 ri-arrow-down-wide-fill"></i>
      </h3>

      {vehicleOptions.map((option) => (
        <div
          key={option.id}
          onClick={() => {
            console.log("Selected option:", option.type);
            props.setSelectedOption(option.id);
            props.setVehiclePanelOpen(false);
            props.setPanelOpen(false);
            props.setConfirmedRideOpen(true);
            props.setVehicleType({ type: option.type, image: option.image });

          }}
          
          className={`border-2 rounded-2xl flex items-center justify-between p-3 mb-4 cursor-pointer ${
            props.selectedOption === option.id
              ? "border-black"
              : "border-gray-300"
          }`}
        >
          <img
            className="h-12 w-12 object-contain"
            src={option.image}
            alt={option.title}
          />
          <div className="ml-3 flex-1">
            <h4 className="flex items-center gap-2 font-medium text-base">
              {option.title}
              <span className="flex items-center gap-1 text-gray-600 text-sm">
                <i className="ri-group-line"></i>
                {option.seats}
              </span>
            </h4>
            <h5 className="text-sm text-gray-600">{option.time}</h5>
            <p className="text-sm text-gray-500">{option.description}</p>
          </div>
          <h2 className="text-lg font-semibold whitespace-nowrap">
            ₹{props.fare?.[option.type] ?? "N/A"}
          </h2>
        </div>
      ))}
    </>
  );
};

export default VehiclePanel;
