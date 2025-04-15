

import React, { useState, useRef, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { auth, RecaptchaVerifier } from "./firbase"; 
import {onAuthStateChanged } from "firebase/auth";
import {
  handleSendOTP,
  handleVerifyOTP,
  handleOtpChange,
  handleOtpKeyDown,
  handleLogout,
  handleGoogleLoginSuccess,
  handleGoogleLoginError
} from "./PhoneAuthFunctions";
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
    const storedCredential = localStorage.getItem("authToken");
    if (storedCredential) {
      setGoogleCredential(storedCredential);
      setIsLoggedIn(true);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user || !!localStorage.getItem("authToken"));
    });

    return () => unsubscribe();
  }, []);
//
  return (
    <GoogleOAuthProvider clientId="739388745257-cp69iqth6eeg742jbudiahenlkc1808o.apps.googleusercontent.com">
      <div className="container mt-5">
        {!isLoggedIn && (
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneOtpModal">
            Login
          </button>
        )}
        {isLoggedIn && (
          <button onClick={() => handleLogout(googleCredential, setGoogleCredential, setIsLoggedIn)} className="btn btn-danger">
            Logout
          </button>
        )}

        <div ref={modalRef} className="modal fade" id="phoneOtpModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Login or Sign Up</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                {!showOtpInputs ? (
                  <>
                    <h3>Welcome to Airbnb</h3>
                    <label className="mb-2"></label>
                    <div className="d-flex-gap mb-3">
                      <select className="form-select" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
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
                    <button className="btn-login" onClick={() => handleSendOTP(countryCode, phoneNumber, setShowOtpInputs, setConfirmationResult)}>
                      Continue
                    </button>
                    <p>Or</p>
                    <hr />
                    <div className="d-flex-center">
                      <GoogleLogin
                        onSuccess={(response) => handleGoogleLoginSuccess(response, setIsLoggedIn, modalRef, setGoogleCredential)}
                        onError={handleGoogleLoginError}
                        useOneTap
                        size="large"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-3">Please enter the 6-digit code sent to: <strong>{countryCode} {phoneNumber}</strong></p>
                    <div className="d-flex justify-content-center gap-2 mb-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          className="form-control text-center"
                          style={{ width: "40px" }}
                          value={digit}
                          onChange={(e) => handleOtpChange(e.target.value, index, otp, setOtp, otpRefs)}
                          onKeyDown={(e) => handleOtpKeyDown(e, index, otp, otpRefs)}
                          ref={(el) => (otpRefs.current[index] = el)}
                        />
                      ))}
                    </div>
                    <button className="btn-login w-100" onClick={() => handleVerifyOTP(otp, confirmationResult, setIsLoggedIn, setShowOtpInputs, setOtp, modalRef)}>
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
