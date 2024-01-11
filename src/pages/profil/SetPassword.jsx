import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";

function SetPassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleSetPassword = (data) => {
    // Your custom logic for setting the password
    if (data.newPassword !== data.confirmPassword) {
      alert("Kata laluan baharu tidak sepadan.");
      return;
    }

    alert("Kata laluan baharu telah berjaya diset semula.");
  };

  const onSubmit = (data) => {
    handleSetPassword(data);
    // for data handling
  };

  return (
    <Container fluid className="tabs-container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="currentPassword">
          <Form.Label>Kata Laluan Terkini</Form.Label>
          <Controller
            name="currentPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Kata laluan terkini diperlukan",
              minLength: {
                value: 8,
                message: "Kata laluan harus terdiri dari minimal 8 karakter.",
              },
            }}
            render={({ field }) => (
              <>
                <Form.Control type="password" {...field} />
                {errors.currentPassword && (
                  <span className="error-message">
                    {errors.currentPassword.message}
                  </span>
                )}
              </>
            )}
          />
        </Form.Group>

        <Form.Group controlId="newPassword">
          <Form.Label>Kata Laluan Baharu</Form.Label>
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Kata laluan baharu diperlukan",
              minLength: {
                value: 8,
                message: "Kata laluan harus terdiri dari minimal 8 karakter.",
              },
            }}
            render={({ field }) => (
              <>
                <Form.Control type="password" {...field} />
                {errors.newPassword && (
                  <span className="error-message">
                    {errors.newPassword.message}
                  </span>
                )}
              </>
            )}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Sahkan Kata Laluan Baharu</Form.Label>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Sahkan kata laluan baharu diperlukan",
              minLength: {
                value: 8,
                message: "Kata laluan harus terdiri dari minimal 8 karakter.",
              },
            }}
            render={({ field }) => (
              <>
                <Form.Control type="password" {...field} />
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </>
            )}
          />
        </Form.Group>

        <Button className="set-password-btn" type="submit">
          Set Kata Laluan
        </Button>
      </Form>
    </Container>
  );
}

export default SetPassword;
