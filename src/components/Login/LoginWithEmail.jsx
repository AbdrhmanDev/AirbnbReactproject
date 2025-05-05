import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";


const LoginModal = ({ show, handleClose, setIsLoggedIn ,email }) => { // ← إضافة خاصية email
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
        });

        localStorage.setItem("Emailtoken", data.token); // ← حفظ التوكن في localStorage
        if (data.user) {
          localStorage.setItem("userData", JSON.stringify(data.user));
        }
        
        window.dispatchEvent(new Event("storage"));
        setIsLoggedIn(true);
      
        setPassword("");
        setErrorMessage("");
        handleClose();
      } else {
        setErrorMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    // Modal for login with email and password
    <Modal show={show} onHide={handleClose} centered> 
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
       
<p>Enter your password</p>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleLogin}
          style={{
            width: "100%",
            backgroundColor: "#FF385C",
            border: "none",
            padding: "0.75rem",
          }}
        >
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
