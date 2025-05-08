import { auth, RecaptchaVerifier } from "./firbase";
import { signInWithPhoneNumber, signOut } from "firebase/auth";
import Swal from "sweetalert2";
// إعداد الريكابتشا
export const setupRecaptcha = (handleSendOTP) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size:"invisible",
        callback: () => {
          console.log("reCAPTCHA verified");
          handleSendOTP();
        },
      }
    );
  }
};
// إرسال OTP
export const handleSendOTP = (
  countryCode,
  phoneNumber,
  setShowOtpInputs,
  setConfirmationResult
) => {
  const fullPhone = countryCode + phoneNumber;
  if (!/^\d+$/.test(phoneNumber)) {
    alert("Please enter a valid phone number.");
    return;
  }

  setupRecaptcha(() =>
    handleSendOTP(
      countryCode,
      phoneNumber,
      setShowOtpInputs,
      setConfirmationResult
    )
  );
  const appVerifier = window.recaptchaVerifier;
// ← هنا نستخدم الريكابتشا
  signInWithPhoneNumber(auth, fullPhone, appVerifier)
    .then((confirmation) => {
      setConfirmationResult(confirmation);
      console.log("this is confirmation:", JSON.stringify(confirmation));
      setShowOtpInputs(true);
      console.log("OTP sent successfully.");
    })
    .catch((error) => {
      console.error("Error sending OTP:", error);
      let errorMessage = "Failed to send OTP. Please try again.";
      if (error.code === "auth/invalid-phone-number") {
        errorMessage =
          "The phone number is invalid. Please check and try again.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many requests. Please try again later.";
      }
      alert(errorMessage);
    });
};
// إرسال OTP
export const handleVerifyOTP = (
  otp,
  confirmationResult,
  setIsLoggedIn,
  setShowOtpInputs,
  setOtp,
  modalRef
) => {
  const code = otp.join("");
  if (!confirmationResult) return alert("No OTP sent yet!");
  if (code.length !== 6) {
    alert("Please enter a valid 6-digit OTP.");
    return;
  }

  confirmationResult
    .confirm(code)
    .then(async (result) => {
      console.log("Phone number verified!", result.user);

      // 👇 الحصول على توكن المستخدم من Firebase
      const idToken = await result.user.getIdToken(); // ← هنا نأخذ التوكن الحقيقي
      localStorage.setItem("authToken", idToken); // ← نحفظ التوكن
      window.dispatchEvent(new Event("storage")); // ← إرسال إشعار للتغيير
      Swal.fire({
        text: ' Welcome , Glad to have you here 😊',
        icon: 'success',
        confirmButtonText: 'Thanks!'
      });
      setIsLoggedIn(true);
      setShowOtpInputs(false);
      setOtp(Array(6).fill(""));
      modalRef.current?.classList.remove("show");
      document.body.style.overflow = "auto";
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
export const handleLogout = (
  googleCredential,
  setGoogleCredential,
  setIsLoggedIn
) => {
  localStorage.removeItem("authToken"); // ← حذف التوكن
  localStorage.removeItem("Emailtoken");

  window.dispatchEvent(new Event("storage"));
  if (googleCredential) {
    window.google.accounts.id.revoke(googleCredential, () => {
      console.log("Google logout successful");
      setGoogleCredential(null);
      setIsLoggedIn(false);
      Swal.fire({
        text: "logged in sucseefuly 😊",
        icon: "success",
        confirmButtonText: "Thanks!",
      });
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
export const handleGoogleLoginSuccess = async (
  response,
  setIsLoggedIn,
  modalRef,
  setGoogleCredential,
  setUserData
) => {
  console.log("Google login successful:", response);

  try {
    const res = await fetch("http://localhost:3000/users/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: response.credential,
      }),
    });

    const data = await res.json();

    if (data.success) {
      console.log("✅ User verified by server:", data.user);
  
      Swal.fire({
        title: `Welcome  ${data.user.name}!`,
        text: 'Glad to have you here 😊',
        icon: 'success',
        confirmButtonText: 'Thanks!'
      });
      // حفظ التوكن في localStorage
      localStorage.setItem("authToken", data.token);
      window.dispatchEvent(new Event("storage"));

      localStorage.setItem("userData", JSON.stringify(data.user));
// ← حفظ بيانات المستخدم
      setIsLoggedIn(true);
      setGoogleCredential(response.credential);
      setUserData(data.user);
      modalRef.current?.classList.remove("show");
      document.body.style.overflow = "auto";
    } else {
      alert("Login failed on server.");
    }
  } catch (error) {
    console.error("Error verifying token on server:", error);
    alert("An error occurred, please try again.");
  }
};

// في حالة فشل جوجل
export const handleGoogleLoginError = () => {
  console.log("Google login failed");
  alert("Google login failed. Please try again.");
};
