import { Link } from "react-router-dom"
import CaptainDetails from "../components/CaptainDetails"
import RidePopUp from "../components/RidePopUp"
import { useContext, useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp"
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext"
const CaptainHome = () => {
    const ridePopURef = useRef(null);
    const confirmRidePopURef = useRef(null);
    const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        // return () => clearInterval(locationInterval)
    }, [])

    socket.on('new-ride',(data) => {
        console.log("New ride request received", data);
       
    })

    useGSAP(() => {
        if (ridePopUpPanel) {
            gsap.to(ridePopURef.current, {
                y: 0,          // brings it back into view
                height: "70%",
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
            });
        } else {
            gsap.to(ridePopURef.current, {
                y: "100%",     // pushes it down
                height: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
            });
        }
    }, [ridePopUpPanel]);

    useGSAP(() => {
        if (confirmRidePopUpPanel) {
            gsap.to(confirmRidePopURef.current, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
            });
        } else {
            gsap.to(confirmRidePopURef.current, {
                y: "100%",
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
            });
        }
    }, [confirmRidePopUpPanel]);


    return (
        <div className="h-screen w-full flex flex-col bg-gray-50">
            {/* Map with Home Icon Overlay */}
            <div className="relative h-1/2 w-full">
                {/* Overlay content on top of the image */}
                <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-4 z-10">
                    <img
                        className="w-16"
                        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                        alt="Uber logo"
                    />
                    <Link
                        to="/home"
                        className="bg-white p-2 rounded-full shadow"
                    >
                        <i className="ri-logout-box-line text-2xl text-gray-800"></i>
                    </Link>
                </div>

                {/* Map Image */}
                <img
                    className="h-[135%] w-full object-cover"
                    alt="uber-map-logo"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                />
            </div>

            {/* Info Panel */}
            <CaptainDetails />
            <div
                ref={ridePopURef}
                className="fixed z-10 bottom-0 px-4 py-6 bg-white w-full" >
                <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
            </div>
            <div
                ref={confirmRidePopURef}
                className="fixed z-10 inset-0 bg-white flex flex-col" >
                <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
            </div>


        </div>
    )
}

export default CaptainHome
