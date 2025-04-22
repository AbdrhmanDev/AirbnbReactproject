import React, { useState, useRef } from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { handleSendOTP, handleVerifyOTP, handleOtpChange, handleOtpKeyDown, handleGoogleLoginSuccess, handleGoogleLoginError } from "./PhoneAuthFunctions";
import style from "./PhoneNumberForm.module.css";

const LoginModal = ({ isOpen, closeModal, setIsLoggedIn, setGoogleCredential }) => {
  const [showOtpInputs, setShowOtpInputs] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const otpRefs = useRef([]);
  const [confirmationResult, setConfirmationResult] = useState(null);

  if (!isOpen) return null;

  return (
    <GoogleOAuthProvider clientId="739388745257-cp69iqth6eeg742jbudiahenlkc1808o.apps.googleusercontent.com">
      <div className={style.container}>
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className={`${style.modalContent} modal-content p-3`}>
              <div className="modal-header">
                <h5 className="modal-title">Login or Sign Up</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {!showOtpInputs ? (
                  <>
                    <h3 className={style.title}>Welcome to Airbnb</h3>
                    <label className="mb-2"></label>
                    <div className={style.inputGroup}>
                      <select className={style.select} value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                        <option value="+20">🇪🇬 +20</option>
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+1">🇺🇸 +1</option>
                      </select>
                      <input
                        type="tel"
                        className={style.input}
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <p className={style.policyText}>
                      We’ll call or text you to confirm your number. <a href="/">Privacy Policy</a>
                    </p>
                    <button className={style.continueBtn} onClick={() => handleSendOTP(countryCode, phoneNumber, setShowOtpInputs, setConfirmationResult)}>
                      Continue
                    </button>
                    <p className={style.orText}>Or</p>
                    <hr />
                    <div className={style.googleLoginBox}>
                      <GoogleLogin
                        onSuccess={(response) => handleGoogleLoginSuccess(response, setIsLoggedIn, null, setGoogleCredential)}
                        onError={handleGoogleLoginError}
                        size="large"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-3">Please enter the 6-digit code sent to: <strong>{countryCode} {phoneNumber}</strong></p>
                    <div className={style.otpContainer}>
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          className={style.otpInput}
                          value={digit}
                          onChange={(e) => handleOtpChange(e.target.value, index, otp, setOtp, otpRefs)}
                          onKeyDown={(e) => handleOtpKeyDown(e, index, otp, otpRefs)}
                          ref={(el) => (otpRefs.current[index] = el)}
                        />
                      ))}
                    </div>
                    <button className={style.verifyBtn} onClick={() => handleVerifyOTP(otp, confirmationResult, setIsLoggedIn, setShowOtpInputs, setOtp)}>
                      Verify OTP
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginModal;
