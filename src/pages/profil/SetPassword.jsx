import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import axiosCustom from "../../axios";

function SetPassword() {
  // ------------------- FE ---------------------
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  // ------------------- BE ---------------------
  // Edit password
  const handleUpdatePassword = async (setPasswordInput) => {
    try {
      const response = await axiosCustom.put(`set-kata-laluan`, setPasswordInput);

      if (response.status >= 200 && response.status < 300) {
        console.log("Berjaya set password");
      } else {
        console.log("Response data:", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="tabs-container">
      <Form onSubmit={handleSubmit(handleUpdatePassword)}>
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

        <Form.Group controlId="kataLaluanAuditorBaharu">
          <Form.Label className="form-label">Kata Laluan Baharu</Form.Label>
          <Form.Control
            type="password"
            {...register("kataLaluanAuditorBaharu", {
              required: true,
              minLength: 8,
            })}
            aria-invalid={errors.kataLaluanAuditorBaharu ? "true" : "false"}
            placeholder="Kata laluan baharu anda"
          />
          {errors.kataLaluanAuditorBaharu?.type === "required" && (
            <p role="alert" className="error-message">
              Kata laluan baharu diperlukan
            </p>
          )}
          {errors.kataLaluanAuditorBaharu?.type === "minLength" && (
            <p role="alert" className="error-message">
              Minima 8 karakter
            </p>
          )}
        </Form.Group>
        
        <Form.Group controlId="kataLaluanAuditorBaharu_confirmation">
          <Form.Label>Sahkan Kata Laluan Baharu</Form.Label>
          <Form.Control
            type="password"
            {...register("kataLaluanAuditorBaharu_confirmation", {
              required: true,
              validate: (value) =>
                value === watch("kataLaluanAuditorBaharu") ||
                "Kata laluan tidak padan",
            })}
            aria-invalid={
              errors.kataLaluanAuditorBaharu_confirmation ? "true" : "false"
            }
            placeholder="Sahkan kata laluan baharu anda"
          />
          {errors.kataLaluanAuditorBaharu_confirmation?.type === "required" && (
            <p role="alert" className="error-message">
              Kata laluan diperlukan
            </p>
          )}
          {errors.kataLaluanAuditorBaharu_confirmation && (
            <p role="alert" className="error-message">
              {errors.kataLaluanAuditorBaharu_confirmation.message}
            </p>
          )}
        </Form.Group>
        
        <Button className="set-password-btn" type="submit">
          Set Kata Laluan
        </Button>
      </Form>
    </Container>
  );
}

export default SetPassword;
