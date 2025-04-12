import React, { useState, useRef } from "react";

const OtpModal = ({ modalId }) => {
  const [otp, setOtp] = useState("");
  const otpInputs = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    setOtp((prevOtp) => {
      const otpArray = [...prevOtp];
      otpArray[index] = value;
      return otpArray.join("");
    });

    if (value.length === 1 && otpInputs.current[index + 1]) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otpInputs.current[index].value && otpInputs.current[index - 1]) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    // submit OTP or do something else
    const otpValue = otp;
    console.log("OTP submitted:", otpValue);
    // Hide the modal after submission
    const otpModal = new window.bootstrap.Modal(document.getElementById(modalId));
    otpModal.hide();
  };

  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="otpModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="otpModalLabel">Enter OTP</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-between">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className="form-control text-center"
                  value={otp[index] || ""}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                />
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Verify OTP</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
