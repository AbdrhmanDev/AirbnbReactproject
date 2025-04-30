import React, { useState, useRef, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { auth, RecaptchaVerifier } from "./firbase";
import { onAuthStateChanged } from "firebase/auth";

import {
  handleSendOTP,
  handleVerifyOTP,
  handleOtpChange,
  handleOtpKeyDown,
  handleLogout,
  handleGoogleLoginSuccess,
  handleGoogleLoginError
} from "./PhoneAuthFunctions";
import styles from "./PhoneNumberForm.module.css"; // استيراد الأنماط

const PhoneOtpComponent = ({
  isLoggedIn,
  setIsLoggedIn,
  setGoogleCredential,
  handleLogin,
  handleLogout
}) => {
  const [showOtpInputs, setShowOtpInputs] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const otpRefs = useRef([]);
  const modalRef = useRef(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userData, setUserData] = useState(null); // تخزين بيانات المستخدم

  // استرجاع حالة تسجيل الدخول من localStorage
  useEffect(() => {
    const storedCredential = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("userData");

    if (storedCredential) {
      setGoogleCredential(storedCredential);
      setIsLoggedIn(true);
    }
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    // مراقبة تغييرات حالة تسجيل الدخول في Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user || !!localStorage.getItem("authToken"));
    });

    return () => unsubscribe(); // إلغاء الاشتراك عند فك تحميل المكون
  }, [setIsLoggedIn, setGoogleCredential]);

  return (
    <GoogleOAuthProvider clientId="739388745257-cp69iqth6eeg742jbudiahenlkc1808o.apps.googleusercontent.com">
      <div className={styles.container}>
        {/* زر تسجيل الدخول أو تسجيل الخروج */}
        {!isLoggedIn && (
          <span
            className={styles.loginBtn}
            data-bs-toggle="modal"
            data-bs-target="#phoneOtpModal"
          >
            
          </span>
        )}
        {isLoggedIn && (
          <div>
            <span
              onClick={() =>
                handleLogout(setGoogleCredential, setIsLoggedIn)
              }
              className={styles.logoutBtn}
            >
            
            </span>
          </div>
        )}

        {/* نافذة تسجيل الدخول */}
        <div
          ref={modalRef}
          className="modal fade"
          id="phoneOtpModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className={styles.modalTitle}>Login or Sign Up</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                {/* نموذج إدخال رقم الهاتف */}
                {!showOtpInputs ? (
                  <>
                    <h3>Welcome to Airbnb</h3>
                    <div className={styles["d-flex-gap"]}>
                      <select
                        className={styles["form-select"]}
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
                        className={styles["form-control"]}
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <p>
                      We’ll call or text you to confirm your number.{" "}
                      <a href="/">Privacy Policy</a>
                    </p>
                    <button
                      className={styles["btn-login"]}
                      onClick={() =>
                        handleSendOTP(
                          countryCode,
                          phoneNumber,
                          setShowOtpInputs,
                          setConfirmationResult
                        )
                      }
                    >
                      Continue
                    </button>
                    <p className={styles.centerText}>Or</p>
                    <hr />
                    {/* تسجيل الدخول باستخدام Google */}
                    <div className={styles["d-flex-center"]}>
                      <GoogleLogin
                        onSuccess={(response) =>
                          handleGoogleLoginSuccess(
                            response,
                            setIsLoggedIn,
                            modalRef,
                            setGoogleCredential,
                            setUserData
                          )
                        }
                        onError={handleGoogleLoginError}
                        useOneTap
                        size="large"
                      />
                    </div>
                  </>
                ) : (
                  // نموذج إدخال OTP
                  <>
                    <p className="mb-3">
                      Please enter the 6-digit code sent to:{" "}
                      <strong>
                        {countryCode} {phoneNumber}
                      </strong>
                    </p>
                    <div className={styles["d-flex-center"]}>
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          className={`${styles["form-control"]} ${styles["otp-input"]}`}
                          style={{ width: "40px" }}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(
                              e.target.value,
                              index,
                              otp,
                              setOtp,
                              otpRefs
                            )
                          }
                          onKeyDown={(e) =>
                            handleOtpKeyDown(e, index, otp, otpRefs)
                          }
                          ref={(el) => (otpRefs.current[index] = el)}
                        />
                      ))}
                    </div>
                    <button
                      className={styles["btn-login"]}
                      onClick={() =>
                        handleVerifyOTP(
                          otp,
                          confirmationResult,
                          setIsLoggedIn,
                          setShowOtpInputs,
                          setOtp,
                          modalRef
                        )
                      }
                    >
                      Verify OTP
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* حاوية reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </GoogleOAuthProvider>
  );
};

export default PhoneOtpComponent;