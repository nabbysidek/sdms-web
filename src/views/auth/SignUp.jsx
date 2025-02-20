import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Col, Row, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../assets/styles/styles_auth.css";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function SignUp() {
  // ------------------- FE ---------------------
  // Form validation and submission
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  // State to manage password visibility
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Toggle password visibility
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);

  // ------------------- BE ---------------------
  // Sign up user
  const handleSignUp = async (signUpInput) => {
    try {
      const response = await axiosCustom.post(
        `auth/sign-up`, 
        signUpInput, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Sign up application received. Sign in once given authorization.",
          text: response.data.success,
        });
      } else {
        console.log("Unexpected response status:", response.status);
        console.log("Response data:", response.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Sign up application not received. Try again.",
        text: error.response.data.error,
      });

      if (error.response) {
        console.log("Server response status:", error.response.status);
        console.log("Server response data:", error.response.data);
      }
      console.log("Error:", error);
    }
  };

  return (
    <div className="pg-container">
      <Form
        className="signup-form-container form-container"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <div className="form-header">
        <h1>Sign up to <span className="span-form-header">SDMS</span></h1>
        </div>

        <div>
          <Form.Group className="mb-3" controlId="namaAuditor">
            <Form.Label className="form-label">Your Name</Form.Label>
            <Form.Control
              type="text"
              {...register("namaAuditor", { required: true })}
              aria-invalid={errors.namaAuditor ? "true" : "false"}
              placeholder="Your name . . ."
            />
            {errors.namaAuditor?.type === "required" && (
              <p role="alert" className="error-message">
                A name is required
              </p>
            )}
          </Form.Group>

          <div>
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="idAuditor">
                  <Form.Label className="form-label">Your Staff ID</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("idAuditor", {
                      required: true,
                    })}
                    aria-invalid={errors.idAuditor ? "true" : "false"}
                    placeholder="Your staff ID"
                  />
                  {errors.idAuditor?.type === "required" && (
                    <p role="alert" className="error-message">
                      Your staff ID is required
                    </p>
                  )}
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="emelAuditor">
                  <Form.Label className="form-label">
                    Your Staff Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    {...register("emelAuditor", {
                      required: true,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email is not valid",
                      },
                    })}
                    aria-invalid={errors.emelAuditor ? "true" : "false"}
                    placeholder="Your work email . . ."
                  />
                  {errors.emelAuditor && (
                    <p role="alert" className="error-message">
                      {errors.emelAuditor.message}
                    </p>
                  )}
                  {errors.emelAuditor?.type === "required" && (
                    <p role="alert" className="error-message">
                      Your email is required
                    </p>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div className="mb-3">
            <Row>
              <Col xs={6}>
                <Form.Group controlId="kataLaluanAuditor">
                  <Form.Label className="form-label">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showNewPassword ? "text" : "password"}
                      {...register("kataLaluanAuditor", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Minimum 8 characters required",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\$@\$!%*?&])[A-Za-z\d\$@\$!%*?&]{8,}$/,
                          message:
                            "Password must contain at least one alphabet, one number and one special character",
                        },
                      })}
                      aria-invalid={errors.kataLaluanAuditor ? "true" : "false"}
                      placeholder="Your password . . ."
                    />
                    <Button
                      className="sign-up-show-password"
                      variant="outline=secondary"
                      onClick={toggleShowNewPassword}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                  {errors.kataLaluanAuditor?.type === "required" && (
                    <p role="alert" className="error-message">
                      Password is required
                    </p>
                  )}
                  {errors.kataLaluanAuditor?.type === "minLength" && (
                    <p role="alert" className="error-message">
                      Minimum 8 characters required
                    </p>
                  )}
                  {errors.kataLaluanAuditor?.type === "pattern" && (
                    <p role="alert" className="error-message">
                      Password must contain at least one alphabet, one number and one special character
                    </p>
                  )}
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="kataLaluanAuditor_confirmation">
                  <Form.Label className="form-label">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    {...register("kataLaluanAuditor_confirmation", {
                      required: true,
                      validate: (value) =>
                        value === watch("kataLaluanAuditor") ||
                        "Password is required",
                    })}
                    aria-invalid={
                      errors.kataLaluanAuditor_confirmation ? "true" : "false"
                    }
                    placeholder="Repeat your password . . ."
                  />
                  {errors.kataLaluanAuditor_confirmation?.type ===
                    "required" && (
                    <p role="alert" className="error-message">
                      Password is required
                    </p>
                  )}
                  {errors.kataLaluanAuditor_confirmation && (
                    <p role="alert" className="error-message">
                      {errors.kataLaluanAuditor_confirmation.message}
                    </p>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </div>

          <Button className="auth-btn" type="submit">
            Request Access
          </Button>
        </div>

        <div className="create-acc">
          <p>
            {
              <Link to="/" className="auth-link">
                Return to sign in page
              </Link>
            }
          </p>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
