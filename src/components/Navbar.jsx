import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FaBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const navii = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navii.current.classList.add("change-color");
      } else {
        navii.current.classList.remove("change-color");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // ✅ cleanup so event listener is removed when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav
      ref={navii}
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-500 bg-transparent"
    >
      <div className="w-full flex items-center justify-between h-16 px-6">
        {/* Left side */}
        <div className="flex items-center gap-6 change2-padding text-[14px]">
          <img src="/Netflix1-logo.png" alt="Netflix Logo" className="h-20" />
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">TV Shows</a>
          <a href="#" className="hover:text-gray-300">Movies</a>
          <a href="#" className="hover:text-gray-300">New & Popular</a>
          <a href="#" className="hover:text-gray-300">My List</a>
          <a href="#" className="hover:text-gray-300">Browse by Languages</a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6 mr-6 change-padding">
          <a href="#">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="hover:text-gray-300" />
          </a>
          <a href="#">
            <FaBell className="hover:text-gray-300" />
          </a>
          <div className="flex items-center gap-2 relative group cursor-pointer">
            <img src="/Netflix-avatar.png" alt="avatar" className="h-8 rounded" />
            <IoMdArrowDropdown className="text-xl" />

            {/* Dropdown menu */}
            <div className="absolute top-full right-0 mt-2 h-15 w-30 bg-black/70 text-white p-4 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <p
                onClick={handleLogout}
                className="cursor-pointer hover:underline"
              >
                Sign out of Netflix
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
