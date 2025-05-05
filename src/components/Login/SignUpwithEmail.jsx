import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
// تسجيل الدخول باستخدام البريد الإلكتروني
const EmailSignup = ({ show, handleClose, email, setIsLoggedIn ,setEmail}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
// التحقق من صحة البيانات المدخلة
    if (!formData.firstName || formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters.";
    }
// التحقق من صحة الاسم الأول
// التحقق من صحة الاسم الأخير
    if (!formData.lastName || formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters.";
    }
// التحقق من صحة البريد الإلكتروني
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
// التحقق من صحة كلمة المرور
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
// التحقق من صحة تاريخ الميلاد ,وان يكون اكبر من 18 عام 
    if (!formData.birthDate) {
      newErrors.birthDate = "Date of birth is required.";
    }
    const birthDateObj = new Date(formData.birthDate);
    const age = new Date().getFullYear() - birthDateObj.getFullYear();
    if (!formData.birthDate || isNaN(birthDateObj) || age < 18) {
      newErrors.birthDate = "You must be at least 18 years old.";
    }
    if (!formData.address || formData.address.trim().length < 5) {
      newErrors.address = "Address is too short.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    try {  // إرسال البيانات إلى الخادم
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email, // دا جاي من props
          password: formData.password,
          dateOfBirth: formData.birthDate,
          address: formData.address,
        }),
      });
// استلام البيانات من الخادم
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: `Welcome ${data.user.firstName} ${data.user.lastName}!`,
          text: "Glad to have you here 😊",
          icon: "success",
          confirmButtonText: "Thanks!",
        });
// حفظ التوكن في localStorage
        localStorage.setItem("Emailtoken", data.token);
        window.dispatchEvent(new Event("storage"));
        localStorage.setItem("userData", JSON.stringify(data.user));
        setIsLoggedIn(true);
        setFormData({
          firstName: "",
          lastName: "",
          birthDate: "",
          password: "",
          address: "",
        });
        setEmail(""); //
        handleClose(); // إغلاق المودال
      } else {
        alert(` Failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error occurred during signup. Please try again.");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      className="modal fade w-100"
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign Up with Email</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <h5>Legal Name</h5> 
        <input
          type="text"
          placeholder="First Name in ID"
          className="form-control mb-2"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value }) 
          }
        />
        {errors.firstName && <p className="text-danger">{errors.firstName}</p>}

        <input
          type="text"
          placeholder="Last Name in ID"
          className="form-control mb-2"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        {errors.lastName && <p className="text-danger">{errors.lastName}</p>}

        <hr />
        <p className="text-muted mb-2">
          Make sure this matches the name on your government ID. If you go by
          another name, you can add a preferred first name.
        </p>
        <hr />

        <h5>Email</h5>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="text-danger">{errors.email}</p>}

        <h5>Date of birth</h5>
        <input
          type="date"
          className="form-control mb-2"
          value={formData.birthDate}
          onChange={(e) =>
            setFormData({ ...formData, birthDate: e.target.value })
          }
        />
        {errors.birthDate && <p className="text-danger">{errors.birthDate}</p>}

        <p className="text-muted mb-2">
          To sign up, you need to be at least 18. Your birthday won’t be shared
          with other people who use Airbnb.
        </p>

        <h5>Address</h5>
        <input
          type="text"
          placeholder="Your address"
          className="form-control mb-2"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        {errors.address && <p className="text-danger">{errors.address}</p>}

        <h5>Password</h5>
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {errors.password && <p className="text-danger">{errors.password}</p>}

        <p className="text-muted mb-2">
          By selecting Agree and continue, I agree to Airbnb’s Terms of Service,
          Payments Terms of Service, and Nondiscrimination Policy and
          acknowledge the <a href="#">Privacy Policy</a>.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            width: "100%",
            backgroundColor: "#FF385C",
            color: "white",
            padding: "0.75rem",
            border: "none",
          }}
          onClick={handleSignup}
        >
          Agree and continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailSignup;
