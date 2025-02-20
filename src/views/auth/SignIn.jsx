import { useState } from "react";
import { useForm, useController } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Index from "./ForgotPassword/Index";
import "../../assets/styles/styles_auth.css";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

/**
 * Custom controlled input component for form fields.
 * Uses react-hook-form's `useController` for state management.
 */
const ControlledInput = ({
  name,
  label,
  control,
  rules,
  type,
  placeholder,
  togglePassword,
  handleToggle,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  // Custom styling for specific fields
  const inputStyle =
    name === "id_user"
      ? { borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }
      : {};

  return (
    <Form.Group controlId={name} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control
          type={type}
          {...field}
          isInvalid={!!error}
          placeholder={placeholder}
          style={inputStyle}
        />
        {/* Password visibility toggle button */}
        {togglePassword && (
          <InputGroup.Text
            onClick={handleToggle}
            style={{ cursor: "pointer", borderRadius: "0 5px 5px 0" }}
          >
            {type === "password" ? <FaEye /> : <FaEyeSlash />}
          </InputGroup.Text>
        )}
        <Form.Control.Feedback type="invalid">
          {error?.message}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

function SignIn() {
  // -------------------- Frontend State ---------------------------
  const [showModal, setShowModal] = useState(false); // Controls forgot password modal visibility
  const [showPassword, setShowPassword] = useState(false); // Toggles password visibility

  // React Router navigation hook
  const navigate = useNavigate();

  // react-hook-form's control and submit handler
  const { control, handleSubmit } = useForm();

  /**
   * Handles form submission for user sign-in.
   * Sends user credentials to the backend and navigates on success.
   */
  const handleSignIn = async (signInInput) => {
    try {
      const response = await axiosCustom.post(`/auth/sign-in`, signInInput);

      if (response.status === 200) {
        // Store token for authentication
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle API errors with a friendly alert
      Swal.fire({
        icon: "error",
        title: "Invalid login attempt. Try again.",
        text: error?.response?.data?.error || "Something went wrong!",
      });
    }
  };

  return (
    <div className="pg-container">
      <Form
        className="signin-container form-container"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <div className="form-header">
          <h1>
            Sign in to <span className="span-form-header">SDMS</span>
          </h1>
        </div>

        {/* Staff ID Input Field */}
        <ControlledInput
          name="id_user"
          label="Staff ID"
          control={control}
          rules={{ required: "Your staff ID is required" }}
          type="text"
          placeholder="Your staff ID . . ."
        />

        {/* Password Input Field */}
        <ControlledInput
          name="password_user"
          label="Password"
          control={control}
          rules={{
            required: "Your password is required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters required",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.])[A-Za-z\d@$!%*?&\.]{8,}$/,
              message:
                "Password must contain at least one alphabet, one number, and one special character",
            },
          }}
          type={showPassword ? "text" : "password"}
          placeholder="Your password . . ."
          togglePassword
          handleToggle={() => setShowPassword(!showPassword)}
        />

        {/* Forgot Password Modal */}
        <div className="forgot-password">
          <Link to="" className="auth-link" onClick={() => setShowModal(true)}>
            Forgot password?
          </Link>
          {showModal && <Index onClose={() => setShowModal(false)} />}
        </div>

        {/* Sign In Button */}
        <Button className="auth-btn" type="submit">
          Sign in
        </Button>

        {/* Redirect to Sign-up Page */}
        <div className="create-acc">
          <p>
            Sign up{" "}
            <Link to="/sign-up" className="auth-link">
              here.
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default SignIn;
