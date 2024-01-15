import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";

function SearchJenisAudit() {
  // --------- FE ------------
  // Form validation
  const { handleSubmit, control, setError, formState } = useForm();

  const onSubmit = (data) => {
    if (!data.jenisAudit) {
      setError("jenisAudit", {
        type: "manual",
        message: "Sila masukkan jenis audit",
      });
    } else {
      // Perform your search logic here
      console.log("Form submitted with data:", data);
    }
  };

  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group className="col-md-10">
              <Controller
                name="jenisAudit"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Masukkan jenis audit"
                  />
                )}
              />
            </Form.Group>
            <Form.Group className="col-md-2">
              <Button className="search-bar-btn" type="submit">
                Cari
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Container>

      {formState.errors.jenisAudit && (
        <Alert className="alert-display" variant="danger">
          {formState.errors.jenisAudit.message}
        </Alert>
      )}
    </>
  );
}

export default SearchJenisAudit;
