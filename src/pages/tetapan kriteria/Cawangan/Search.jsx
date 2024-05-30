import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";
import { useOptionStore } from "../../../store/option-store";

function SearchCawangan() {
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
  const { wilayahOptions, displayWilayahs } = useOptionStore((state) => ({
    wilayahOptions: state.wilayahOptions,
    displayWilayahs: state.displayWilayahs,
  }));

  useEffect(() => {
    displayWilayahs();
  }, [displayWilayahs]);

  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group className="col-md-4 with-padding-left">
              <Form.Select
                {...register("wilayahSelect")}
                aria-label="wilayahSelect"
                onChange={(e) => {
                  onChange(e); // Update form state
                  setSelectedWilayah(e.target.value); // Update local state
                }}
              >
                <option value="">Wilayah</option>
                {wilayahOptions
                  // Sort wilayah options alphabetically by namaWilayah
                  .sort((a, b) => a.namaWilayah.localeCompare(b.namaWilayah))
                  .map((wilayah) => (
                    <option key={wilayah.id} value={wilayah.id}>
                      {wilayah.namaWilayah}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-6">
              <Form.Control
                type="text"
                placeholder="Cawangan"
                {...register("cawangan")}
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

export default SearchCawangan;
