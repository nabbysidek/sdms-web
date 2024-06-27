import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";
import useKakitanganStore from "../../../store/kakitangan-store";

function SearchKakitangan() {
  // form validation
  const { handleSubmit, control, setError, formState } = useForm();

  // initialize store
  const searchKakitangans = useKakitanganStore((state) => state.searchKakitangans);

  // handle search input
  const onSubmit = async (data) => {
    if (!data.kakitangan) {
      setError("kakitangan", {
        type: "manual",
        message: "Sila masukkan kakitangan",
      });
    } else {
      try {
        await searchKakitangans(data.kakitangan);
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
                name="kakitangan"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Masukkan ID atau nama kakitangan"
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

      {formState.errors.namaKakitangan && (
        <Alert className="alert-display" variant="danger">
          {formState.errors.namaKakitangan.message}
        </Alert>
      )}
    </>
  );
}

export default SearchKakitangan;
