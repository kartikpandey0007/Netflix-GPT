import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const dispatch = useDispatch();


  const handleButtonClick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const { uid, email, displayName } = userCredential.user;
          dispatch(addUser({ uid, email, displayName }));
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BG_URL}
          alt="BackImg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-2 w-full h-12 bg-gray-700 rounded-lg"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email or Phone Number"
          className="p-2 my-2 w-full h-12 bg-gray-700 rounded-lg"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full h-12 bg-gray-700 rounded-lg"
        />

        <p className="text-red-700">{errorMessage}</p>

        <button
          className="p-1 my-4 bg-red-700 w-full h-10 rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="py-4 hover:underline cursor-pointer font-bold"
          onClick={toggleSignInForm}
        >
          {isSignInForm ? "New to Netflix? Sign Up" : "Go to Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
