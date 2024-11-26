import { useState } from "react";
import { useForm, useController } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ForgotPasswordModal from "./ForgotPassword/ForgotPasswordModal";
import "../../assets/styles/styles_auth.css";
import { useNavigate } from "react-router-dom";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

// NEW
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

  const inputStyle =
    name === "idAuditor"
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
  // -------------------- FE ---------------------------
  // Forgot Password Modal
  const [showModal, setShowModal] = useState(false);
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // -------------------- BE ---------------------------
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm();

  // Sign in user
  const handleSignIn = async (signInInput) => {
    try {
      const response = await axiosCustom.post(`/auth/sign-in`, signInInput);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid login attempt. Try again.",
          text: error.response.data.error,
        });
        console.log(response.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Invalid login attempt. Try again.",
        text: error.response.data.error,
      });
      console.log(error); 
    }
  };

  return (
    <div className="pg-container">
      <Form
        className="signin-container form-container"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <div className="form-header">
          <h1>Sign in to <span className="span-form-header">auditee</span></h1>
          <p>auditee for reputable.org</p>
        </div>

        {/*  NEW */}
        <ControlledInput
          name="idAuditor"
          label="Staff ID"
          control={control}
          rules={{ required: "Your staff ID is required" }}
          type="text"
          placeholder="Your staff ID . . ."
        />

        <ControlledInput
          name="kataLaluanAuditor"
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
                "Password must contain at least one alphabet, one number and one special character",
            },
          }}
          type={showPassword ? "text" : "password"}
          placeholder="Your password . . ."
          togglePassword
          handleToggle={() => setShowPassword(!showPassword)}
        />

        <div className="forgot-password">
          <Link to="" className="auth-link" onClick={openModal}>
            Forgot password?
          </Link>
          {showModal && <ForgotPasswordModal onClose={closeModal} />}
        </div>

        <Button className="auth-btn" type="submit">
          {" "}
          Sign in{" "}
        </Button>

        <div className="create-acc">
          <p>
            Sign up{" "}
            {
              <Link to="/signup" className="auth-link">
                here.
              </Link>
            }
          </p>
        </div>
      </Form>
    </div>
  );
}

export default SignIn;
