import React from "react";
import { useState } from "react";
import { render } from "react-dom";

function ForgotPasswordModal() {
  const [step, setStep] = useState(1); // initialize to one as step begins at 1
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  // handles progression of the forgot password process
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmitEmail = () => {
    // Send an email with a verification code to the provided email address
    handleNextStep();
  };

  const handleSubmitVerificationCode = () => {
    // Verify the submitted verification code
    handleNextStep();
  };

  const handleSubmitNewPassword = () => {
    // Update the user's password
    // If the password reset is successful, set the resetSuccess state to true.
    // Otherwise, handle any error scenarios.
    // Assuming the reset password is successful
    setResetSuccess(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Langkah 1: Sahkan Emel Kakitangan Anfa</h2>
            <input
              type="email"
              placeholder="Emel kakitangan"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubmitEmail}>Seterusnya</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Langkah 2: Masukkan Kod Pengesahan</h2>
            <input
              type="text"
              placeholder="Kod Pengesahan"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button onClick={handleSubmitVerificationCode}>Seterusnya</button>
            <button onClick={handlePreviousStep}>Kembali</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Langkah 3: Tetap Kata Laluan Baharu</h2>
            <input
              type="password"
              placeholder="Kata Laluan Baharu"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleSubmitNewPassword}>Tetap Kata Laluan</button>
            <button onClick={handlePreviousStep}>Kembali</button>
          </div>
        );
      case 4:
        return (
          <div>
            <h2>Tetapan Kata Laluan Baharu Berjaya</h2>
            <p>
              Kata laluan anda telah diset semula. Sila cuba log masuk ke sistem
              sekali lagi
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="forgotPasswordModal">
      {resetSuccess ? renderStep() : <div>{renderStep}</div>}
    </div>
  );
}

export default ForgotPasswordModal;
