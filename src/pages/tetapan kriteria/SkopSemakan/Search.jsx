import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";
import useSkopSemakanStore from "../../../store/skop-semakan-store";

function SearchSkopSemakan() {
  // form validation
  const { handleSubmit, control, setError, formState } = useForm();

  // initialize store
  const searchSkopSemakans = useSkopSemakanStore((state) => state.searchSkopSemakans);

  // handle search input
  const onSubmit = async (data) => {
    if (!data.skopSemakan) {
      setError("skopSemakan", {
        type: "manual",
        message: "Sila masukkan skop semakan",
      });
    } else {
      try {
        await searchSkopSemakans(data.skopSemakan);
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  };

  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar" onSubmit={handleSubmit(onSubmit)}>
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
              <Button className="search-bar-btn" type="submit">
                Cari
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Container>

      {formState.errors.skopSemakan && (
        <Alert className="alert-display" variant="danger">
          {formState.errors.skopSemakan.message}
        </Alert>
      )}
    </>
  );
}

export default SearchSkopSemakan;
