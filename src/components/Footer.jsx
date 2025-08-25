import React from 'react'
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { CgFacebook } from "react-icons/cg";

const Footer = () => {
  return (
    <div className="bg-black text-gray-400 px-12 py-10 alignfooter">
      <div className="max-w-6xl mx-auto">
        {/* Social Icons */}
        <div className="flex gap-6 mb-6 text-2xl">
          <CgFacebook className="cursor-pointer hover:text-white" />
          <FaInstagram className="cursor-pointer hover:text-white" />
          <FaTwitter className="cursor-pointer hover:text-white" />
          <FaYoutube className="cursor-pointer hover:text-white" />
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8 text-sm">
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

        {/* Bottom text */}
        <p className="text-xs text-gray-500">
          © 1997-2025 Netflix, Inc.
        </p>
      </div>
    </div>
  )
}

export default Footer
