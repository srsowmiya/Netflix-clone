import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); // ✅ Firebase login
      console.log("✅ Logged in successfully!");
      navigate("/"); // ✅ redirect to home
    } catch (error) {
      console.error("❌ Login error:", error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="flex bg-[url('/loginbg2.jpg')] bg-gradient-to-t from-black/60 via-black/30 to-transparent bg-cover bg-center min-h-screen items-center justify-center">
        <div className="flex flex-col h-120 w-90 bg-black/75 rounded">
          
          {/* Title */}
          <h1 className="h-14 w-70 flex justify-center items-center text-2xl font-medium text-center py-6 px-6 font-sans text-white">
            Sign In
          </h1>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="px-10 flex flex-col justify-center items-center gap-5 font-sans text-white"
          >
            {/* Email */}
            <div className="flex items-center h-10 w-70 bg-zinc-800 rounded px-3">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email or number"
                className="bg-transparent outline-none focus:ring-0 w-full text-center"
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center h-10 w-70 bg-zinc-800 rounded px-3">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none focus:ring-0 w-full text-center"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-red-500 h-10 w-70 rounded flex justify-center items-center"
            >
              Sign In
            </button>

            {/* OR */}
            <h4 className="h-6 w-70 flex justify-center">OR</h4>

            {/* Use sign-in code */}
            <button
              type="button"
              className="h-10 w-70 bg-zinc-800 rounded text-center"
            >
              Use sign-in code
            </button>

            {/* Forgot password + Remember me */}
            <div className="flex justify-between items-center w-70 text-sm">
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4" />
                <label htmlFor="remember">Remember me</label>
              </div>
            </div>

            {/* Sign Up option (ADDED HERE) */}
            <div className="w-70 text-sm text-zinc-400 text-center mt-2">
              New to Netflix?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-white cursor-pointer hover:underline"
              >
                Sign up now
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
