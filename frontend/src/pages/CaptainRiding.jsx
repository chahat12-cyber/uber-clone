import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";
import { useRef, useState } from "react";
const CaptainRiding = () => {
     const [finishRidePanel, setFinishRidePanel] = useState(false);
const finishRidePanelRef = useRef(null);

useGSAP(() => {
    if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
        });
    } else {
       gsap.to(finishRidePanelRef.current, {
            y: "100%",
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
        });
    }
}, [finishRidePanel]);


    
    return (
        <div className='h-screen relative flex flex-col justify-end'>

            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <img
                    className="h-[135%] w-full object-cover"
                    alt="uber-map-logo"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                />

            <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'
                onClick={() => {
                    setFinishRidePanel(!finishRidePanel);
                }}
            >
                <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {

                }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
                <h4 className='text-xl font-semibold'>{'4 KM away'}</h4>
                <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>
           
            <div
                ref={finishRidePanelRef}
                className="fixed z-10 bottom-0 px-4 py-6 bg-white w-full" >
                <FinishRide  setFinishRidePanel= {setFinishRidePanel}/>
            </div>

        </div>
    )
};

export default CaptainRiding;
