// import React, { useState, useEffect } from "react";
// import PhoneOtpComponent from './components/Login/PhoneNumberForm';
// import Navbar from './components/Login/Navbar.jsx';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [googleCredential, setGoogleCredential] = useState(null);

//   useEffect(() => {
//     // استرجاع حالة تسجيل الدخول من localStorage
//     const storedCredential = localStorage.getItem("authToken");
//     if (storedCredential) {
//       setGoogleCredential(storedCredential);
//       setIsLoggedIn(true);
//     }

//     // إضافة listener للمراقبة إذا تغيرت حالة التوثيق
//     const storedUser = localStorage.getItem("userData");
//     if (storedUser) {
//       setGoogleCredential(storedUser);
//     }
//   }, []); // هذا التأثير يتم تنفيذه مرة واحدة فقط عند تحميل الصفحة

//   // تحديث حالة تسجيل الدخول والخروج مع localStorage
//   const handleLogin = (authToken) => {
//     localStorage.setItem("authToken", authToken);
//     setGoogleCredential(authToken);
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     setGoogleCredential(null);
//     setIsLoggedIn(false);
//   };

//   return (
//     <div>
//       <Navbar 
//         isLoggedIn={isLoggedIn} 
//         setIsLoggedIn={setIsLoggedIn} 
//         setGoogleCredential={setGoogleCredential} 
//       />
//       <PhoneOtpComponent 
//         isLoggedIn={isLoggedIn} 
//         setIsLoggedIn={setIsLoggedIn} 
//         setGoogleCredential={setGoogleCredential} 
//         handleLogin={handleLogin} 
//         handleLogout={handleLogout} 
//       />
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import PhoneOtpComponent from './components/Login/PhoneNumberForm';
import Navbar from './components/Login/Navbar.jsx';

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
      <Navbar 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        setGoogleCredential={setGoogleCredential} 
      />
      <PhoneOtpComponent 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        setGoogleCredential={setGoogleCredential} 
        handleLogin={handleLogin} 
        handleLogout={handleLogout} 
      />
    </div>
  );
};

export default App;
