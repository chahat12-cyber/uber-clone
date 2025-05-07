import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedRideRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("uber-go");
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmedRidePanelOpen, setConfirmedRideOpen] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmedRidePanelOpen) {
      gsap.to(confirmedRideRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(confirmedRideRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [confirmedRidePanelOpen]);



  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 fixed left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber logo"
      />
      <div className="h-screen w-screen">
        <img
          className="h-screen"
          alt="uber-map-logo"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        ></img>
      </div>

      <div className="flex flex-col justify-end h-screen  absolute top-0 w-full">
        <div className="p-6 h-[30%] bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0  right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 bg-[#424040] top-[45%] left-10 rounded-full "></div>
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add A Pickup Location"
            />
            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true);
              }}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter Your Destination"
            />
          </form>
        </div>
        <div
          ref={panelRef}
          className="bg-white overflow-hidden transition-all duration-300"
        >
          {panelOpen && (
            <LocationSearchPanel
              setLocaltionSearchPanel={setPanelOpen}
              setVehiclePanel={setVehiclePanelOpen}
            />
          )}
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 translate-y-full px-4 py-6 bg-white w-full"
      >
        <VehiclePanel
          setPanelOpen= {setPanelOpen}
          setConfirmedRideOpen={setConfirmedRideOpen}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>

      <div
        ref={confirmedRideRef}
        className="fixed z-10 bottom-0 translate-y-full px-4 py-6 bg-white w-full"
      >
         <ConfirmedRide />
      </div>
    </div>
  );
};
export default Home;
