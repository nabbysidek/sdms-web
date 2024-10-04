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
      const response = await axiosCustom.put(`set-kata-laluan`, setPasswordInput);

      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, 
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: response.data.error, 
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error, 
      });
    }
  };

  return (
    <Container fluid className="tabs-container">
      <Form onSubmit={handleSubmit(handleUpdatePassword)}>
        <Form.Group controlId="kataLaluanAuditor">
          <Form.Label className="form-label">Kata Laluan</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              {...register("kataLaluanAuditor", {
                required: "Kata laluan diperlukan",
                minLength: { value: 8, message: "Minima 8 karakter" },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\$@\$!%*?&])[A-Za-z\d\$@\$!%*?&]{8,}$/,
                  message:
                    "Kata laluan mesti mengandungi sekurang-kurangnya satu huruf, satu nombor, dan satu simbol khas",
                },
              })}
              aria-invalid={errors.kataLaluanAuditor ? "true" : "false"}
              placeholder="Kata laluan anda"
            />
            <Button variant="outline-secondary" onClick={toggleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
          {errors.kataLaluanAuditor && (
            <p role="alert" className="error-message">
              {errors.kataLaluanAuditor.message}
            </p>
          )}
        </Form.Group>

        <Form.Group controlId="kataLaluanAuditorBaharu">
          <Form.Label className="form-label">Kata Laluan Baharu</Form.Label>
          <InputGroup>
            <Form.Control
              type={showNewPassword ? "text" : "password"}
              {...register("kataLaluanAuditorBaharu", {
                required: "Kata laluan baharu diperlukan",
                minLength: { value: 8, message: "Minima 8 karakter" },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\$@\$!%*?&])[A-Za-z\d\$@\$!%*?&]{8,}$/,
                  message:
                    "Kata laluan mesti mengandungi sekurang-kurangnya satu huruf, satu nombor, dan satu simbol khas",
                },
              })}
              aria-invalid={errors.kataLaluanAuditorBaharu ? "true" : "false"}
              placeholder="Kata laluan baharu anda"
            />
            <Button variant="outline-secondary" onClick={toggleShowNewPassword}>
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
          {errors.kataLaluanAuditorBaharu && (
            <p role="alert" className="error-message">
              {errors.kataLaluanAuditorBaharu.message}
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
