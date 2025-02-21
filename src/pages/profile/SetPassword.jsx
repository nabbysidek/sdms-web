import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function SetPassword() {
  // React Hook Form setup
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  // State for password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Toggle visibility of password inputs
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowNewPassword = () => setShowNewPassword((prev) => !prev);

  // Handle password update
  const handleUpdatePassword = async (data) => {
    try {
      const response = await axiosCustom.put("set-kata-laluan", data);

      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success || "Password updated successfully.",
        });
        reset(); // Reset form after successful submission
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: response.data.error || "An error occurred, please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.error || "An error occurred, please try again.",
      });
    }
  };

  return (
    <Container fluid className="tabs-container">
      <Form onSubmit={handleSubmit(handleUpdatePassword)}>
        {/* Current Password Field */}
        <Form.Group controlId="password_user">
          <Form.Label className="form-label">Current Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              {...register("password_user", {
                required: "Current password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\$@\$!%*?&])[A-Za-z\d\$@\$!%*?&]{8,}$/,
                  message: "Must contain at least one letter, number, and special character",
                },
              })}
              aria-invalid={errors.password_user ? "true" : "false"}
              placeholder="Enter your current password..."
            />
            <Button variant="outline-secondary" onClick={toggleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
          {errors.password_user && <p className="error-message">{errors.password_user.message}</p>}
        </Form.Group>

        {/* New Password Field */}
        <Form.Group controlId="new_password_user">
          <Form.Label className="form-label">New Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showNewPassword ? "text" : "password"}
              {...register("new_password_user", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\$@\$!%*?&])[A-Za-z\d\$@\$!%*?&]{8,}$/,
                  message: "Must contain at least one letter, number, and special character",
                },
              })}
              aria-invalid={errors.new_password_user ? "true" : "false"}
              placeholder="Enter your new password..."
            />
            <Button variant="outline-secondary" onClick={toggleShowNewPassword}>
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
          {errors.new_password_user && <p className="error-message">{errors.new_password_user.message}</p>}
        </Form.Group>

        {/* Confirm New Password Field */}
        <Form.Group controlId="new_password_confirmation">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            {...register("new_password_confirmation", {
              required: "Password confirmation is required",
              validate: (value) =>
                value === watch("new_password_user") || "Passwords do not match",
            })}
            aria-invalid={errors.new_password_confirmation ? "true" : "false"}
            placeholder="Confirm your new password..."
          />
          {errors.new_password_confirmation && (
            <p className="error-message">{errors.new_password_confirmation.message}</p>
          )}
        </Form.Group>

        {/* Submit Button */}
        <Button className="set-password-btn" type="submit">
          Set New Password
        </Button>
      </Form>
    </Container>
  );
}

export default SetPassword;
