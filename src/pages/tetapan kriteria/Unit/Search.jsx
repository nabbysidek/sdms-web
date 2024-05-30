import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";
import { useOptionStore } from "../../../store/option-store";

function SearchUnit() {
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
  const [selectedBahagian, setSelectedBahagian] = useState("");
  const [selectedJabatan, setSelectedJabatan] = useState("");

  const { bahagianOptions, displayBahagians, jabatanOptions, displayJabatans } =
    useOptionStore((state) => ({
      bahagianOptions: state.bahagianOptions,
      displayBahagians: state.displayBahagians,
      jabatanOptions: state.jabatanOptions,
      displayJabatans: state.displayJabatans,
    }));

  useEffect(() => {
    displayBahagians();
    displayJabatans(selectedBahagian);
  }, [displayBahagians, displayJabatans]);

  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group className="col-md-3 with-padding-left">
              <Form.Select
                {...register("bahagianSelect")}
                aria-label="bahagianSelect"
                onChange={(e) => {
                  setSelectedBahagian(e.target.value);
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
            <Form.Group className="col-md-3">
              <Form.Select
                {...register("jabatanSelect")}
                aria-label="jabatanSelect"
                onChange={(e) => {
                  setSelectedJabatan(e.target.value);
                }}
              >
                <option value="">Jabatan</option>
                {jabatanOptions
                  .filter(
                    (jabatan) =>
                      jabatan.bahagianId === parseInt(selectedBahagian)
                  )
                  .map((jabatan) => (
                    <option key={jabatan.id} value={jabatan.id}>
                      {jabatan.namaJabatan}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-4">
              <Form.Control
                type="text"
                placeholder="Unit"
                {...register("unit")}
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

export default SearchUnit;
