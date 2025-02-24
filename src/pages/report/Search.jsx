import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form, Button, Alert, Container } from "react-bootstrap";
import CreateStudent from "../manage data/Student/Create";
import ShowReport from "./Show";
import "../../assets/styles/styles_report.css";
import axiosCustom from "../../axios";

function SearchReport() {
  // manage visibility of the search result
  const [linkClicked, setLinkClicked] = useState(false);

  // check validation errors
  const [validationErrors, setValidationErrors] = useState(null);

  // store search results
  const [searchResults, setSearchResults] = useState(null);

  // form validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      searchStudentInput: "",
    },
  });

  // watch the value of searchStudentInput
  const searchStudentInputValue = watch("searchStudentInput");

  // submit for the search
  const onSubmit = async (data) => {
    if (!data.searchStudentInput) {
      setValidationErrors({
        searchStudentInput: { message: "Student ID is required" },
      });
    } else {
      setValidationErrors(null);
      if (Object.keys(errors).length === 0) {
        try {
          const response = await axiosCustom.post("report/search-report", {
            searchStudentInput: data.searchStudentInput,
          });
          setSearchResults(response.data);
          setLinkClicked(true);
        } catch (error) {
          console.error("Error fetching search results", error);
          setValidationErrors({
            searchStudentInput: {
              message: "Error finding student's report records",
            },
          });
        }
      } else {
        setValidationErrors(errors);
      }
    }
  };

  return (
    <>
      <Container fluid className="report-search-container">
        <Row>
          <Col xs={12} md={7} xl={7}>
            <Form>
              <Form.Group>
                <Controller
                  name="searchStudentInput"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Search student report records with their student ID . . ."
                      value={searchStudentInputValue}
                      isInvalid={!!validationErrors?.searchStudentInput}
                    />
                  )}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col xs={12} md={2} xl={2} className="remove-padding">
            <Button
              className="report-search-btn"
              onClick={() => {
                handleSubmit((data) => onSubmit(data))();
              }}
            >
              Search
            </Button>
          </Col>
          <Col xs={12} md={3} xl={3} className="remove-padding">
            <CreateStudent />
          </Col>
        </Row>
      </Container>

      {validationErrors?.searchStudentInput && (
        <Alert className="alert-display" variant="danger">
          {validationErrors.searchStudentInput.message}
        </Alert>
      )}

      <div className="report-search-result">
        {linkClicked && (
          <ShowReport searchResults={searchResults} />
        )}
      </div>
    </>
  );
}

export default SearchReport;
