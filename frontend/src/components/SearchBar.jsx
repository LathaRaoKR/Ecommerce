import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch}=useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(showSearch);
    const [animate, setAnimate] = useState("");
      useEffect(() => {
        if (location.pathname.includes("collection")) {
          // Show the search bar and apply the scale-up animation if it includes 'collection' page

          setVisible(true);
          setAnimate("animate-scale-up-center");
        } else {
          // Hide the search bar if doesn`t includes 'collection' page
          setVisible(false);
        }
      }, [location, showSearch]);
       const handleClose = () => {
         setAnimate("animate-scale-down-center");
         setTimeout(() => setShowSearch(false), 400); // Hide the search bar after a delay to match the duration of the scale-down animation
       };
  return showSearch && visible ? (
    <div className={`border-t border-b bg-gray-50 text-center ${animate} `}>
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2  ">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        ></input>
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
      <img
        onClick={handleClose}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt=""
      />{" "}
    </div>
  ) : null;
};

export default SearchBar
