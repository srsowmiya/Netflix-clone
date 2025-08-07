import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";



const Navbar = () => {
  return (
    <div className="mx-3 my-2 flex flex-row items-center justify-between h-15 bg-black text-white font-bold">
  {/* Left items */}
  <div className="flex flex-row items-center gap-5">
    <img src="/netflix-logo.jpg" alt="" className="h-11" />
    <a href="">Home</a>
    <a href="">Tv Series</a>
    <a href="">Movies</a>
    <a href="">New & Popular</a>
    <a href="">My List</a>
    <a href="">Browse By Languages</a>
  </div>

  {/* Right items */}
  <div className="flex flex-row items-center gap-5">
    <a href=""><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
    <a href="">Children</a>
    <a href=""><FaBell /></a>
    <a href=""><FaUser /></a>
  </div>
</div>

  )
}

export default Navbar
