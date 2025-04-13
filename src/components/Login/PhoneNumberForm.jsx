
import React, { useState, useRef, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { auth, RecaptchaVerifier } from "./firbase"; 
import { signInWithPhoneNumber, signOut, onAuthStateChanged } from "firebase/auth";
import "./PhoneNumberForm.css"; 

const PhoneOtpComponent = () => {
  const [showOtpInputs, setShowOtpInputs] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [otp, setOtp] = useState(Array(6).fill("")); 
  const otpRefs = useRef([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [googleCredential, setGoogleCredential] = useState(null);
  const modalRef = useRef(null);
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    const storedCredential = localStorage.getItem("googleToken");
    if (storedCredential) {
      setGoogleCredential(storedCredential);
      setIsLoggedIn(true);
    }
// حفظ التوكن في اللوكال سنتوريج
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user || localStorage.getItem("googleToken")) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log("reCAPTCHA verified");
          handleSendOTP();
        }
      });
    }
  };

  const handleSendOTP = () => {
    const fullPhone = countryCode + phoneNumber;
    if (!/^\d+$/.test(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
// تسجيل الدخول برقم الهاتف 
    signInWithPhoneNumber(auth, fullPhone, appVerifier)
      .then((confirmation) => {
        setConfirmationResult(confirmation);
        console.log('this is confirmation:', JSON.stringify(confirmation));
        setShowOtpInputs(true);
        console.log("OTP sent successfully.");
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        let errorMessage = "Failed to send OTP. Please try again.";
        if (error.code === "auth/invalid-phone-number") {
          errorMessage = "The phone number is invalid. Please check and try again.";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage = "Too many requests. Please try again later.";
        }
        alert(errorMessage);
      });
  };

  const handleVerifyOTP = () => {
    const code = otp.join("");
    if (!confirmationResult) return alert("No OTP sent yet!");
    if (code.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
// Verify the OTP
    confirmationResult.confirm(code)
      .then((result) => {
        console.log("Phone number verified!", result.user);
        alert("Phone number verified successfully!");
        setIsLoggedIn(true);
        setShowOtpInputs(false);
        setOtp(Array(6).fill(""));
        modalRef.current?.classList.remove('show');
        document.body.style.overflow = 'auto';
      })
      .catch((error) => {
        console.error("Invalid OTP:", error);
        alert("Invalid OTP. Please try again.");
      });
  };
// تحديث الرقم السري
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 5) otpRefs.current[index + 1].focus();
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1].focus();
  };
//تسجيل الدخول باستخدام حساب جوجل
  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login successful:", response);
    alert("Google login successful!");
    setGoogleCredential(response.credential);
    localStorage.setItem("googleToken", response.credential);
    setIsLoggedIn(true);
    modalRef.current?.classList.remove('show');
    document.body.style.overflow = 'auto';
  };

  const handleGoogleLoginError = () => {
    console.log("Google login failed");
    alert("Google login failed. Please try again.");
  };
// تسجيل الخروج 
  const handleLogout = () => {
    if (googleCredential) {
      window.google.accounts.id.revoke(googleCredential, () => {
        console.log("Google logout successful");
        localStorage.removeItem("googleToken");
        setGoogleCredential(null);
        setIsLoggedIn(false);
      });
    } else {
      signOut(auth)
        .then(() => {
          console.log("Phone logout successful");
          setIsLoggedIn(false);
        })
        .catch((error) => {
          console.error("Error during phone logout:", error);
        });
    }
  };

  return (
    <GoogleOAuthProvider clientId="739388745257-cp69iqth6eeg742jbudiahenlkc1808o.apps.googleusercontent.com">
      <div className="container mt-5">
        {!isLoggedIn && (
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneOtpModal">
            Login
          </button>
        )}
        {isLoggedIn && (
          <div>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        )}

        <div ref={modalRef} className="modal fade" id="phoneOtpModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Login or Sign Up </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                {!showOtpInputs ? (
                  <>
                    <h3>Welcome to Airbnb</h3>
                    <label className="mb-2">Code country</label>
                    <div className="d-flex-gap mb-3">
                      <select
                        className="form-select"
                        style={{ maxWidth: "650px" }}
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        <option value="+20">🇪🇬 +20</option>
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+1">🇺🇸 +1</option>
                      </select>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <p>We’ll call or text you to confirm your number. <a href="/">Privacy Policy</a></p>
                    <button className="btn-login" onClick={handleSendOTP}>
                      Continue
                    </button>
                    <p>Or </p>
                    <hr></hr>
                    <div className="d-flex-center">
                      <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        useOneTap
                      
                        size="large"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-3">
                      Please enter the 6-digit code sent to: <strong>{countryCode} {phoneNumber}</strong>
                    </p>
                    <div className="d-flex justify-content-center gap-2 mb-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          className="form-control text-center"
                          style={{ width: "40px" }}
                          value={digit}
                          onChange={(e) => handleOtpChange(e.target.value, index)}
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                          ref={(el) => (otpRefs.current[index] = el)}
                        />
                      ))}
                    </div>
                    <button className="btn-login w-100" onClick={handleVerifyOTP}>
                      Verify OTP
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </GoogleOAuthProvider>
  );
};

export default PhoneOtpComponent;

