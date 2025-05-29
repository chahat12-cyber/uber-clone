import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import CaptainLogin from "./pages/captainLogin";
import CaptainSignUp from "./pages/CaptainSignUp";
import Intro from "./pages/Intro";
import UserProtectedWrapper from "./wrapper/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainProtectedWrapper from "./wrapper/CaptainProtectedWrapper";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route
          path="/riding"
          element={
          <Riding />
          }/>
        
        <Route
          path="/captain-riding"
          element={
          <CaptainRiding />
          }/>
        
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route path="/captain-home" element= {
          <CaptainProtectedWrapper>
              <CaptainHome/>
          </CaptainProtectedWrapper>
        }/>
      <Route path= "user-logout" element= {
     
         <UserLogout/>
        
      }/>
      <Route path= 'captain-logout' element= {
        <CaptainProtectedWrapper>
            <CaptainLogout/>
        </CaptainProtectedWrapper>
      }/>



      </Routes>
    </div>
  );
};

export default App;
