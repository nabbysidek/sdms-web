import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export default function VerifyEmail({ onClose, onSubmit }) {
  // Initialize form handling with react-hook-form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Verify Your Staff Email</Modal.Title>
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
                <Form.Label>Staff Email</Form.Label>
                <Controller
                  name="staffEmail"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Staff email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Basic email validation
                      message: "Please enter a valid email address",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type="email"
                      {...field}
                      placeholder="Enter the staff email used when requesting access"
                      autoFocus
                    />
                  )}
                />
                {/* Display validation errors */}
                {errors.staffEmail && (
                  <p className="text-danger">{errors.staffEmail.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-3">
            <Button type="submit" variant="primary">
              Verify Email
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
