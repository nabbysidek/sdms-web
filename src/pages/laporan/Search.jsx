import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Row, Col, Form, Button, Alert, Container } from "react-bootstrap";
import SearchResultLaporan from "./SearchResult";

function SearchLaporan() {
  // ----------- FE --------------
  // Manage the display for Carian Terperinci
  // const [showDetailedSearch, setShowDetailedSearch] = useState(false);

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
    name: [
      "kodKriteria",
      "tahun",
      "skopKriteria",
      "skopSemakan",
      "kodKriteria",
      "bahagianId",
      "jabatanId",
      "unitId",
      "wilayahId",
      "cawanganId",
    ],
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
              <Form.Label className="laporan-filter-header">
                Mengikut Ketidakpatuhan
              </Form.Label>
              <Col xs={12} xl={3}>
                <Form.Group>
                  <Form.Select
                    aria-label="kodKriteriaSelect"
                    {...register("kodKriteria")}
                  >
                    <option>Kod Kriteria</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} xl={3} className="remove-padding margin-for-mobile">
                <Form.Group>
                <Form.Select
                    aria-label="skopKriteriaSelect"
                    {...register("skopKriteria")}
                  >
                    <option>Skop Kriteria</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} xl={3} className="remove-padding margin-for-mobile">
                <Form.Group>
                  <Form.Select
                    aria-label="skopSemakanSelect"
                    {...register("skopSemakan")}
                  >
                    <option>Skop Semakan</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} xl={3} className="remove-padding margin-for-mobile">
               <Form.Group>
                <Form.Control
                  type="date"
                  placeholder="Tahun"
                  {...register("tahun")}
                ></Form.Control>
              </Form.Group>
              </Col>
            </Row>
            <Row className="laporan-filter-row">
              <Form.Label className="laporan-filter-header">
                Mengikut Organisasi
              </Form.Label>
              <Col xs={12} xl={4} className="margin-for-mobile">
              <Form.Group>
                    <Form.Select
                      aria-label="bahagianSelect"
                      {...register("bahagianId")}
                    >
                      <option>Bahagian</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
              </Col>
              <Col xs={12} xl={4} className="remove-padding margin-for-mobile">
              <Form.Group>
                    <Form.Select
                      aria-label="jabatanSelect"
                      {...register("jabatanId")}
                    >
                      <option>Jabatan</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
              </Col>
              <Col xs={12} xl={4} className="remove-padding margin-for-mobile">
              <Form.Group>
                    <Form.Select
                      aria-label="unitSelect"
                      {...register("unitId")}
                    >
                      <option>Unit</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
              </Col>
            </Row>
            <Row className="sc-filter-row-end">
              <Form.Label className="laporan-filter-header">
                Mengikut Lokasi
              </Form.Label>
              <Col xs={12} xl={6} className="margin-for-mobile">
              <Form.Group>
                    <Form.Select
                      aria-label="wilayahSelect"
                      {...register("wilayahId")}
                    >
                      <option>Wilayah</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
              </Col>
              <Col xs={12} xl={6} className="remove-padding margin-for-mobile">
              <Form.Group>
                    <Form.Select
                      aria-label="cawanganSelect"
                      {...register("cawanganId")}
                    >
                      <option>Cawangan</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
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
