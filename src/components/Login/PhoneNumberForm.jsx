import React, { useState, useRef, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { auth, RecaptchaVerifier } from "./firbase";
import { onAuthStateChanged } from "firebase/auth";
import {
  handleSendOTP,
  handleVerifyOTP,
  handleOtpChange,
  handleOtpKeyDown,
  handleLogout,
  handleGoogleLoginSuccess,
  handleGoogleLoginError,
} from "./PhoneAuthFunctions";
import style from "./PhoneNumberForm.module.css";
import EmailSignup from "./SignUpwithEmail";
import { FaEnvelope } from "react-icons/fa";
import { Modal } from "bootstrap";
import LoginModal from "./LoginwithEmail";

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
  const [userData, setUserData] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // <-- هنا
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailError, setEmailError] = useState("");
  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  useEffect(() => {
    const storedCredential = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("userData");

    if (storedCredential) {
      setGoogleCredential(storedCredential); // تخزين بيانات اللمستخدم
      setIsLoggedIn(true);
    }

    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user || !!localStorage.getItem("authToken"));
    });

    return () => unsubscribe();
  }, []);
  // التحقق من وجود المستخدم في الجلسة
  const handleOpenEmailModal = () => {
    const modalEl = document.getElementById("phoneOtpModal");
    const modalInstance = Modal.getInstance(modalEl) || new Modal(modalEl);
    modalInstance.hide();
    setShowEmailModal(true);
  };
  // إغلاق مودال تسجيل الدخول
  const handleOpenLoginModal = (isOpen) => {
    const modalEl = document.getElementById("phoneOtpModal");
    const modalInstance = Modal.getInstance(modalEl) || new Modal(modalEl);
    modalInstance.hide();
    setShowLoginModal(isOpen);
  };
  // التحقق من وجود البريد الإلكتروني
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/users/check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        return data.exists; // يجب أن ترد API بـ { exists: true/false }
      } else {
        console.error("Error checking email:", data.message);
        return false;
      }
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  };
  return (
    // إضافة GoogleOAuthProvider حول التطبيق
    <GoogleOAuthProvider clientId="739388745257-cp69iqth6eeg742jbudiahenlkc1808o.apps.googleusercontent.com">
      <div className={style.container}>
        {!isLoggedIn && (
          <span
            className={style.loginBtn}
            data-bs-toggle="modal"
            data-bs-target="#phoneOtpModal"
          ></span>
        )}
        {isLoggedIn && (
          <span
            onClick={() =>
              handleLogout(googleCredential, setGoogleCredential, setIsLoggedIn)
            }
            className={style.logoutBtn}
          ></span>
        )}

        <div
          ref={modalRef}
          className="modal fade"
          id="phoneOtpModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className={`${style.modalContent} modal-content p-3`}>
              <div className="modal-header">
                <h5 className="modal-title">Login or Sign Up</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                {!showOtpInputs ? (
                  <>
                    <h4 className={style.title}>Welcome to Airbnb</h4>
                    <label className="mb-2"></label>
                    <div className={style.inputGroup}>
                      <select
                        className={style.select}
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
                        className={style.input}
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <p className={style.policyText}>
                      We’ll call or text you to confirm your number.{" "}
                      <a href="/">Privacy Policy</a>
                    </p>
                    <button
                      className={style.continueBtn}
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
                    <p className={style.orText}>Or</p>
                    <hr />
                    {/* تسجيل الدخول بحساب جوجل  */}
                    <div className={style.googleLoginBox}>
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
                        size="large"
                        locale="en"
                        className={style.googleLoginBtn}
                      />
                    </div>

                    {/* تسيجيل الدخول بالايميل والباسورد */}

                    {!showEmailInput ? (
                      <button
                        onClick={() => setShowEmailInput(true)}
                        className={style.socialLoginBtn}
                        style={{ position: "relative", textAlign: "center" }}
                      >
                        <FaEnvelope
                          style={{
                            position: "absolute",
                            left: "16px", // المسافة من أقصى اليسار
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        />
                        Sign in with email
                      </button>
                    ) : (
                      <>
                        <input
                          type="email"
                          className={style.input2}
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(""); // reset error on change
                          }}
                        />
                        {emailError && (
                          <div style={{ color: "red", marginTop: "5px" }}>
                            {emailError}
                          </div>
                        )}
                        <button
                          className={style.continueBtn}
                          disabled={!email}
                          onClick={async () => {
                            if (!isValidEmail(email)) {
                              setEmailError(
                                "Please enter a valid email address."
                              );
                              return;
                            }

                            setEmailError("");
                            // التحقق من وجود البريد الإلكتروني
                            const exists = await checkEmailExists(email);

                            if (exists) {
                              // إذا كان موجود → فتح مودال تسجيل الدخول فقط
                              handleOpenLoginModal(true);
                            } else {
                              // إذا كان جديد → فتح مودال التسجيل
                              handleOpenEmailModal(true);
                            }
                          }}
                        >
                          Continue
                        </button>
                      </>
                    )}

                    <EmailSignup
                      show={showEmailModal}
                      handleClose={() => {
                        setShowEmailModal(false);
                        setEmail("");
                      }}
                      email={email}
                      setEmail={setEmail}
                      setIsLoggedIn={setIsLoggedIn}
                    />

                    <LoginModal
                      show={showLoginModal}
                      handleClose={() => {
                        setShowLoginModal(false);
                        setEmail("");
                      }}
                      setIsLoggedIn={setIsLoggedIn}
                      email={email}
                    />
                  </>
                ) : (
                  // end
                  <>
                    <p className="mb-3">
                      Please enter the 6-digit code sent to:{" "}
                      <strong>
                        {countryCode} {phoneNumber}
                      </strong>
                    </p>
                    <div className={style.otpContainer}>
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          className={style.otpInput}
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
                      className={style.verifyBtn}
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
      <div id="recaptcha-container" style={{ marginTop: "20px" }}></div> 
       </GoogleOAuthProvider>
  );
};
export default PhoneOtpComponent;
