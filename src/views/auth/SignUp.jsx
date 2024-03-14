import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Col, Row, Button, Alert } from "react-bootstrap";
import aimLogo from "../../assets/images/aim-logo.svg";
import "../../assets/styles/styles_auth.css";
import axios from "axios";

function SignUp() {
  // ------------------- FE ---------------------
  // Form validation and submission
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  // ------------------- BE ---------------------
  // Sign up user
  const handleSignUp = async (signUpInput) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/auth/sign-up`,
        signUpInput,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
        console.log('Berjaya register');
      } else {
        console.log('Unexpected response status:', response.status);
        console.log('Response data:', response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log('Server response status:', error.response.status);
        console.log('Server response data:', error.response.data);
      }
      console.log('Error:', error);
    }
  };
  
  return (
    <div className="pg-container">
      <Form
        className="signup-form-container form-container"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <div className="form-header">
          <img className="aim-logo" src={aimLogo} alt="aim-logo" />
          <p>Isi ruangan di bawah untuk bina akaun baharu</p>
        </div>

        <div>
          <Form.Group className="mb-3" controlId="namaAuditor">
            <Form.Label className="form-label">Nama Kakitangan</Form.Label>
            <Form.Control
              type="text"
              {...register("namaAuditor", { required: true })}
              aria-invalid={errors.namaAuditor ? "true" : "false"}
              placeholder="Nama anda"
            />
            {errors.namaAuditor?.type === "required" && (
              <p role="alert" className="error-message">
                Nama anda diperlukan
              </p>
            )}
          </Form.Group>

          <div>
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="idAuditor">
                  <Form.Label className="form-label">Id Kakitangan</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("idAuditor", {
                      required: true,
                    })}
                    aria-invalid={errors.idAuditor ? "true" : "false"}
                    placeholder="ID kakitangan anda"
                  />
                  {errors.idAuditor?.type === "required" && (
                    <p role="alert" className="error-message">
                      ID kakitangan diperlukan
                    </p>
                  )}
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="emelAuditor">
                  <Form.Label className="form-label">
                    Emel Kakitangan
                  </Form.Label>
                  <Form.Control
                    type="email"
                    {...register("emelAuditor", {
                      required: true,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Emel tidak sah.",
                      },
                    })}
                    aria-invalid={errors.emelAuditor ? "true" : "false"}
                    placeholder="Emel kakitangan anda"
                  />
                  {errors.emelAuditor && (
                    <p role="alert" className="error-message">
                      {errors.emelAuditor.message}
                    </p>
                  )}
                  {errors.emelAuditor?.type === "required" && (
                    <p role="alert" className="error-message">
                      Emel kakitangan diperlukan
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
                  <Form.Label className="form-label">Kata Laluan</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("kataLaluanAuditor", {
                      required: true,
                      minLength: 8,
                    })}
                    aria-invalid={errors.kataLaluanAuditor ? "true" : "false"}
                    placeholder="Kata laluan anda"
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
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="kataLaluanAuditor_confirmation">
                  <Form.Label className="form-label">
                    Ulang Kata Laluan
                  </Form.Label>
                  <Form.Control
                    type="password"
                    {...register("kataLaluanAuditor_confirmation", {
                      required: true,
                      validate: (value) =>
                        value === watch("kataLaluanAuditor") ||
                        "Kata laluan tidak padan",
                    })}
                    aria-invalid={
                      errors.kataLaluanAuditor_confirmation ? "true" : "false"
                    }
                    placeholder="Kata laluan anda"
                  />
                  {errors.kataLaluanAuditor_confirmation?.type === "required" && (
                    <p role="alert" className="error-message">
                      Kata laluan diperlukan
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
            {" "}
            Mohon Akses{" "}
          </Button>
        </div>

        <div className="create-acc">
          <p>
            Jika ingin log masuk semula{" "}
            {
              <Link to="/" className="auth-link">
                tekan di sini
              </Link>
            }
          </p>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
