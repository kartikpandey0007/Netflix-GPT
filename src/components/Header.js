import React from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const showGptSearch = useSelector(store => store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  useEffect(() => {
    //whenever page loads  onAuthStateChanged() called for authentication and updating store
    //called one time
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, diplayName } = user;
        dispatch(addUser({ uid: uid, email: email, diplayName: diplayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = ()=>{
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {//trigger event(e) track that 
   dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2 justify-between">
          
        {showGptSearch && 
          <select className="p-2 m-2 bg-gray-900 text-white cursor-pointer" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang => <option key = {lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>}

          <button 
          onClick={handleGptSearchClick}
          className="py-2 px-4 mx-2 my-2 bg-gray-500 text-black font-bold rounded-lg bg-opacity-60">{showGptSearch? "Home" : "AI Search"}</button>
          <img
            className="w-12 h-12 rounded-lg"
            alt="usericon"
            src="https://occ-0-3752-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
          />
          <button onClick={handleSignOut} className="font-bold text-white ml-2 hover:underline">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
