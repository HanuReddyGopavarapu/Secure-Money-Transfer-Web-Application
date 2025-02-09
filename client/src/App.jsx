import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Transfer from "./Pages/Transfer";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";



const App = () => {
    const [user, setUser] = useState(null);
  
    console.log("App.jsx - user state:", user); // Debugging: Check user state
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      setUser(null);
    };
  
    return (
      <Router>
        <Navbar key={user ? "logged-in" : "logged-out"} user={user} onLogout={handleLogout} />
        <Routes>
          {/* Public routes (accessible without authentication) */}
          <Route path="/signin" element={<Signin setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
  
          {/* Protected routes (require authentication) */}
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/transfer" element={<Transfer user={user} />} />
          </Route>
  
          {/* Redirect all other routes to /signin */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </Router>
    );
  };
  
  export default App;
  