import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Form, Col, Row, Button } from "react-bootstrap";
import styled from "styled-components";
import backgroundImage from "../../assets/aim-background-img.png";
import aimLogo from "../../assets/aim-logo.svg";
import "./Auth.css";

const PageContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function SignUp() {
  // ---------- FE ----------
  // Form validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <PageContainer className="pg-container">
      <Form
        className="signup-form-container form-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* SIGN IN FORM TEXT HEADER */}
        <div className="form-header">
          <img className="aim-logo" src={aimLogo} alt="aim-logo" />
          <h1>Jabatan Audit Dalaman</h1>
          <p>Sila isi ruangan kosong untuk bina akaun baharu</p>
        </div>

        {/* SIGN IN FORM CONTENT */}
        <div>
          <Form.Group className="mb-3" controlId="staffName">
            <Form.Label className="form-label">Nama Kakitangan</Form.Label>
            <Controller
              name="staffName"
              control={control}
              defaultValue=""
              rules={{ required: "Nama penuh kakitangan diperlukan" }}
              render={({ field, fieldState }) => (
                <>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Aina binti Abdul"
                    {...field}
                  />
                  {fieldState.error && (
                    <Form.Text className="text-danger">
                      {fieldState.error.message}
                    </Form.Text>
                  )}
                </>
              )}
            />
          </Form.Group>

          <div>
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="staffId">
                  <Form.Label className="form-label">Id Kakitangan</Form.Label>
                  <Controller
                    name="staffId"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "ID kakitangan diperlukan",
                      pattern: {
                        value: /^[A-Za-z0-9]{5,}$/i,
                        message:
                          "ID kakitangan harus terdiri dari minimal 5 karakter alfanumerik.",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <Form.Control
                          type="text"
                          placeholder="123456"
                          {...field}
                        />
                        {fieldState.error && (
                          <Form.Text className="text-danger">
                            {fieldState.error.message}
                          </Form.Text>
                        )}
                      </>
                    )}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="staffEmail">
                  <Form.Label className="form-label">
                    Emel Kakitangan
                  </Form.Label>
                  <Controller
                    name="staffEmail"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Emel kakitangan diperlukan",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Emel harus dalam format yang sah.",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <Form.Control
                          type="email"
                          placeholder="ainaabdul@aim.gov.my"
                          {...field}
                        />
                        {fieldState.error && (
                          <Form.Text className="text-danger">
                            {fieldState.error.message}
                          </Form.Text>
                        )}
                      </>
                    )}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div>
            <Row>
              <Col xs={6}>
                <Form.Group controlId="staffPassword">
                  <Form.Label className="form-label">Kata Laluan</Form.Label>
                  <Controller
                    name="staffPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Kata laluan diperlukan",
                      minLength: {
                        value: 8,
                        message:
                          "Kata laluan harus terdiri dari minimal 8 karakter.",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <Form.Control
                          type="password"
                          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                          {...field}
                        />
                        {fieldState.error && (
                          <Form.Text className="text-danger">
                            {fieldState.error.message}
                          </Form.Text>
                        )}
                      </>
                    )}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="staffConfirmPassword">
                  <Form.Label className="form-label">
                    Ulang Kata Laluan
                  </Form.Label>
                  <Controller
                    name="staffConfirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Kata laluan diperlukan",
                      minLength: {
                        value: 8,
                        message:
                          "Kata laluan harus terdiri dari minimal 8 karakter.",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <Form.Control
                          type="password"
                          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                          {...field}
                        />
                        {fieldState.error && (
                          <Form.Text className="text-danger">
                            {fieldState.error.message}
                          </Form.Text>
                        )}
                      </>
                    )}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <Button className="auth-btn" type="submit">
            {" "}
            Mohon Akses{" "}
          </Button>
        </div>

        {/* CREATE ACCOUNT CTA */}
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
    </PageContainer>
  );
}

export default SignUp;
