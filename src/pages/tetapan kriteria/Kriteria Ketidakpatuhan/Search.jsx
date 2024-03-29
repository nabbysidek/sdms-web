import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";

function SearchKriteriaKetidakpatuhan() {
  // --------- FE ------------
  // Form validation
  const { handleSubmit, control, setError, formState, register, setValue } = useForm();

  const onSubmit = (data) => {
    if (!data.kriteriaKetidakpatuhan) {
      setError("kriteriaKetidakpatuhan", {
        type: "manual",
        message: "Sila masukkan kriteria ketidakpatuhan",
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
          <Form.Group className="col-md-2 with-padding-left">
              <Form.Select
                {...register("skopSemakanSelect")}
                aria-label="skopSemakanSelect"
                onChange={(e) => {
                  setValue("skopSemakan", e.target.value);
                }}
              >
                <option value="">Skop Semakan</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-2">
              <Form.Select
                {...register("skopKriteriaSelect")}
                aria-label="skopKriteriaSelect"
                onChange={(e) => {
                  setValue("skopKriteria", e.target.value);
                }}
              >
                <option value="">Skop Kriteria</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-2">
              <Form.Select
                {...register("aktivitiSemakanSelect")}
                aria-label="kaktivitiSemakanSelect"
                onChange={(e) => {
                  setValue("aktivitiSemakan", e.target.value);
                }}
              >
                <option value="">Aktiviti Semakan</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-4">
              <Controller
                name="kriteriaKetidakpatuhan"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Masukkan kriteria ketidakpatuhan"
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

      {formState.errors.kriteriaKetidakpatuhan && (
        <Alert className="alert-display" variant="danger">
          {formState.errors.kriteriaKetidakpatuhan.message}
        </Alert>
      )}
    </>
  );
}

export default SearchKriteriaKetidakpatuhan;
