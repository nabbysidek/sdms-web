import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import CreateKakitangan from "../tetapan kriteria/Kakitangan/Create";
import SearchResultPelaporan from "./SearchResult";
import "./Pelaporan.css";

function SearchPelaporan() {
  // ----------- FE ----------
  // Manage the visibility of the search result section
  const [isSearchResultPelaporanVisible, setIsSearchResultPelaporanVisible] =
    useState(false);

  // State for storing form validation errors
  const [validationErrors, setValidationErrors] = useState(null);

  const toggleVisibilitySearchResultPelaporan = () => {
    setIsSearchResultPelaporanVisible(!isSearchResultPelaporanVisible);
  };

  // Form validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, toggleVisibility) => {
    // Check if the input field is filled
    if (!data.searchStaff) {
      setValidationErrors({
        searchStaff: { message: "ID atau nama kakitangan diperlukan" },
      });
    } else {
      // Reset validation errors
      setValidationErrors(null);

      // Check if the form is valid before toggling visibility
      if (Object.keys(errors).length === 0) {
        toggleVisibility();
      } else {
        // Set validation errors to be displayed
        setValidationErrors(errors);
      }
    }
  };

  return (
    <>
      {/* Search bar section */}
      <div className="container-fluid pelaporanSearchSection">
        <Row>
          <Col xs={12} xl={7}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Controller
                  name="searchStaff"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="ID atau nama kakitangan"
                      isInvalid={!!validationErrors?.searchStaff}
                    />
                  )}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col xs={12} xl={2} className="noPadding">
            <Button
              onClick={() => {
                handleSubmit((data) =>
                  onSubmit(data, toggleVisibilitySearchResultPelaporan)
                )();
              }}
              className="pelaporanSearchBtn"
            >
              Cari
            </Button>
          </Col>
          <Col xs={12} xl={3} className="noPadding">
            <CreateKakitangan />
          </Col>
        </Row>
      </div>

      {/* Error message */}
      {validationErrors?.searchStaff && (
        <Alert className="alert-display" variant="danger">
          {validationErrors.searchStaff.message}
        </Alert>
      )}

      {/* Search result section */}
      <div className="pelaporanSearchResultSection">
        {isSearchResultPelaporanVisible && <SearchResultPelaporan />}
      </div>
    </>
  );
}

export default SearchPelaporan;
