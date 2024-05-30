import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";
import { useOptionStore } from "../../../store/option-store";

function SearchJabatan() {
  // --------- FE ------------
  // Form validation
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, setValue } = useForm();

  const atLeastOneFilled = (data) => {
    return Object.values(data).some((field) => !!field);
  };

  const onSubmit = (data) => {
    if (!atLeastOneFilled(data)) {
      setErrorMessage("Sila isikan sekurang-kurangnya satu medan input");
    } else {
      setErrorMessage("");
      console.log(data);
    }
  };

  // ___________________________________ Backend __________________________________
  const { bahagianOptions, displayBahagians } = useOptionStore((state) => ({
    bahagianOptions: state.bahagianOptions,
    displayBahagians: state.displayBahagians,
  }));

  useEffect(() => {
    displayBahagians();
  }, [displayBahagians]);

  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group className="col-md-4 with-padding-left">
              <Form.Select
                {...register("bahagianSelect")}
                aria-label="bahagianSelect"
                onChange={(e) => {
                  setValue("bahagian", e.target.value);
                }}
              >
                <option value="">Bahagian</option>
                {bahagianOptions
                  .sort((a, b) => a.namaBahagian.localeCompare(b.namaBahagian))
                  .map((bahagian) => (
                    <option key={bahagian.id} value={bahagian.id}>
                      {bahagian.namaBahagian}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-6">
              <Form.Control
                type="text"
                placeholder="Jabatan"
                {...register("jabatan")}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="col-md-2">
              <Button className="search-bar-btn" type="submit">
                Cari
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Container>

      {errorMessage && (
        <Alert variant="danger" className="alert-display">
          {errorMessage}
        </Alert>
      )}
    </>
  );
}

export default SearchJabatan;
