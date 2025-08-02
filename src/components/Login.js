import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInFrom, setisSignInFrom] = useState(true);

  const toggleSignInForm = ()=>{
    setisSignInFrom(!isSignInFrom)
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg"
          alt="BackImg"
        />
      </div>
      <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg">
      <h1 className="font-bold text-3xl py-4">{isSignInFrom ? "Sign In" : "Sign Up"}</h1>
      {!isSignInFrom &&  <input type="text" placeholder="Full Name" className="p-2 my-2 w-full h-12 bg-gray-700  rounded-lg" /> }
        <input type="text" placeholder="Email or Phone Number" className="p-2 my-2 w-full h-12 bg-gray-700  rounded-lg" />
        <input type="text" placeholder="Password" className="p-2 my-2 w-full h-12 bg-gray-700  rounded-lg" />
        <button className="p-1 my-4 bg-red-700 w-full h-10 rounded-lg">{isSignInFrom ? "Sign In" : "Sign Up"}</button>
        <p className="py-4 hover:underline cursor-pointer font-bold" onClick={toggleSignInForm}>{isSignInFrom ? "New to Netflix? Sign Up" : "Go to Sign In"}</p>
      </form>
    </div>
  );
};

export default Login;
