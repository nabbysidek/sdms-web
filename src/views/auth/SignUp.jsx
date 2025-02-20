import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Col, Row, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../assets/styles/styles_auth.css";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function SignUp() {
  // React Hook Form setup for validation and form handling
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  // State for toggling password visibility
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Toggle password visibility
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);

  // Function to handle sign-up form submission
  const handleSignUp = async (signUpInput) => {
    try {
      const response = await axiosCustom.post("auth/sign-up", signUpInput, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      // Show success message when sign-up request is successful
      Swal.fire({
        icon: "success",
        title:
          "Sign-up application received. Sign in once given authorization.",
        text: response.data.success,
      });
    } catch (error) {
      // Show error message when sign-up request fails
      Swal.fire({
        icon: "error",
        title: "Sign-up application not received. Try again.",
        text: error.response?.data?.error || "An error occurred.",
      });
    }
  };

  return (
    <div className="pg-container">
      {/* Sign-up Form */}
      <Form
        className="signup-form-container form-container"
        onSubmit={handleSubmit(handleSignUp)}
      >
        {/* Form Header */}
        <div className="form-header">
          <h1>
            Sign up to <span className="span-form-header">SDMS</span>
          </h1>
        </div>

        {/* Name Input */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name..."
            {...register("name", { required: "A name is required" })}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Staff ID & Email Inputs */}
        <Row>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="userId">
              <Form.Label>Your Staff ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your staff ID"
                {...register("userId", {
                  required: "Your staff ID is required",
                })}
                isInvalid={!!errors.userId}
              />
              <Form.Control.Feedback type="invalid">
                {errors.userId?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={6}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Your Staff Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your work email..."
                {...register("email", {
                  required: "Your email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email is not valid",
                  },
                })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Password & Confirm Password Inputs */}
        <Row>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Your password..."
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters required",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\$@\$!%*?&])[A-Za-z\d\$@\$!%*?&]{8,}$/,
                      message:
                        "Must include uppercase, number, and special character",
                    },
                  })}
                  isInvalid={!!errors.password}
                />
                {/* Button to toggle password visibility */}
                <Button
                  variant="outline-secondary"
                  onClick={toggleShowNewPassword}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col xs={6}>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repeat your password..."
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <Button className="auth-btn" type="submit">
          Request Access
        </Button>

        {/* Link to Return to Sign-in Page */}
        <div className="create-acc">
          <p>
            <Link to="/" className="auth-link">
              Return to sign-in page
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
