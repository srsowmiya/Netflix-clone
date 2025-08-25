import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FaBell, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav
      className=" fixed top-0 left-0  w-full z-50 transition-colors duration-300 bg-transparent"
    >
      <div className=" w-full flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
          <img src="/Netflix1-logo.png" alt="Netflix Logo" className="h-14" />
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">TV shows</a>
          <a href="#" className="hover:text-gray-300">Movies</a>
          <a href="#" className="hover:text-gray-300">New & Popular</a>
          <a href="#" className="hover:text-gray-300">My List</a>
          <a href="#" className="hover:text-gray-300">Browse by Languages</a>
        </div>
        <div className="flex items-center gap-6 mr-20">
          <a href="#"><FontAwesomeIcon icon={faMagnifyingGlass} className="hover:text-gray-300" /></a>
          <a href="#"><FaBell className="hover:text-gray-300" /></a>
          <a href="#"><FaUser className="hover:text-gray-300" /></a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
