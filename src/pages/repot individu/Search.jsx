// SearchPelaporan.jsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form, Button, Alert, Container } from "react-bootstrap";
import CreateKakitangan from "../tetapan kriteria/Kakitangan/Create";
import SearchResultUntukRepotIndividu from "./SearchResult";
// import SearchKakitanganModal from "./SearchKakitanganModal";
import "../../assets/styles/styles_repot_individu.css";

function SearchUntukRepotIndividu() {
  // Manage visibility of the search result
  const [linkClicked, setLinkClicked] = useState(false);

  // Check validation errors
  const [validationErrors, setValidationErrors] = useState(null);

  // Form validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validateThenShowTable = (data) => {
    if (!data.searchStaff) {
      setValidationErrors({
        searchStaff: { message: "ID kakitangan diperlukan " },
      });
    } else {
      setValidationErrors(null);
      if (Object.keys(errors).length === 0) {
        // Display modal if the input field is filled
        setLinkClicked(true);
      } else {
        setValidationErrors(errors);
      }
    }
  };

  return (
    <>
      <Container fluid className="repot-search-container">
        <Row>
          <Col xs={12} xl={7}>
            <Form>
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
          <Col xs={12} xl={2} className="remove-padding">
            <Button
              className="repot-search-btn"
              onClick={() => {
                handleSubmit((data) => validateThenShowTable(data))();
              }}
            >
              Cari
            </Button>
          </Col>
          <Col xs={12} xl={3} className="remove-padding">
            <CreateKakitangan />
          </Col>
        </Row>
      </Container>

      {validationErrors?.searchStaff && (
        <Alert className="alert-display" variant="danger">
          {validationErrors.searchStaff.message}
        </Alert>
      )}

      <div className="pelaporan-search-result">
        {linkClicked && <SearchResultUntukRepotIndividu />}
      </div>
    </>
  );
}

export default SearchUntukRepotIndividu;
