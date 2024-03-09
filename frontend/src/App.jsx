import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Signup from "./pages/Signup";
import  Login  from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Send from "./pages/Send";

function App() {
  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App