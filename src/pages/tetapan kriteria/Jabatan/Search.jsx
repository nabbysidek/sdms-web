import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Alert } from "react-bootstrap";

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

  return (
    <>
      <div className="container-fluid searchSection">
        <Form className="searchBar" onSubmit={handleSubmit(onSubmit)}>
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
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
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

export default SearchJabatan;
