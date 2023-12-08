import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert } from "react-bootstrap";

function SearchSkopKriteria() {
  // --------- FE ------------
  // Form validation
  const { handleSubmit, control, setError, formState } = useForm();

  const onSubmit = (data) => {
    if (!data.skopKriteria) {
      setError("skopKriteria", {
        type: "manual",
        message: "Sila masukkan skop kriteria",
      });
    } else {
      // Perform your search logic here
      console.log("Form submitted with data:", data);
    }
  };

  return (
    <>
      <div className="container-fluid searchSection">
        <Form className="searchBar" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group className="col-md-10">
              <Controller
                name="skopKriteria"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Masukkan skop kriteria"
                  />
                )}
              />
            </Form.Group>
            <Form.Group className="col-md-2">
              <Button type="submit" className="searchBarBtn">
                Cari
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </div>

      {formState.errors.skopKriteria && (
        <Alert className="alert-display" variant="danger">
          {formState.errors.skopKriteria.message}
        </Alert>
      )}
    </>
  );
}

export default SearchSkopKriteria;
