import { useState } from "react";
import { useForm, useController } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ForgotPasswordModal from "./ForgotPassword/ForgotPasswordModal";
import aimLogo from "../../assets/images/aim-logo.svg";
import "../../assets/styles/styles_auth.css";
import { useNavigate } from "react-router-dom";
import axiosCustom from "../../axios";


// NEW
const ControlledInput = ({ name, label, control, rules, type, placeholder, togglePassword, handleToggle }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });
  return (
    <Form.Group controlId={name} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control
          type={type}
          style={{ borderRadius: '0px' }}
          {...field}
          isInvalid={!!error}
          placeholder={placeholder}
        />
        {togglePassword && (
          <InputGroup.Text onClick={handleToggle} style={{ cursor: 'pointer' }}>
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

  // Form validation and submission
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm();

  // const [staffId,setstaffId]= useState("");
  // const [staffPassword,setstaffPassword]= useState("");

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
        console.log(response.data);
      }
    } catch (error) {
      console.log(error); // Error related to API response or client side
    }
  };

  return (
    <div className="pg-container">
      <Form
        className="signin-container form-container"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <div className="form-header">
          <img className="aim-logo" src={aimLogo} alt="aim-logo" />
          <h1>Sistem Jabatan Audit Dalaman</h1>
          <p>Masukkan maklumat log masuk anda</p>
        </div>

        {/*  NEW */}
        <ControlledInput
          name="idAuditor"
          label="Id Kakitangan"
          control={control}
          rules={{ required: "ID kakitangan diperlukan" }}
          type="text"
          placeholder="ID kakitangan anda"
        />

        <ControlledInput
          name="kataLaluanAuditor"
          label="Kata Laluan"
          control={control}
          rules={{
            required: "Kata laluan diperlukan",
            minLength: {
              value: 8,
              message: "Minima 8 karakter",
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\$@\$!%*?&])[A-Za-z\d\$@\$!%*?&]{8,}$/,
              message:
                "Kata laluan mesti mengandungi sekurang-kurangnya satu huruf, satu nombor, dan satu simbol khas",
            },
          }}
          type={showPassword ? "text" : "password"}
          placeholder="Kata laluan anda"
          togglePassword
          handleToggle={() => setShowPassword(!showPassword)}
        />

        {/* <Form.Group controlId="idAuditor" className="mb-3">
          <Form.Label className="form-label">Id Kakitangan</Form.Label>
          <Form.Control
            type="text"
            {...register("idAuditor", { required: true })}
            aria-invalid={errors.idAuditor ? "true" : "false"}
            placeholder="ID kakitangan anda"
            onChange={(e) => setstaffId(e.target.value)}
          />
          {errors.idAuditor?.type === "required" && (
            <p role="alert" className="error-message">
              ID kakitangan diperlukan
            </p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="kataLaluanAuditor">
          <Form.Label className="form-label">Kata Laluan</Form.Label>
          <Form.Control
            type="password"
            {...register("kataLaluanAuditor", { required: true, minLength: 8 })}
            aria-invalid={errors.kataLaluanAuditor ? "true" : "false"}
            placeholder="Kata laluan anda"
            onChange={(e) => setstaffPassword(e.target.value)}
          />
          {errors.kataLaluanAuditor?.type === "required" && (
            <p role="alert" className="error-message">
              Kata laluan diperlukan
            </p>
          )}
          {errors.kataLaluanAuditor?.type === "minLength" && (
            <p role="alert" className="error-message">
              Minima 8 karakter
            </p>
          )}
        </Form.Group> */}

        <div className="forgot-password">
          <Link to="" className="auth-link" onClick={openModal}>
            Lupa Kata Laluan?
          </Link>
          {showModal && <ForgotPasswordModal onClose={closeModal} />}
        </div>

        <Button className="auth-btn" type="submit">
          {" "}
          Log Masuk{" "}
        </Button>

        <div className="create-acc">
          <p>
            Bagi pengguna baru, sila{" "}
            {
              <Link to="/signup" className="auth-link">
                tekan di sini
              </Link>
            }
          </p>
        </div>
      </Form>
    </div>
  );
}

export default SignIn;
