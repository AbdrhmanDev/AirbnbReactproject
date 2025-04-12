import React, { useState, useRef } from "react";


const PhoneOtpComponent = () => {
  const [showOtpInputs, setShowOtpInputs] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const otpRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="container mt-5">
      {/* زرار فتح الـ Popup */}
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#phoneOtpModal"
      >
      login
      </button>

      {/* الـ Modal */}
      <div
        className="modal fade"
        id="phoneOtpModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title">Phone Verification</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              {/* فورم رقم الموبايل */}
              {!showOtpInputs ? (
                <>
                  <label className="mb-2">Enter your phone number:</label>
                  <div className="d-flex gap-2 mb-3">
                    <select
                      className="form-select"
                      style={{ maxWidth: "120px" }}
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
                  <button
                    className="btn btn-success w-100"
                    onClick={() => setShowOtpInputs(true)}
                  >
                    Continue
                  </button>
                   {/* زر التسجيل بجوجل */}
      <button
        className="btn btn-outline-dark w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
        onClick={() => {
          // هنا هتحطي تسجيل الدخول بجوجل
          console.log("Google Sign-In clicked");
        }}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          width="20"
          height="20"
        />
        Continue with Google
      </button>
                </>
              ) : (
                <>
                  <p className="mb-3">
                    Please enter the 6-digit code sent to:{" "}
                    <strong>
                      {countryCode} {phoneNumber}
                    </strong>
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
                        onChange={(e) =>
                          handleOtpChange(e.target.value, index)
                        }
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        ref={(el) => (otpRefs.current[index] = el)}
                      />
                    ))}
                  </div>
                  <button className="btn btn-primary w-100">
                    Verify OTP
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneOtpComponent;
