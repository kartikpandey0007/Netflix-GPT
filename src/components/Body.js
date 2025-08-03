import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { createBrowserRouter, RouterProvider} from "react-router-dom";


const Body = () => {
  const dipatch = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    //called one time
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, diplayName } = user;
        dipatch(addUser({ uid: uid, email: email, diplayName: diplayName }));
      } else {
        // User is signed out
        dipatch(removeUser());
      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
