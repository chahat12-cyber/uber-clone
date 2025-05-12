import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";
import axios from "axios";
import {SocketContext} from "../context/SocketContext"
import {UserDataContext} from "../context/userContext"

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])

  const [activeField, setActiveField] = useState("pickup"); // 'pickup' or 'destination'
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const debounceTimeout = useRef(null);
  const waitingForDrivereRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("uber-go");
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmedRidePanelOpen, setConfirmedRideOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [WaitingForDriver, setWaitingForDriver] = useState(false);
  const [fare, setFare] = useState({});

  const [vehicleType, setVehicleType] = useState(null);
  const {socket} = useContext(SocketContext);
   const { user } = useContext(UserDataContext);

  useEffect(() => {
    if(!user) return;
   socket.emit("join", { userType: "user" , userId: user._id});
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
  };



  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }

      })
      setPickupSuggestions(response.data)
    } catch {
      // handle error
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch {
      // handle error
    }
  }

  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
    }
    setSuggestions([]); // Clear suggestions
    setPanelOpen(false); // Close the panel
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
    if (!confirmedRideRef.current) return;

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

  useGSAP(() => {
    if (!vehicleFoundRef.current) return;

    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [vehicleFound]);


  useGSAP(() => {
    if (!waitingForDrivereRef.current) return;

    if (vehicleFound) {
      gsap.to(waitingForDrivereRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(waitingForDrivereRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [WaitingForDriver]);

  async function findTrip() {
    setVehiclePanelOpen(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    console.log("Fare response:", response.data);
    setFare(response.data)


  }

  async function createRide() {
    console.log("Creating ride with vehicle type:", vehicleType);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create-ride`, {
      pickup,
      destination,
      vehicleType: vehicleType.type // ✅ Send only the type string to the backend
    }
      , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

    console.log("Ride created:", response.data);


  }

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

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="p-6 h-[30%] bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form>
            <div className="line absolute h-16 w-1 bg-[#424040] top-[45%] left-10 rounded-full "></div>
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
              type="text"
              placeholder='Add a pick-up location'
            />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
              type="text"
              placeholder='Enter your destination' />
          </form>
          <button
            onClick={() => {
              findTrip()
            }}
            className="bg-[#000] text-white w-full py-3 rounded-lg mt-4">
            Find Trip
          </button>
        </div>
        <div
          ref={panelRef}
          className="bg-white overflow-hidden transition-all duration-300"
        >
          {panelOpen && (
            <LocationSearchPanel
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          )}
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 translate-y-full px-4 py-6 bg-white w-full"
      >
        <VehiclePanel
          fare={fare}
          setPanelOpen={setPanelOpen}
          setConfirmedRideOpen={setConfirmedRideOpen}
          setVehicleType={setVehicleType}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setVehiclePanelOpen={setVehiclePanelOpen}

        />
      </div>

      <div
        ref={confirmedRideRef}
        className="fixed z-10 bottom-0 translate-y-full px-4 py-6 bg-white w-full"
      >
        <ConfirmedRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType= {vehicleType?.type || null }
          image={vehicleType?.image
            || null} // fallback to null
          setVehicleFound={setVehicleFound}
          setConfirmRide={setConfirmedRideOpen}
          createRide={createRide}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed z-10 bottom-0 translate-y-full px-4 py-6 bg-white w-full"
      >
        <LookingForDriver 
        setVehicleFound={setVehicleFound} 
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType= {vehicleType?.type || null }
        image={vehicleType?.image
          || null} // fallback to null
        setConfirmRide={setConfirmedRideOpen}
        createRide={createRide}
        
        />
      </div>
      <div
        ref={waitingForDrivereRef}
        className="fixed z-10 bottom-0 translate-y-full  px-4 py-6 bg-white w-full"
      >
        <WaitForDriver waitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};
export default Home;
