import React from "react";
import Login from './components/Login';
import { Routes, Route, useNavigate } from "react-router-dom"; // <-- remove BrowserRouter
import Home from './components/Home';
import Signup from './components/Signup';
import Player from './components/Player';
import { onAuthStateChanged } from "firebase/auth";   // ✅ correct
import { auth } from "./firebase";  
import { useEffect } from 'react';

const App = () => {

  const navigate= useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        console.log("Logged in", user);
        navigate("/");
      }
      else{
        console.log("logged out");
        navigate("/login");
      }
    })
  },[])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/player" element={<Player />} />
      <Route path="/player/:id" element={<Player />} />
    </Routes>
  )
}

export default App
