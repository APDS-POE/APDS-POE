// src/App.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Payments from './components/payment'; // Corrected import (capital 'P')
import PrivateRoute from './components/privateRoute'; // Corrected import (capital 'P' and 'R')
import Navbar from './components/Navbar.mjs'; // Import Navbar
import HomePage from './components/HomePage.mjs'; // Import HomePage
import { AuthProvider } from './context/AuthContext.mjs'; // Import AuthProvider

function App() {
  return (
    <ChakraProvider>
      <AuthProvider> {/* Provide AuthContext */}
        <Router>
          <Navbar /> {/* Include the Navbar here */}
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Use HomePage here */}
            <Route path="/login" element={<Login />} />
           
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/payment" 
              element={
                <PrivateRoute employee={true}>
                  <Payments />
                </PrivateRoute>
              } 
            />
            {/* Add a catch-all route for undefined paths */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
