import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Row, Col, Form, Button, Alert, Container } from "react-bootstrap";
import SearchResultLaporan from "./SearchResult";

function SearchLaporan() {
  // ----------- FE --------------
  // Manage the display for Carian Terperinci
  const [showDetailedSearch, setShowDetailedSearch] = useState(false);

  // Manage the display of the search result when Cari button is clicked
  const [isSearchResultLaporanVisible, setIsSearchResultLaporanVisible] =
    useState(false);

  const toggleVisibilitySearchResultLaporan = () => {
    setIsSearchResultLaporanVisible(!isSearchResultLaporanVisible);
  };

  // Form validation
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, control } = useForm();

  const watchInputFields = useWatch({
    control,
    name: ["idKakitangan", "namaKakitangan", "tahun"],
  });

  const atLeastOneFilled = () => {
    return watchInputFields.some((field) => !!field);
  };

  const onSubmit = (data) => {
    if (!atLeastOneFilled()) {
      setErrorMessage("Sila isikan sekurang-kurangnya satu medan input");
      return;
    }

    console.log(data);
    setErrorMessage("");
    setIsSearchResultLaporanVisible(true);
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={12} xl={2}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="ID Kakitangan"
                    {...register("idKakitangan")}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} xl={3} className="remove-padding">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Nama Kakitangan"
                    {...register("namaKakitangan")}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} xl={2} className="remove-padding">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Tahun"
                    {...register("tahun")}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} xl={3} className="remove-padding">
                <Button
                  className="detailed-search-btn"
                  onClick={() => setShowDetailedSearch(!showDetailedSearch)}
                >
                  Carian Terperinci
                </Button>{" "}
              </Col>
              <Col xs={12} xl={2} className="remove-padding">
                <Button
                  type="submit"
                  className="laporan-search-btn"
                  onClick={handleSearchClick}
                >
                  Cari
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>

        {errorMessage && (
          <Alert variant="danger" className="alert-display">
            {errorMessage}
          </Alert>
        )}

        {/* Display detailed search section if showDetailedSearch is true */}
        {showDetailedSearch && (
          <Container fluid className="detailed-search-container">
            <Row>
              <Col xs={12} xl={4} className="margin-for-mobile">
                <Form>
                  <Form.Group>
                    <Form.Select aria-label="skopKriteriaSelect">
                      <option>Skop Kriteria</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={12} xl={4} className="remove-padding margin-for-mobile">
                <Form>
                  <Form.Group>
                    <Form.Select aria-label="skopSemakanSelect">
                      <option>Skop Semakan</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={12} xl={4} className="remove-padding">
                <Form>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Kod Kriteria"
                      className="reduce-margin-mobile"
                    ></Form.Control>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col xs={12} xl={3} className="margin-for-mobile">
                <Form>
                  <Form.Group>
                    <Form.Select aria-label="bahagianSelect">
                      <option>Bahagian</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={12} xl={2} className="remove-padding margin-for-mobile">
                <Form>
                  <Form.Group>
                    <Form.Select aria-label="jabatanSelect">
                      <option>Jabatan</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={12} xl={2} className="remove-padding margin-for-mobile">
                <Form>
                  <Form.Group>
                    <Form.Select aria-label="unitSelect">
                      <option>Unit</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={12} xl={3} className="remove-padding">
                <Form>
                  <Form.Group>
                    <Form.Select aria-label="wilayahSelect">
                      <option>Wilayah</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={12} xl={2} className="remove-padding">
                <Form>
                  <Form.Group>
                    <Form.Select aria-label="cawanganSelect">
                      <option>Cawangan</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        )}
      </div>

      <div className="laporan-search-result">
        {isSearchResultLaporanVisible && <SearchResultLaporan />}
      </div>
    </>
  );
}

export default SearchLaporan;
