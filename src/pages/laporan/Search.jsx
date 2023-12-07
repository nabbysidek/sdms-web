import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

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
        <div className="container-fluid laporanSearchSection">
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
              <Col xs={12} xl={3} className="noPadding">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Nama Kakitangan"
                    {...register("namaKakitangan")}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} xl={2} className="noPadding">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Tahun"
                    {...register("tahun")}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} xl={3} className="noPadding">
                <Button
                  className="filterBtn"
                  onClick={() => setShowDetailedSearch(!showDetailedSearch)}
                >
                  Carian Terperinci
                </Button>{" "}
              </Col>
              <Col xs={12} xl={2} className="noPadding">
                <Button
                  type="submit"
                  className="searchBtn"
                  onClick={handleSearchClick}
                >
                  Cari
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        {errorMessage && (
          <Alert variant="danger" className="alert-display">
            {errorMessage}
          </Alert>
        )}

        {/* Display detailed search section if showDetailedSearch is true */}
        {showDetailedSearch && (
          <div className="container-fluid detailedSearchFunction">
            <Row>
              <Col xs={12} xl={4} className="mobileMargin">
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
              <Col xs={12} xl={4} className="noPadding mobileMargin">
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
              <Col xs={12} xl={4} className="noPadding">
                <Form>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Kod Kriteria"
                      className="mobileReduceMargin"
                    ></Form.Control>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col xs={12} xl={3} className="mobileMargin">
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
              <Col xs={12} xl={2} className="noPadding mobileMargin">
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
              <Col xs={12} xl={2} className="noPadding mobileMargin">
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
              <Col xs={12} xl={3} className="noPadding">
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
              <Col xs={12} xl={2} className="noPadding">
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
          </div>
        )}
      </div>

      <div className="laporanSearchResultSection">
        {isSearchResultLaporanVisible && <SearchResultLaporan />}
      </div>
    </>
  );
}

export default SearchLaporan;
