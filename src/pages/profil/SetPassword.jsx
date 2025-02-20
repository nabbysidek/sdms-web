import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function SetPassword() {
  // ------------------- FE ---------------------
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Toggle password visibility
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);

  // ------------------- BE ---------------------
  // Edit password
  const handleUpdatePassword = async (setPasswordInput) => {
    try {
      const response = await axiosCustom.put(
        `set-kata-laluan`,
        setPasswordInput
      );

      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: response.data.error,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fail",
        text: error.response.data.error,
      });
    }
  };

  return (
    <Container fluid className="tabs-container">
      <Form onSubmit={handleSubmit(handleUpdatePassword)}>
        <Form.Group controlId="password">
          <Form.Label className="form-label">Current Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Current password required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\$@\$!%*?&])[A-Za-z\d\$@\$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least one alphabet, one number and one special character",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Your current password . . ."
            />
            <Button variant="outline-secondary" onClick={toggleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
          {errors.password && (
            <p role="alert" className="error-message">
              {errors.password.message}
            </p>
          )}
        </Form.Group>

        <Form.Group controlId="passwordBaharu">
          <Form.Label className="form-label">New Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showNewPassword ? "text" : "password"}
              {...register("passwordBaharu", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\$@\$!%*?&])[A-Za-z\d\$@\$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least one alphabet, one number and one special character",
                },
              })}
              aria-invalid={errors.passwordBaharu ? "true" : "false"}
              placeholder="Your new password . . ."
            />
            <Button variant="outline-secondary" onClick={toggleShowNewPassword}>
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
          {errors.passwordBaharu && (
            <p role="alert" className="error-message">
              {errors.passwordBaharu.message}
            </p>
          )}
        </Form.Group>

        <Form.Group controlId="passwordBaharu_confirmation">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            {...register("passwordBaharu_confirmation", {
              required: true,
              validate: (value) =>
                value === watch("passwordBaharu") || "Passwords do not match",
            })}
            aria-invalid={errors.passwordBaharu_confirmation ? "true" : "false"}
            placeholder="Confirm new password . . ."
          />
          {errors.passwordBaharu_confirmation?.type === "required" && (
            <p role="alert" className="error-message">
              Password is required
            </p>
          )}
          {errors.passwordBaharu_confirmation && (
            <p role="alert" className="error-message">
              {errors.passwordBaharu_confirmation.message}
            </p>
          )}
        </Form.Group>

        <Button className="set-password-btn" type="submit">
          Set New Password
        </Button>
      </Form>
    </Container>
  );
}

export default SetPassword;
