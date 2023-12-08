import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Alert } from "react-bootstrap";

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

  return (
    <>
      <div className="container-fluid searchSection">
        <Form className="searchBar" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group className="col-md-3 with-padding-left">
              <Form.Select
                {...register("bahagianSelect")}
                aria-label="bahagianSelect"
                onChange={(e) => {
                  setValue("bahagian", e.target.value);
                }}
              >
                <option value="">Bahagian</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-3">
              <Form.Select
                {...register("jabatanSelect")}
                aria-label="jabatanSelect"
                onChange={(e) => {
                  setValue("jabatan", e.target.value);
                }}
              >
                <option value="">Jabatan</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
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
              <Button className="searchBarBtn" type="submit">
                Cari
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </div>

      {errorMessage && (
        <Alert variant="danger" className="alert-display">
          {errorMessage}
        </Alert>
      )}
    </>
  );
}

export default SearchUnit;
