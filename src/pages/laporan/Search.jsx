import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Row, Col, Form, Button, Alert, Container } from "react-bootstrap";
import SearchResultLaporan from "./SearchResult";
import { useOptionStore } from "../../store/option-store";

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
      "aktivitiSemakan",
      "tahun",
      "skopKriteria",
      "skopSemakan",
      "kodKriteria",
      "bahagianId",
      "jabatanId",
      "unitId",
      "wilayahId",
      "cawanganId",
      "jenisAudit",
      "kesalahanBerulang",
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

  // ___________________________________ Backend __________________________________
  const [selectedWilayah, setSelectedWilayah] = useState("");
  const [selectedCawangan, setSelectedCawangan] = useState("");

  const [selectedSkopSemakan, setSelectedSkopSemakan] = useState("");
  const [selectedSkopKriteria, setSelectedSkopKriteria] = useState("");
  const [selectedAktivitiSemakan, setSelectedAktivitiSemakan] = useState("");
  const [selectedKriteriaKetidakpatuhan, setSelectedKriteriaKetidakpatuhan] =
    useState("");

  const [selectedBahagian, setSelectedBahagian] = useState("");
  const [selectedJabatan, setSelectedJabatan] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");

  const [selectedJenisAudit, setSelectedJenisAudit] = useState("");

  // Display options
  const {
    wilayahOptions,
    displayWilayahs,
    cawanganOptions,
    displayCawangans,

    skopSemakanOptions,
    displaySkopSemakans,
    skopKriteriaOptions,
    displaySkopKriterias,
    aktivitiSemakanOptions,
    displayAktivitiSemakans,
    kriteriaKetidakpatuhanOptions,
    displayKriteriaKetidakpatuhans,

    bahagianOptions,
    displayBahagians,
    jabatanOptions,
    displayJabatans,
    unitOptions,
    displayUnits,

    jenisAuditOptions,
    displayJenisAudits,
  } = useOptionStore((state) => ({
    wilayahOptions: state.wilayahOptions,
    displayWilayahs: state.displayWilayahs,
    cawanganOptions: state.cawanganOptions,
    displayCawangans: state.displayCawangans,

    skopSemakanOptions: state.skopSemakanOptions,
    displaySkopSemakans: state.displaySkopSemakans,
    skopKriteriaOptions: state.skopKriteriaOptions,
    displaySkopKriterias: state.displaySkopKriterias,
    aktivitiSemakanOptions: state.aktivitiSemakanOptions,
    displayAktivitiSemakans: state.displayAktivitiSemakans,
    kriteriaKetidakpatuhanOptions: state.kriteriaKetidakpatuhanOptions,
    displayKriteriaKetidakpatuhans: state.displayKriteriaKetidakpatuhans,

    bahagianOptions: state.bahagianOptions,
    displayBahagians: state.displayBahagians,
    jabatanOptions: state.jabatanOptions,
    displayJabatans: state.displayJabatans,
    unitOptions: state.unitOptions,
    displayUnits: state.displayUnits,

    jenisAuditOptions: state.jenisAuditOptions,
    displayJenisAudits: state.displayJenisAudits,
  }));

  useEffect(() => {
    displayWilayahs();
    displayCawangans(selectedWilayah);

    displaySkopSemakans();
    displaySkopKriterias(selectedSkopSemakan);
    displayAktivitiSemakans(selectedSkopKriteria);
    displayKriteriaKetidakpatuhans(selectedAktivitiSemakan);

    displayBahagians();
    displayJabatans(selectedBahagian);
    displayUnits(selectedJabatan);

    displayJenisAudits();
  }, [
    displayWilayahs,
    displayCawangans,
    selectedWilayah,

    displaySkopSemakans,
    displaySkopKriterias,
    selectedSkopSemakan,
    displayAktivitiSemakans,
    selectedSkopKriteria,
    displayKriteriaKetidakpatuhans,
    selectedAktivitiSemakan,

    displayBahagians,
    displayJabatans,
    selectedBahagian,
    displayUnits,
    selectedJabatan,

    displayJenisAudits,
  ]);

  return (
    <>
      <div>
        <Container fluid className="laporan-search-container">
          <Form onSubmit={handleSubmit(onSubmit)}>
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
                    type="date"
                    placeholder="Tahun"
                    {...register("tahun")}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} xl={6}>
                <Form.Group>
                  <Form.Label className="laporan-filter-sub-header">
                    Tarikh Tamat
                  </Form.Label>
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
                Mengikut Lokasi
              </Form.Label>
              <Col xs={12} xl={6} className="margin-for-mobile">
                <Form.Group>
                  <Form.Select
                    aria-label="wilayahSelect"
                    {...register("wilayahId")}
                    onChange={(e) => {
                      setSelectedWilayah(e.target.value);
                    }}
                  >
                    <option>Wilayah</option>
                    {wilayahOptions
                      .sort((a, b) =>
                        a.namaWilayah.localeCompare(b.namaWilayah)
                      )
                      .map((wilayah) => (
                        <option key={wilayah.id} value={wilayah.id}>
                          {wilayah.namaWilayah}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} xl={6} className="remove-padding margin-for-mobile">
                <Form.Group>
                  <Form.Select
                    aria-label="cawanganSelect"
                    {...register("cawanganId", { required: true })}
                    onChange={(e) => {
                      setSelectedCawangan(e.target.value);
                    }}
                  >
                    <option>Cawangan</option>
                    {cawanganOptions
                      .filter(
                        (cawangan) =>
                          cawangan.wilayahId === parseInt(selectedWilayah)
                      )
                      .map((cawangan) => (
                        <option key={cawangan.id} value={cawangan.id}>
                          {cawangan.namaCawangan}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Label className="laporan-filter-header">
                Mengikut Ketidakpatuhan
              </Form.Label>
              <Col xs={12} xl={3} className="margin-for-mobile">
                <Form.Group>
                  <Form.Select
                    aria-label="skopSemakanSelect"
                    {...register("skopSemakan")}
                    onChange={(e) => {
                      setSelectedSkopSemakan(e.target.value);
                    }}
                  >
                    <option>Skop Semakan</option>
                    {skopSemakanOptions
                      .sort((a, b) =>
                        a.namaSkopSemakan.localeCompare(b.namaSkopSemakan)
                      )
                      .map((skopSemakan) => (
                        <option key={skopSemakan.id} value={skopSemakan.id}>
                          {skopSemakan.namaSkopSemakan}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} xl={3} className="remove-padding margin-for-mobile">
                <Form.Group>
                  <Form.Select
                    aria-label="skopKriteriaSelect"
                    {...register("skopKriteria")}
                    onChange={(e) => {
                      setSelectedSkopKriteria(e.target.value);
                    }}
                  >
                    <option>Skop Kriteria</option>
                    {skopKriteriaOptions
                      .filter(
                        (skopKriteria) =>
                          skopKriteria.skopSemakanId ===
                          parseInt(selectedSkopSemakan)
                      )
                      .map((skopKriteria) => (
                        <option key={skopKriteria.id} value={skopKriteria.id}>
                          {skopKriteria.namaSkopKriteria}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} xl={3} className="remove-padding margin-for-mobile">
                <Form.Group>
                  <Form.Select
                    aria-label="aktivitiSemakanSelect"
                    {...register("aktivitiSemakan")}
                    onChange={(e) => {
                      setSelectedAktivitiSemakan(e.target.value);
                    }}
                  >
                    <option>Aktiviti Semakan</option>
                    {aktivitiSemakanOptions
                      .filter(
                        (aktivitiSemakan) =>
                          aktivitiSemakan.skopKriteriaId ===
                          parseInt(selectedSkopKriteria)
                      )
                      .map((aktivitiSemakan) => (
                        <option
                          key={aktivitiSemakan.id}
                          value={aktivitiSemakan.id}
                        >
                          {aktivitiSemakan.namaAktivitiSemakan}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} xl={3} className="remove-padding margin-for-mobile">
                <Form.Group>
                  <Form.Select
                    aria-label="kriteriaKetidakpatuhanSelect"
                    {...register("kriteriaKetidakpatuhan")}
                    onChange={(e) => {
                      setSelectedKriteriaKetidakpatuhan(e.target.value);
                    }}
                  >
                    <option>Kriteria Ketidakpatuhan</option>
                    {kriteriaKetidakpatuhanOptions
                      .filter(
                        (kriteriaKetidakpatuhan) =>
                          kriteriaKetidakpatuhan.aktivitiSemakanId ===
                          parseInt(selectedAktivitiSemakan)
                      )
                      .map((kriteriaKetidakpatuhan) => (
                        <option
                          key={kriteriaKetidakpatuhan.id}
                          value={kriteriaKetidakpatuhan.id}
                        >
                          {kriteriaKetidakpatuhan.namaKriteriaKetidakpatuhan}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Label className="laporan-filter-header">
                Mengikut Organisasi
              </Form.Label>
              <Col xs={12} xl={4} className="margin-for-mobile">
                <Form.Group>
                  <Form.Select
                    aria-label="bahagianSelect"
                    {...register("bahagianId")}
                    onChange={(e) => {
                      setSelectedBahagian(e.target.value);
                    }}
                  >
                    <option>Bahagian</option>
                    {bahagianOptions
                      .sort((a, b) =>
                        a.namaBahagian.localeCompare(b.namaBahagian)
                      )
                      .map((bahagian) => (
                        <option key={bahagian.id} value={bahagian.id}>
                          {bahagian.namaBahagian}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} xl={4} className="remove-padding margin-for-mobile">
                <Form.Group>
                  <Form.Select
                    aria-label="jabatanSelect"
                    {...register("jabatanId")}
                    onChange={(e) => {
                      setSelectedJabatan(e.target.value);
                    }}
                  >
                    <option>Jabatan</option>
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
              </Col>
              <Col xs={12} xl={4} className="remove-padding margin-for-mobile">
                <Form.Group>
                  <Form.Select
                    aria-label="unitSelect"
                    {...register("unitId")}
                    onChange={(e) => {
                      setSelectedUnit(e.target.value);
                    }}
                  >
                    <option>Unit</option>
                    {unitOptions
                      .filter(
                        (unit) => unit.jabatanId === parseInt(selectedJabatan)
                      )
                      .map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.namaUnit}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="sc-filter-row-end">
              <Form.Label className="laporan-filter-header">
                Lain-lain
              </Form.Label>
              <Col xs={12} xl={6} className="margin-for-mobile">
                <Form.Group>
                  <Form.Select
                    aria-label="jenisAuditSelect"
                    {...register("jenisAudit")}
                    onChange={(e) => {
                      setSelectedJenisAudit(e.target.value);
                    }}
                  >
                    <option>Jenis Audit</option>
                    {jenisAuditOptions
                      .sort((a, b) =>
                        a.namaJenisAudit.localeCompare(b.namaJenisAudit)
                      )
                      .map((jenisAudit) => (
                        <option key={jenisAudit.id} value={jenisAudit.id}>
                          {jenisAudit.namaJenisAudit}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} xl={6} className="remove-padding margin-for-mobile">
                <Form.Group>
                  <Form.Select
                    aria-label="kesalahanBerulangSelect"
                    {...register("kesalahanBerulang")}
                  >
                    <option>Kesalahan Berulang</option>
                    <option value="YA">YA</option>
                    <option value="TIDAK">TIDAK</option>
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
