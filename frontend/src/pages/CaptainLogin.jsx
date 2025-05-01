import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setpasword] = useState("");
  const [captainData, setCaptainData] = useState({});
  const submitjHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password,
    });
    setEmail("");
    setpasword("");
  };
  return (
    <div className="p-7 h-screen flex-col flex justify-between ">
      <div>
        <img
          className="w-16 mb-2"
          src="https://play-lh.googleusercontent.com/u4PW84G_8dSNVtBadRA3JsmBRxFjO6UNeHtdOnV1k6bFXl8qmbeXIXE2Je8on-D6Vg=w480-h960"
        />

        <form
          onSubmit={(e) => {
            submitjHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2 ">What's Your Email</h3>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            placeholder="email@example.com"
          ></input>

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => {
              setpasword(e.target.value);
            }}
            required
            placeholder="password"
          ></input>
          <Link to='/captain-login' className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </Link>
        </form>
        <p className="text-center mt-10">
          {" "}
          New here ?{" "}
          <Link to="/captain-signup" className=" mb-3 text-blue-600 ">
          Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link 
        to='/user-login'
        className="bg-[#d5622d] flex items-center justify-center  text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
          Sign In As User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
