import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Col, Row, Button } from "react-bootstrap";
import aimLogo from "../../assets/images/aim-logo.svg";
import "../../assets/styles/styles_auth.css";

function SignUp() {
  // ------------------- FE ---------------------
  // Form validation and submission
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  // Validate to require an input for each field
  const validation = {
    required: true,
  };

  const onSubmit = (data) => console.log(data);

  return (
    <div className="pg-container">
      <Form
        className="signup-form-container form-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-header">
          <img className="aim-logo" src={aimLogo} alt="aim-logo" />
          <p>Isi ruangan di bawah untuk bina akaun baharu</p>
        </div>

        <div>
          <Form.Group className="mb-3" controlId="staffName">
            <Form.Label className="form-label">Nama Kakitangan</Form.Label>
            <Form.Control
              type="text"
              {...register("staffName", { validation })}
              aria-invalid={errors.staffName ? "true" : "false"}
              placeholder="Nama anda"
            />
            {errors.staffName?.type === "required" && (
              <p role="alert" className="error-message">
                Nama anda diperlukan
              </p>
            )}
          </Form.Group>

          <div>
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="staffId">
                  <Form.Label className="form-label">Id Kakitangan</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("staffId", {
                      validation,
                    })}
                    aria-invalid={errors.staffId ? "true" : "false"}
                    placeholder="ID kakitangan anda"
                  />
                  {errors.staffId?.type === "required" && (
                    <p role="alert" className="error-message">
                      ID kakitangan diperlukan
                    </p>
                  )}
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="staffEmail">
                  <Form.Label className="form-label">
                    Emel Kakitangan
                  </Form.Label>
                  <Form.Control
                    type="email"
                    {...register("staffEmail", {
                      validation,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Emel tidak sah.",
                      },
                    })}
                    aria-invalid={errors.staffEmail ? "true" : "false"}
                    placeholder="Emel kakitangan anda"
                  />
                  {errors.staffEmail && (
                    <p role="alert" className="error-message">
                      {errors.staffEmail.message}
                    </p>
                  )}
                  {errors.staffEmail?.type === "required" && (
                    <p role="alert" className="error-message">
                      Emel kakitangan diperlukan
                    </p>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div>
            <Row>
              <Col xs={6}>
                <Form.Group controlId="staffPassword">
                  <Form.Label className="form-label">Kata Laluan</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("staffPassword", {
                      validation,
                      minLength: 8,
                    })}
                    aria-invalid={errors.staffPassword ? "true" : "false"}
                    placeholder="Kata laluan anda"
                  />
                  {errors.staffPassword?.type === "required" && (
                    <p role="alert" className="error-message">
                      Kata laluan diperlukan
                    </p>
                  )}
                  {errors.staffPassword?.type === "minLength" && (
                    <p role="alert" className="error-message">
                      Minima 8 karakter
                    </p>
                  )}
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="staffConfirmPassword">
                  <Form.Label className="form-label">
                    Ulang Kata Laluan
                  </Form.Label>
                  <Form.Control
                    type="password"
                    {...register("staffConfirmPassword", {
                      validation,
                      validate: (value) =>
                        value === watch("staffPassword") ||
                        "Kata laluan tidak padan",
                    })}
                    aria-invalid={
                      errors.staffConfirmPassword ? "true" : "false"
                    }
                    placeholder="Kata laluan anda"
                  />
                  {errors.staffConfirmPassword?.type === "required" && (
                    <p role="alert" className="error-message">
                      Kata laluan diperlukan
                    </p>
                  )}
                  {errors.staffConfirmPassword && (
                    <p role="alert" className="error-message">
                      {errors.staffConfirmPassword.message}
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
