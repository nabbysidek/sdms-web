import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";
import useWilayahStore from "../../../store/wilayah-store";

function SearchWilayah() {
  // form validation
  const { handleSubmit, control, setError, formState } = useForm();

  // initialize store
  const searchWilayahs = useWilayahStore((state) => state.searchWilayahs);

  // handle search input
  const onSubmit = async (data) => {
    if (!data.wilayah) {
      setError("wilayah", {
        type: "manual",
        message: "Sila masukkan wilayah",
      });
    } else {
      try {
        await searchWilayahs(data.wilayah);
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
              <Button className="search-bar-btn" type="submit">
                Cari
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Container>

      {formState.errors.wilayah && (
        <Alert className="alert-display" variant="danger">
          {formState.errors.wilayah.message}
        </Alert>
      )}
    </>
  );
}

export default SearchWilayah;
