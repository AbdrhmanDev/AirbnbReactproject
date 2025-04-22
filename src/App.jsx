import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // استيراد BrowserRouter بشكل صحيح
import PhoneOtpComponent from './components/Login/PhoneNumberForm';
import Navbar from './components/Login/Navbar.jsx';
import UserInfo from "./components/Account/Setting.jsx";
import LoginSecurity from "./components/Account/login-security.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [googleCredential, setGoogleCredential] = useState(null);

  useEffect(() => {
    const storedCredential = localStorage.getItem("authToken");
    if (storedCredential) {
      setGoogleCredential(storedCredential);
      setIsLoggedIn(true);
    }
  }, []); // هذا التأثير يتم تنفيذه مرة واحدة فقط عند تحميل الصفحة

  const handleLogin = (authToken) => {
    console.log("Logging in with token:", authToken);
    localStorage.setItem("authToken", authToken);
    setGoogleCredential(authToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setGoogleCredential(null);
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Router>
        <Navbar 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
          setGoogleCredential={setGoogleCredential} 
        />
        <Routes>
          <Route path="/" element={<PhoneOtpComponent 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn} 
            setGoogleCredential={setGoogleCredential} 
            handleLogin={handleLogin} 
            handleLogout={handleLogout} 
          />} />
          <Route path="/Account" element={<UserInfo />} />
          <Route path="/Account/login-security" element={<LoginSecurity/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
