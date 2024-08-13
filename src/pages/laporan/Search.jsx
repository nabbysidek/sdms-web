import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Row, Col, Form, Button, Alert, Container } from "react-bootstrap";
import SearchResultLaporan from "./SearchResult";

function SearchLaporan() {
  // ----------- FE --------------
  // Manage the display of the search result when Cari button is clicked
  const [isSearchResultLaporanVisible, setIsSearchResultLaporanVisible] =
    useState(false);

  const toggleVisibilitySearchResultLaporan = () => {
    setIsSearchResultLaporanVisible(!isSearchResultLaporanVisible);
  };

  // Form validation
  const [errorMessage, setErrorMessage] = useState("");

  const { register, control } = useForm();

  const watchInputFields = useWatch({
    control,
    name: [
      "tarikhMula",
      "tarikhAkhir"
    ],
  });

  const atLeastOneFilled = () => {
    return watchInputFields.some((field) => !!field);
  };

  const handleSearchClick = () => {
    if (!atLeastOneFilled()) {
      setErrorMessage("Sila isikan sekurang-kurangnya satu medan input");
      return;
    }

    toggleVisibilitySearchResultLaporan();
  };

  return (
    <>
      <div>
        <Container fluid className="laporan-search-container">
          <Form>
            <Row>
              <Form.Label className="laporan-filter-header">
                Mengikut Tempoh
              </Form.Label>
              <Col xs={12} xl={6}>
                <Form.Group>
                  <Form.Label className="laporan-filter-sub-header">
                    Tarikh Mula
                  </Form.Label>
                  <Form.Control
                    id="startDate"
                    name="startDate"
                    type="date"
                    {...register("tarikhMula")}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} xl={6}>
                <Form.Group>
                  <Form.Label className="laporan-filter-sub-header">
                    Tarikh Tamat
                  </Form.Label>
                  <Form.Control
                    id="endDate"
                    name="endDate"
                    type="date"
                    {...register("tarikhAkhir")}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>

        {errorMessage && (
          <Alert variant="danger" className="alert-display">
            {errorMessage}
          </Alert>
        )}
      </div>

      <div className="laporan-filter-btn-container">
        <Button
          type="submit"
          className="laporan-filter-btn"
          onClick={handleSearchClick}
        >
          Cari
        </Button>
      </div>

      <div className="laporan-filter-result">
        {isSearchResultLaporanVisible && <SearchResultLaporan />}
      </div>
    </>
  );
}

export default SearchLaporan;
