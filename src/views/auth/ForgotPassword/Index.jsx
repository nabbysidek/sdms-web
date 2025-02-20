import React, { useState } from "react";
import VerifyEmail from "./VerifyEmail";
import VerifyCode from "./VerifyCode";
import ResetPassword from "./ResetPassword";
import axiosCustom from "../../../axios";
import Swal from "sweetalert2";

export default function ResetPasswordIndex({ onClose }) {
  // Step state to track the reset password process
  const [step, setStep] = useState("verifyEmail");

  // Store email, reset token, and verification code
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  // Close handler to reset the process and close the modal/dialog
  const handleClose = () => {
    setStep("verifyEmail"); // Reset to initial step
    onClose();
  };

  // Step 1: Handle email submission for password reset
  const handleEmailSubmit = async (data) => {
    try {
      const response = await axiosCustom.post("/auth/forgot-password", {
        email: data.email, // User's email
      });

      setEmail(data.email); // Store email
      setResetToken(response.data.resetToken); // Store reset token

      Swal.fire({
        title: "Berjaya",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "Teruskan",
      });

      setStep("verifyCode"); // Move to the next step
    } catch (error) {
      console.error("Error verifying email:", error.response?.data);
      Swal.fire({
        title: "Gagal",
        text: error.response?.data?.error || "Ralat. Cuba sekali lagi.",
        icon: "error",
      });
    }
  };

  // Step 2: Handle verification code submission
  const handleCodeSubmit = async (data) => {
    try {
      const response = await axiosCustom.post("/auth/verify-reset-code", {
        email: email, // Use stored email
        verificationCode: data.verificationCode, // User input
      });

      Swal.fire({
        title: "Berjaya",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "Teruskan",
      });

      setVerificationCode(data.verificationCode); // Store the verification code
      setStep("resetPassword"); // Move to the reset password step
    } catch (error) {
      console.error("Error verifying code:", error.response?.data);
      Swal.fire({
        title: "Gagal",
        text: error.response?.data?.error || "Ralat. Cuba sekali lagi.",
        icon: "error",
      });
    }
  };

  // Step 3: Handle password reset submission
  const resetPassword = async (data) => {
    try {
      const response = await axiosCustom.post(`/auth/forgot-password-reset`, {
        email: email, // Stored email
        verificationCode, // Stored verification code
        resetToken, // Stored reset token
        passwordBaharu: data.password, // New password input
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title:
            "Kata laluan berjaya diset semula. Log masuk dengan kata laluan baharu.",
          text: response.data.success,
        });
        onClose(); // Close modal/dialog after success
      }
    } catch (error) {
      console.error("Error resetting password:", error.response?.data);
      Swal.fire({
        icon: "error",
        title: "Set semula kata laluan gagal",
        text:
          error.response?.data?.error ||
          "Ralat tidak dijangka. Sila cuba semula.",
      });
    }
  };

  return (
    <>
      {step === "verifyEmail" && (
        <VerifyEmail onClose={handleClose} onSubmit={handleEmailSubmit} />
      )}
      {step === "verifyCode" && (
        <VerifyCode
          onClose={handleClose}
          onSubmit={(data) => handleCodeSubmit({ ...data, email: email })}
        />
      )}
      {step === "resetPassword" && (
        <ResetPassword
          onClose={handleClose}
          onSubmit={(data) => resetPassword({ password: data.password })}
        />
      )}
    </>
  );
}
