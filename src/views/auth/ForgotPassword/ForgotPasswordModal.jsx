import React from "react";
import { useState } from "react";
// import { render } from "react-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./ForgotPasswordModal.css";

function ForgotPasswordModal({ onClose }) {
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

    handleNextStep();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modalHeader">
          {step === 1 && "Sahkan Emel Kakitangan Anda"}
          {step === 2 && "Masukkan Kod Pengesahan"}
          {step === 3 && "Set Kata Laluan Baharu"}
          {step === 4 && "Kata Laluan Baharu Berjaya Diset"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <div>
            <p>
              Sila berikan kami e-mel kakitangan anda untuk tujuan pengesahan.
            </p>
            <input
              type="email"
              placeholder="Emel kakitangan"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="forgotPasswordBtn buttonPrimary"
              variant="primary"
              onClick={handleSubmitEmail}
            >
              Seterusnya
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p>
              E-mel dengan kod pengesahan baru sahaja dihantar ke e-mel
              kakitangan yang anda berikan. Sila masukkan kod di sini.
            </p>
            <input
              type="text"
              placeholder="Kod Pengesahan"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button
              className="forgotPasswordBtn buttonPrimary"
              variant="primary"
              onClick={handleSubmitVerificationCode}
            >
              Seterusnya
            </Button>
            <Button
              className="forgotPasswordBtn buttonSecondary"
              variant="secondary"
              onClick={handlePreviousStep}
            >
              Kembali
            </Button>
          </div>
        )}

        {step === 3 && (
          <div>
            <p>Sila tetapkan kata laluan baharu anda</p>
            <input
              type="password"
              placeholder="Kata Laluan Baharu"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              className="forgotPasswordBtn buttonPrimary"
              variant="primary"
              onClick={handleSubmitNewPassword}
            >
              Seterusnya
            </Button>
            <Button
              className="forgotPasswordBtn buttonSecondary"
              variant="secondary"
              onClick={handlePreviousStep}
            >
              Kembali
            </Button>
          </div>
        )}

        {step === 4 && (
          <div>
            <p>
              Kata laluan anda telah diset semula. Sila cuba log masuk ke sistem
              sekali lagi
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ForgotPasswordModal;
