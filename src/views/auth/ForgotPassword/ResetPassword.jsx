import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "../../../assets/styles/styles_modal.css";

export default function ResetPassword({ onClose, onSubmit }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reset Your Password</Modal.Title>
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
                <Form.Label>New Password</Form.Label>
                <Controller
                  name="password_user"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "New password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                      message:
                        "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special symbol",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      type="password"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter your new password"
                      autoFocus
                    />
                  )}
                />
                {errors.password_user && (
                  <p className="text-danger">{errors.password_user.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-3">
            <Button type="submit" variant="primary">
              Reset Password
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
