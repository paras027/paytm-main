import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Send from "./pages/Send";

// Function to check if the user is logged in
function isLoggedIn() {
  // You can implement your logic here to check if the user is logged in
  // For example, you can check if the user has a valid token in local storage
  const token = localStorage.getItem('token');
  return token?true:false; // Return true if token exists, false otherwise
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Redirect to dashboard if user is logged in */}
          <Route
            path="/"
            element={isLoggedIn() ? <Dashboard/> : <Home />}
          />
          {/* Redirect to dashboard if user is logged in */}
          <Route
            path="/signup"
            element={isLoggedIn() ? <Dashboard/> : <Signup />}
          />
          {/* Redirect to dashboard if user is logged in */}
          <Route
            path="/login"
            element={isLoggedIn() ? <Dashboard/> : <Login />}
          />
          {/* Only allow access to dashboard if user is logged in */}
          <Route
            path="/dashboard"
            element={isLoggedIn() ? <Dashboard /> : <Login />}
          />
          {/* Only allow access to send page if user is logged in */}
          <Route
            path="/send"
            element={isLoggedIn() ? <Send /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
