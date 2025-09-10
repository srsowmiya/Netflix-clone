import React from 'react'
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/Signup';

const App = () => {
  return (
    <div>
            <Routes>
              <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
      
    </div>
  )
}

export default App
