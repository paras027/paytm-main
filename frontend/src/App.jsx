import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Send from './pages/Send';

function App() {
  const [token, setToken] = useState(null);

  // Check if the user is already authenticated when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Function to handle user login
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup handleLogin={handleLogin} />} />

          {/* Protected routes */}
          {token ? (
            <div>
              <Route path="/dashboard" element={<Dashboard handleLogout={handleLogout} />} />
              <Route path="/send" element={<Send />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </div>
          ) : (
            // Redirect to login page if user is not authenticated
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
