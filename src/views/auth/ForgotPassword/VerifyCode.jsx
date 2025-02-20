import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "../../../assets/styles/styles_modal.css";

export default function VerifyCode({ onClose, onSubmit }) {
  // Initialize form handling with react-hook-form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Verify Confirmation Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent unintended form submission
            handleSubmit(onSubmit)(e);
          }}
        >
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Confirmation Code</Form.Label>
                <Controller
                  name="verification_code"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Confirmation code is required",
                    pattern: {
                      value: /^[0-9]{6}$/, // Ensures only a 6-digit numeric code is entered
                      message: "Please enter a valid 6-digit confirmation code",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="text"
                      {...field}
                      placeholder="Enter the confirmation code received in your email"
                      autoFocus
                    />
                  )}
                />
                {/* Display validation errors */}
                {errors.verificationCode && (
                  <p className="text-danger">{errors.verificationCode.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-3">
            <Button type="submit" variant="primary">
              Verify Code
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
