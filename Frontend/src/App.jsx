import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Player from "./components/Player";
import MoodRecommender from "./components/MoodREcommender";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const publicRoutes = ["/login", "/signup"];

      if (!user && !publicRoutes.includes(location.pathname)) {
        navigate("/login", { replace: true });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  if (loading) return null; // prevents flicker

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route path="/" element={<Home />} />
      <Route path="/player/:videoId" element={<Player />} />
      <Route path="/mood" element={<MoodRecommender />} />
    </Routes>
  );
};

export default App;
