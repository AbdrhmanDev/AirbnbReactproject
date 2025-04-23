import { auth, RecaptchaVerifier } from "./firbase";
import { signInWithPhoneNumber, signOut } from "firebase/auth";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";

// إعداد الريكابتشا
export const setupRecaptcha = (handleSendOTP) => {
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

// إرسال OTP
export const handleSendOTP = (countryCode, phoneNumber, setShowOtpInputs, setConfirmationResult) => {
  const fullPhone = countryCode + phoneNumber;
  if (!/^\d+$/.test(phoneNumber)) {
    alert("Please enter a valid phone number.");
    return;
  }

  setupRecaptcha(() => handleSendOTP(countryCode, phoneNumber, setShowOtpInputs, setConfirmationResult));
  const appVerifier = window.recaptchaVerifier;

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

// التحقق من OTP
export const handleVerifyOTP = (otp, confirmationResult, setIsLoggedIn, setShowOtpInputs, setOtp, modalRef) => {
  const code = otp.join("");
  if (!confirmationResult) return alert("No OTP sent yet!");
  if (code.length !== 6) {
    alert("Please enter a valid 6-digit OTP.");
    return;
  }

  confirmationResult.confirm(code)
    .then((result) => {
      console.log("Phone number verified!", result.user);
      alert("Phone number verified successfully!");
      setIsLoggedIn(true);
      setShowOtpInputs(false);
      setOtp(Array(6).fill(""));
      const modalEl = document.getElementById("phoneOtpModal");
      if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalInstance?.hide();
      }
  
      // document.body.style.overflow = 'auto';

    })
    .catch((error) => {
      console.error("Invalid OTP:", error);
      alert("Invalid OTP. Please try again.");
    });
};

// عند كتابة أرقام OTP
export const handleOtpChange = (value, index, otp, setOtp, otpRefs) => {
  if (!/^\d?$/.test(value)) return;
  const updatedOtp = [...otp];
  updatedOtp[index] = value;
  setOtp(updatedOtp);
  if (value && index < 5) otpRefs.current[index + 1].focus();
};

// التعامل مع مفتاح Backspace
export const handleOtpKeyDown = (e, index, otp, otpRefs) => {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
    otpRefs.current[index - 1].focus();
  }
};

// تسجيل الخروج
export const handleLogout = (googleCredential, setGoogleCredential, setIsLoggedIn) => {
  localStorage.removeItem("authToken");
  if (googleCredential) {
    window.google.accounts.id.revoke(googleCredential, () => {
      console.log("Google logout successful");
      setGoogleCredential(null);
      setIsLoggedIn(false);
      alert("Logged out successfully!");
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

// تسجيل الدخول بجوجل
export const handleGoogleLoginSuccess = async (response, setIsLoggedIn, modalRef, setGoogleCredential) => {
  console.log("Google login successful:", response);

  try {
    const res = await fetch('http://localhost:3000/users/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: response.credential
      }),
    });

    const data = await res.json();

    if (data.success) {
      console.log('✅ User verified by server:', data.user);
      alert(`Welcome ${data.user.name}!`);
      localStorage.setItem('authToken', data.token);
      console.log(data.token);

      setIsLoggedIn(true);
      const modalEl = document.getElementById("phoneOtpModal");
      if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalInstance?.hide();
      }
      setGoogleCredential(response.credential);
    } else {
      alert('Login failed on server.');
    }
  } catch (error) {
    console.error('Error verifying token on server:', error);
    alert('An error occurred, please try again.');
  }
};

// في حالة فشل جوجل
export const handleGoogleLoginError = () => {
  console.log("Google login failed");
  alert("Google login failed. Please try again.");
};
