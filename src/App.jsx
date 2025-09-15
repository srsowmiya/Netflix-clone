import React from 'react'
import Login from './components/Login';
import { Routes, Route } from "react-router-dom"; // <-- remove BrowserRouter
import Home from './components/Home';
import Signup from './components/Signup';
import Player from './components/Player';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/player" element={<Player />} />
    </Routes>
  )
}

export default App
