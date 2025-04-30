import React, { useState, useRef ,useEffect} from "react";

const Navbar = ({ isLoggedIn, setIsLoggedIn, setGoogleCredential }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    console.log("isLoggedIn updated in Navbar:", isLoggedIn);
  }, [isLoggedIn]);

  const logout = () => {
    localStorage.removeItem("authToken");
    setGoogleCredential(null);
    setIsLoggedIn(false);
    if (modalRef.current) {
      modalRef.current.classList.remove('show');
    }
  };

  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //   <div className="container-fluid">
    //     <a className="navbar-brand" href="#" >app</a>
      
        <div className="d-flex m-5">
          {!isLoggedIn ? (
            <span
              className="text-dark"
              role="button"
              style={{ cursor: "pointer" }}
              data-bs-toggle="modal"
              data-bs-target="#phoneOtpModal"
            >
              Login
            </span>
          ) : (
            <span
              className="text-dark"
              role="button"
              style={{ cursor: "pointer" }}
              onClick={logout}
            >
              Logout
            </span>
          )}
        </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;