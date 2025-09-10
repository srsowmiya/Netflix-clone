import React from 'react'
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="flex bg-[url('/loginbg2.jpg')] bg-gradient-to-t from-black/60 via-black/30 to-transparent bg-cover bg-center min-h-screen items-center justify-center">
        <div className="flex flex-col h-120 w-90 bg-black/75 rounded">
          
          {/* Title */}
          <h1 className="h-14 w-70 flex justify-center items-center text-2xl font-medium text-center py-6 px-6 font-sans text-white">
            Sign In
          </h1>

          {/* Form */}
          <form className="px-10 flex flex-col justify-center items-center gap-5 font-sans text-white">
            
            {/* Email */}
            <div className="flex items-center h-10 w-70 bg-zinc-800 rounded px-3">
              <input 
                type="text" 
                placeholder="Email or number" 
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

            {/* Sign In Button */}
            <Link to="/signup" className="w-full flex justify-center">
              <div className="bg-red-500 h-10 w-70 rounded flex justify-center items-center">
                <button className="bg-red-500 w-full h-full flex justify-center items-center rounded">
                  Sign In
                </button>
              </div>
            </Link>

            {/* OR */}
            <h4 className="h-6 w-70 flex justify-center">OR</h4>

            {/* Use sign-in code */}
            <button className="h-10 w-70 bg-zinc-800 rounded text-center">
              Use sign-in code
            </button>

            {/* Forgot password + Remember me (aligned properly now) */}
            <div className="flex justify-between items-center w-70 text-sm">
              <a href="#" className="hover:underline">Forgot password?</a>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4" />
                <label htmlFor="remember">Remember me</label>
              </div>
            </div> 

            {/* Sign up + reCAPTCHA note (UNCHANGED) */}
            <div className="mt-2">
              <h2>
                New to Netflix? <a href="#" className="text-red-500 hover:underline">Sign up Now</a>
              </h2> 
              <br />
              <h6 className="h-8 w-70 flex justify-center text-sm text-gray-400">
                This page is protected by Google reCAPTCHA to ensure you're not a bot.
              </h6>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
