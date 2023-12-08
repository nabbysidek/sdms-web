import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert } from "react-bootstrap";

function SearchWilayah() {
  // --------- FE ------------
  // Form validation
  const { handleSubmit, control, setError, formState } = useForm();

  const onSubmit = (data) => {
    if (!data.kriteriaKetidakpatuhan) {
      setError("wilayah", {
        type: "manual",
        message: "Sila masukkan wilayah",
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
                name="wilayah"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Masukkan wilayah"
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

      {formState.errors.wilayah && (
        <Alert className="alert-display" variant="danger">
          {formState.errors.wilayah.message}
        </Alert>
      )}
    </>
  );
}

export default SearchWilayah;
