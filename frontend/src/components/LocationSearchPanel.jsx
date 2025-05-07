import { useState } from "react";

const LocationSearchPanel = (props) => {

  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    "742 Evergreen Terrace, Springfield, IL 62704, United States",
    "742 Evergreen Terrace, Springfield, IL 62704, United States",
    "742 Evergreen Terrace, Springfield, IL 62704, United States",
    "742 Evergreen Terrace, Springfield, IL 62704, United States",
    "742 Evergreen Terrace, Springfield, IL 62704, United States",
    "742 Evergreen Terrace, Springfield, IL 62704, United States",
    "742 Evergreen Terrace, Springfield, IL 62704, United States",
    "742 Evergreen Terrace, Springfield, IL 62704, United States",
  ];

  return (
    <div>
      {locations.map((location, index) => (
        <div
          key={index}
          onClick={() => {setSelectedLocation(index)
            props.setVehiclePanel(true);
            props.setLocaltionSearchPanel(false);
          }}
          className={`flex items-center justify-start gap-4 my-5 mx-4 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
            selectedLocation === index ? "border-black" : "border-gray-100"
          }`}
        >
          <h2 className="bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center">
            <i className="ri-map-pin-line"></i>
          </h2>
          <h4 className="font-base text-sm">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
