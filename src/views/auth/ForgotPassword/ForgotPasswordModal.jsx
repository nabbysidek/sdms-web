import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../../assets/styles/styles_modal.css";

function ForgotPasswordModal({ onClose }) {
  const [step, setStep] = useState(1); // initialize to one as step begins at 1
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const [resetSuccess, setResetSuccess] = useState(false);

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
    // setResetSuccess(true);

    handleNextStep();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {step === 1 && "Verify Your Email"}
          {step === 2 && "Change Your Password"}
          {step === 3 && "Password Successfully Changed"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <div>
            <p>
              Enter your email address
            </p>
            <input
              type="email"
              className="forgot-password-input"
              placeholder="Your staff email . . ."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="forgot-password-btn btn-primary"
              onClick={handleSubmitEmail}
            >
              Submit
            </Button>
          </div>
        )}


        {step === 2 && (
          <div>
            <p>Change your password</p>
            <input
              type="password"
              className="forgot-password-input"
              placeholder="Change Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              className="forgot-password-btn btn-primary"
              onClick={handleSubmitNewPassword}
            >
              Change
            </Button>
            <Button
              className="forgot-password-btn btn-secondary"
              onClick={handlePreviousStep}
            >
              Back
            </Button>
          </div>
        )}

        {step === 3 && (
          <div>
            <p>
              Your password has been changed. Try signing in once more.
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ForgotPasswordModal;
