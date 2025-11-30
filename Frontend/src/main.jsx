import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom' 
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter> <App/></BrowserRouter>
  </StrictMode>,
)
