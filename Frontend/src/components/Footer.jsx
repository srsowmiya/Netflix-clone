import React from 'react'
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { CgFacebook } from "react-icons/cg";

const Footer = () => {
  return (
    <div className="bg-black text-gray-400 px-15 py-10 alignfooter">
      <div className="max-w-4xl mx-auto">
  
        <div className="flex gap-6 mb-6 text-2xl iconResize text-white">
          <CgFacebook className="cursor-pointer hover:text-white" />
          <FaInstagram className="cursor-pointer hover:text-white" />
          <FaTwitter className="cursor-pointer hover:text-white" />
          <FaYoutube className="cursor-pointer hover:text-white" />
        </div>


       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-[0.2px] mb-8 text-xs">
          <p className="cursor-pointer hover:underline">Audio Description</p>
          <p className="cursor-pointer hover:underline">Help Centre</p>
          <p className="cursor-pointer hover:underline">Gift Cards</p>
          <p className="cursor-pointer hover:underline">Media Centre</p>

          <p className="cursor-pointer hover:underline">Investor Relations</p>
          <p className="cursor-pointer hover:underline">Jobs</p>
          <p className="cursor-pointer hover:underline">Terms of Use</p>
          <p className="cursor-pointer hover:underline">Privacy</p>

          <p className="cursor-pointer hover:underline">Legal Notices</p>
          <p className="cursor-pointer hover:underline">Cookie Preferences</p>
          <p className="cursor-pointer hover:underline">Corporate Information</p>
          <p className="cursor-pointer hover:underline">Contact Us</p>
        </div>


        <p className="text-xs bottomT">
          © 1997-2025 Netflix, Inc.
        </p>
      </div>
    </div>
  )
}

export default Footer
