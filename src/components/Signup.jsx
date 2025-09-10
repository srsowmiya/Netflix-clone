import React from 'react'
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className="flex bg-[url('/loginbg2.jpg')] bg-gradient-to-t from-black/60 via-black/30 to-transparent bg-cover bg-center min-h-screen items-center justify-center">
        <div className="flex flex-col h-100 w-90 bg-black/75 rounded">
          
          {/* Title */}
          <h1 className="h-14 w-70 flex justify-center items-center text-2xl font-medium text-center py-6 px-6 font-sans text-white">
            Sign Up
          </h1>

          {/* Form */}
          <form className="px-10 flex flex-col justify-center items-center gap-5 font-sans text-white">
            
            {/* Name */}
            <div className="flex items-center h-10 w-70 bg-zinc-800 rounded px-3">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="bg-transparent outline-none focus:ring-0 w-full text-center"
              />
            </div>

            {/* Email */}
            <div className="flex items-center h-10 w-70 bg-zinc-800 rounded px-3">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-transparent outline-none focus:ring-0 w-full text-center"
              />
            </div>

            {/* Password */}
            <div className="flex items-center h-10 w-70 bg-zinc-800 rounded px-3">
              <input 
                type="password" 
                placeholder="Password" 
                className="bg-transparent outline-none focus:ring-0 w-full text-center"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between w-70 text-sm">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4" />
                <label htmlFor="remember">Remember me</label>
              </div>
            </div>

            {/* Signup Button */}
            <div className="border-red-500 bg-red-500 h-10 w-70 rounded flex justify-center items-center">
              <button className="border-red-500 bg-red-500 flex justify-center items-center rounded w-full h-full">
                Sign Up
              </button>
            </div>

            {/* Already have account */}
            <div className="h-6 w-70 flex justify-center mt-2 text-sm">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-red-500 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
