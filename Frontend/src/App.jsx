import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Player from "./components/Player";
import MoodRecommender from "./components/MoodREcommender";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login"); // ✅ only redirect when logged out
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/player/:videoId" element={<Player />} />
      <Route path="/mood" element={<MoodRecommender />} />
    </Routes>
  );
};

export default App;
