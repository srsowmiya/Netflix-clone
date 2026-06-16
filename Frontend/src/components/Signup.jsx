import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../firebase";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(name, email, password);

      alert("✅ Account created successfully!");

      setName("");
      setEmail("");
      setPassword("");

      navigate("/login");

    } catch (error) {
      console.error("❌ Signup error:", error);

      if (error.code === "auth/email-already-in-use") {
        alert("Email already exists. Please login.");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex bg-[url('/loginbg2.jpg')] bg-gradient-to-t from-black/60 via-black/30 to-transparent bg-cover bg-center min-h-screen items-center justify-center">
      <div className="flex flex-col h-100 w-90 bg-black/75 rounded">

        <h1 className="h-14 w-70 flex justify-center items-center text-2xl font-medium text-center py-6 px-6 font-sans text-white">
          Sign Up
        </h1>

        <form
          onSubmit={handleSubmit}
          className="px-10 flex flex-col justify-center items-center gap-5 font-sans text-white"
        >
          <div className="flex items-center h-10 w-70 bg-zinc-800 rounded px-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name"
              className="bg-transparent outline-none w-full text-center"
              required
            />
          </div>

          <div className="flex items-center h-10 w-70 bg-zinc-800 rounded px-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none w-full text-center"
              required
            />
          </div>

          <div className="flex items-center h-10 w-70 bg-zinc-800 rounded px-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none w-full text-center"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 h-10 w-70 rounded flex justify-center items-center"
          >
            Sign Up
          </button>

          <div className="h-6 w-70 flex justify-center mt-2 text-sm">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red-500 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Signup;