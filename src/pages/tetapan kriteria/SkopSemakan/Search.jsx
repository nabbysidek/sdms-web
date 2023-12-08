import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert } from "react-bootstrap";

function SearchSkopSemakan() {
  // --------- FE ------------
  // Form validation
  const { handleSubmit, control, setError, formState } = useForm();

  const onSubmit = (data) => {
    if (!data.skopSemakan) {
      setError("skopSemakan", {
        type: "manual",
        message: "Sila masukkan skop semakan",
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
                name="skopSemakan"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Masukkan skop semakan"
                  />
                )}
              />
            </Form.Group>
            <Form.Group className="col-md-2">
              <Button className="searchBarBtn" type="submit">
                Cari
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </div>

      {formState.errors.skopSemakan && (
        <Alert className="alert-display" variant="danger">
          {formState.errors.skopSemakan.message}
        </Alert>
      )}
    </>
  );
}

export default SearchSkopSemakan;
