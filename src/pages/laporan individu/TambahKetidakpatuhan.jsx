import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useLaporanIndividuStore from "../../store/laporan-individu-store";
import { useOptionStore } from "../../store/option-store";
import "../../assets/styles/styles_laporan_individu.css";

function TambahKetidakpatuhan() {
  // ------- FE -------------
  // Form validation
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // handle create of ketidakpatuhan kakitangan
  const { handleCreateLaporanIndividu } = useLaporanIndividuStore();

  const onSubmit = (data) => {
    handleCreateLaporanIndividu(data);
  };

  // navigate to the previous page
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  // display maklumat kakitangan
  const location = useLocation();
  const { id, namaKakitangan, idKakitangan } = location.state || {};

  // set kakitanganId value when the component mounts
  useEffect(() => {
    setValue("kakitanganId", id);
  }, [id, setValue]);

  // ___________________________________ Backend __________________________________
  const [selectedWilayah, setSelectedWilayah] = useState("");
  const [selectedCawangan, setSelectedCawangan] = useState("");

  const [selectedBahagian, setSelectedBahagian] = useState("");
  const [selectedJabatan, setSelectedJabatan] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");

  const [selectedJenisAudit, setSelectedJenisAudit] = useState("");
  const [selectedSkopSemakan, setSelectedSkopSemakan] = useState("");
  const [selectedSkopKriteria, setSelectedSkopKriteria] = useState("");
  const [selectedAktivitiSemakan, setSelectedAktivitiSemakan] = useState("");
  const [selectedKriteriaKetidakpatuhan, setSelectedKriteriaKetidakpatuhan] =
    useState("");

  // Display options
  const {
    wilayahOptions,
    displayWilayahs,
    cawanganOptions,
    displayCawangans,

    bahagianOptions,
    displayBahagians,
    jabatanOptions,
    displayJabatans,
    unitOptions,
    displayUnits,

    jenisAuditOptions,
    displayJenisAudits,
    skopSemakanOptions,
    displaySkopSemakans,
    skopKriteriaOptions,
    displaySkopKriterias,
    aktivitiSemakanOptions,
    displayAktivitiSemakans,
    kriteriaKetidakpatuhanOptions,
    displayKriteriaKetidakpatuhans,
  } = useOptionStore((state) => ({
    wilayahOptions: state.wilayahOptions,
    displayWilayahs: state.displayWilayahs,
    cawanganOptions: state.cawanganOptions,
    displayCawangans: state.displayCawangans,

    bahagianOptions: state.bahagianOptions,
    displayBahagians: state.displayBahagians,
    jabatanOptions: state.jabatanOptions,
    displayJabatans: state.displayJabatans,
    unitOptions: state.unitOptions,
    displayUnits: state.displayUnits,

    jenisAuditOptions: state.jenisAuditOptions,
    displayJenisAudits: state.displayJenisAudits,
    skopSemakanOptions: state.skopSemakanOptions,
    displaySkopSemakans: state.displaySkopSemakans,
    skopKriteriaOptions: state.skopKriteriaOptions,
    displaySkopKriterias: state.displaySkopKriterias,
    aktivitiSemakanOptions: state.aktivitiSemakanOptions,
    displayAktivitiSemakans: state.displayAktivitiSemakans,
    kriteriaKetidakpatuhanOptions: state.kriteriaKetidakpatuhanOptions,
    displayKriteriaKetidakpatuhans: state.displayKriteriaKetidakpatuhans,
  }));

  useEffect(() => {
    // Fetch options based on `selectedWilayah`
    if (selectedWilayah) {
      displayCawangans(selectedWilayah);
    }
    displayWilayahs();
  }, [selectedWilayah, displayWilayahs, displayCawangans]);

  useEffect(() => {
    // Fetch options based on `selectedBahagian`
    if (selectedBahagian) {
      displayJabatans(selectedBahagian);
    }
    displayBahagians();
  }, [selectedBahagian, displayBahagians, displayJabatans]);

  useEffect(() => {
    // Fetch options based on `selectedJabatan`
    if (selectedJabatan) {
      displayUnits(selectedJabatan);
    }
  }, [selectedJabatan, displayUnits]);

  // Fetch `JenisAudits` and `SkopSemakans` - These do not depend on user selections.
  useEffect(() => {
    displayJenisAudits();
    displaySkopSemakans();
  }, [displayJenisAudits, displaySkopSemakans]);

  // Fetch `SkopKriterias` when `selectedSkopSemakan` changes.
  useEffect(() => {
    if (selectedSkopSemakan) {
      displaySkopKriterias(selectedSkopSemakan);
    }
  }, [selectedSkopSemakan, displaySkopKriterias]);

  // Fetch `AktivitiSemakans` when `selectedSkopKriteria` changes.
  useEffect(() => {
    if (selectedSkopKriteria) {
      displayAktivitiSemakans(selectedSkopKriteria);
    }
  }, [selectedSkopKriteria, displayAktivitiSemakans]);

  // Fetch `KriteriaKetidakpatuhans` when `selectedAktivitiSemakan` changes.
  useEffect(() => {
    if (selectedAktivitiSemakan) {
      displayKriteriaKetidakpatuhans(selectedAktivitiSemakan);
    }
  }, [selectedAktivitiSemakan, displayKriteriaKetidakpatuhans]);

  return (
    <>
      <div className="page-title">
        <h2>Audits</h2>
        <hr />
        <h3>Record Audit</h3>
      </div>
      <div className="tambah-ketidakpatuhan-form-container">
        <Container>
          <div>
            <h4>Staff Information</h4>
            <hr />
            <div className="kakitangan-info">
              <Row>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={namaKakitangan} disabled />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Staff ID</Form.Label>
                    <Form.Control type="text" value={idKakitangan} disabled />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <h4>Location</h4>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
              <Row>
                <Col xs={12} xl={6}>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Controller
                      id="wilayahId"
                      name="wilayahId"
                      control={control}
                      rules={{ required: "Select a state" }}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Form.Select
                            onChange={(e) => {
                              onChange(e);
                              setSelectedWilayah(e.target.value);
                            }}
                            value={value}
                          >
                            <option value="">Select State</option>
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
                          {errors.wilayahId && (
                            <span className="error-message">
                              {errors.wilayahId.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} xl={6}>
                  <Form.Group>
                    <Form.Label>Branch</Form.Label>
                    <Controller
                      id="cawanganId"
                      name="cawanganId"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Select a branch" }}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Form.Select
                            onChange={(e) => {
                              onChange(e);
                              setSelectedCawangan(e.target.value);
                            }}
                            value={value}
                          >
                            <option value="" disabled>
                              Select Branch
                            </option>
                            {cawanganOptions
                              .filter(
                                (cawangan) =>
                                  cawangan.wilayahId ===
                                  parseInt(selectedWilayah)
                              )
                              .map((cawangan) => (
                                <option key={cawangan.id} value={cawangan.id}>
                                  {cawangan.namaCawangan}
                                </option>
                              ))}
                          </Form.Select>
                          {errors.cawanganId && (
                            <span className="error-message">
                              {errors.cawanganId.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="maklumat-terperinci-container">
                <h4>Detailed Staff Information</h4>
                <hr />
                <div>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Staff Position</Form.Label>
                        <Controller
                          name="jawatanKakitangan"
                          id="jawatanKakitangan"
                          control={control}
                          defaultValue=""
                          rules={{
                            required:
                              "Enter a position",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Control
                                type="text"
                                onChange={onChange}
                                value={value}
                                placeholder="Jawatan kakitangan"
                              />
                              {errors.jawatanKakitangan && (
                                <span className="error-message">
                                  {errors.jawatanKakitangan.message}
                                </span>
                              )}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Divison</Form.Label>
                        <Controller
                          id="bahagianId"
                          name="bahagianId"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Select a division" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedBahagian(e.target.value);
                                }}
                                value={value}
                              >
                                <option value="">Select Division</option>
                                {bahagianOptions
                                  .sort((a, b) =>
                                    a.namaBahagian.localeCompare(b.namaBahagian)
                                  )
                                  .map((bahagian) => (
                                    <option
                                      key={bahagian.id}
                                      value={bahagian.id}
                                    >
                                      {bahagian.namaBahagian}
                                    </option>
                                  ))}
                              </Form.Select>
                              {errors.bahagianId && (
                                <span className="error-message">
                                  {errors.bahagianId.message}
                                </span>
                              )}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Department</Form.Label>
                        <Controller
                          id="jabatanId"
                          name="jabatanId"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Select a department" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedJabatan(e.target.value);
                                }}
                                value={value}
                              >
                                <option value="">Select Department</option>
                                {jabatanOptions
                                  .filter(
                                    (jabatan) =>
                                      jabatan.bahagianId ===
                                      parseInt(selectedBahagian)
                                  )
                                  .map((jabatan) => (
                                    <option key={jabatan.id} value={jabatan.id}>
                                      {jabatan.namaJabatan}
                                    </option>
                                  ))}
                              </Form.Select>
                              {errors.jabatanId && (
                                <span className="error-message">
                                  {errors.jabatanId.message}
                                </span>
                              )}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Unit</Form.Label>
                        <Controller
                          id="unitId"
                          name="unitId"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Select a unit" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedUnit(e.target.value);
                                }}
                                value={value}
                              >
                                <option value="">Select Unit</option>
                                {unitOptions
                                  .filter(
                                    (unit) =>
                                      unit.jabatanId ===
                                      parseInt(selectedJabatan)
                                  )
                                  .map((unit) => (
                                    <option key={unit.id} value={unit.id}>
                                      {unit.namaUnit}
                                    </option>
                                  ))}
                              </Form.Select>
                              {errors.unitId && (
                                <span className="error-message">
                                  {errors.unitId.message}
                                </span>
                              )}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="audit-terperinci-container">
                <h4>Audit Details</h4>
                <hr />
                <div>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Audit Date</Form.Label>
                        <Controller
                          id="tarikhAudit"
                          name="tarikhAudit"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: "Enter an audit date",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Control
                                type="date"
                                onChange={onChange}
                                value={value}
                                placeholder="Date"
                              />
                              {errors.tarikhAudit && (
                                <span className="error-message">
                                  {errors.tarikhAudit.message}
                                </span>
                              )}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Types of Audit</Form.Label>
                        <Controller
                          id="jenisAuditId"
                          name="jenisAuditId"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Select a type of audit" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedJenisAudit(e.target.value);
                                }}
                                value={value}
                              >
                                <option value="">Select Type of Audit</option>
                                {jenisAuditOptions
                                  .sort((a, b) =>
                                    a.namaJenisAudit.localeCompare(
                                      b.namaJenisAudit
                                    )
                                  )
                                  .map((jenisAudit) => (
                                    <option
                                      key={jenisAudit.id}
                                      value={jenisAudit.id}
                                    >
                                      {jenisAudit.namaJenisAudit}
                                    </option>
                                  ))}
                              </Form.Select>
                              {errors.jenisAuditId && (
                                <span className="error-message">
                                  {errors.jenisAuditId.message}
                                </span>
                              )}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Review Scope</Form.Label>
                        <Controller
                          id="skopSemakanId"
                          name="skopSemakanId"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Select a review scope" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedSkopSemakan(e.target.value);
                                }}
                                value={value}
                              >
                                <option value="">Select Review Scope</option>
                                {skopSemakanOptions
                                  .sort((a, b) =>
                                    a.namaSkopSemakan.localeCompare(
                                      b.namaSkopSemakan
                                    )
                                  )
                                  .map((skopSemakan) => (
                                    <option
                                      key={skopSemakan.id}
                                      value={skopSemakan.id}
                                    >
                                      {skopSemakan.namaSkopSemakan}
                                    </option>
                                  ))}
                              </Form.Select>
                              {errors.skopSemakanId && (
                                <span className="error-message">
                                  {errors.skopSemakanId.message}
                                </span>
                              )}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Noncompliance Scope</Form.Label>
                        <Controller
                          id="skopKriteriaId"
                          name="skopKriteriaId"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: "Select a noncompliance scope",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedSkopKriteria(e.target.value);
                                }}
                                value={value}
                              >
                                <option value="">
                                  Select Noncompliance Scope
                                </option>
                                {skopKriteriaOptions
                                  .filter(
                                    (skopKriteria) =>
                                      skopKriteria.skopSemakanId ===
                                      parseInt(selectedSkopSemakan)
                                  )
                                  .map((skopKriteria) => (
                                    <option
                                      key={skopKriteria.id}
                                      value={skopKriteria.id}
                                    >
                                      {skopKriteria.namaSkopKriteria}
                                    </option>
                                  ))}
                              </Form.Select>
                              {errors.skopKriteriaId && (
                                <span className="error-message">
                                  {errors.skopKriteriaId.message}
                                </span>
                              )}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group>
                      <Form.Label>Activity Review</Form.Label>
                      <Controller
                        id="aktivitiSemakanId"
                        name="aktivitiSemakanId"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Select an activity review" }}
                        render={({ field: { onChange, value } }) => (
                          <>
                            <Form.Select
                              onChange={(e) => {
                                onChange(e);
                                setSelectedAktivitiSemakan(e.target.value);
                              }}
                              value={value}
                            >
                              <option value="">Select Activity Review</option>
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
                            {errors.aktivitiSemakanId && (
                              <span className="error-message">
                                {errors.aktivitiSemakanId.message}
                              </span>
                            )}
                          </>
                        )}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group>
                      <Form.Label>Noncompliance</Form.Label>
                      <Controller
                        id="kriteriaKetidakpatuhanId"
                        name="kriteriaKetidakpatuhanId"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Select a noncompliance",
                        }}
                        render={({ field: { onChange, value } }) => (
                          <>
                            <Form.Select
                              onChange={(e) => {
                                onChange(e);
                                setSelectedKriteriaKetidakpatuhan(
                                  e.target.value
                                );
                              }}
                              value={value}
                            >
                              <option value="">
                                Select Noncompliance
                              </option>
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
                                    {
                                      kriteriaKetidakpatuhan.namaKriteriaKetidakpatuhan
                                    }
                                  </option>
                                ))}
                            </Form.Select>
                            {errors.kriteriaKetidakpatuhanId && (
                              <span className="error-message">
                                {errors.kriteriaKetidakpatuhanId.message}
                              </span>
                            )}
                          </>
                        )}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group>
                      <Form.Label>Risk Level</Form.Label>
                      <div>
                        <Row className="radio-tambah-ketidakpatuhan">
                          <Col>
                            <Controller
                              name="tahapRisikoAudit"
                              control={control}
                              rules={{ required: true }}
                              defaultValue="Low"
                              render={({ field }) => (
                                <Form.Check
                                  {...field}
                                  type="radio"
                                  label="High"
                                  value="HIGH"
                                  id="radioHigh"
                                  checked={field.value === "HIGH"}
                                />
                              )}
                            />
                          </Col>
                          <Col>
                            <Controller
                              name="tahapRisikoAudit"
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Form.Check
                                  {...field}
                                  type="radio"
                                  label="Medium"
                                  value="MEDIUM"
                                  id="radioMid"
                                  checked={field.value === "MEDIUM"}
                                />
                              )}
                            />
                          </Col>
                          <Col>
                            <Controller
                              name="tahapRisikoAudit"
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Form.Check
                                  {...field}
                                  type="radio"
                                  label="Low"
                                  value="LOW"
                                  id="radioLow"
                                  checked={field.value === "LOW"}
                                />
                              )}
                            />
                          </Col>
                        </Row>
                        {errors.tahapRisikoAudit && (
                          <p>Risk level is required</p>
                        )}
                      </div>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group>
                      <Form.Label>Repeated Offense?</Form.Label>
                      <div>
                        <Row className="radio-kesalahan-berulang">
                          <Col>
                            <Controller
                              name="kesalahanBerulang"
                              control={control}
                              defaultValue="No"
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Form.Check
                                  {...field}
                                  type="radio"
                                  label="Yes"
                                  value="YES"
                                  id="radioYa"
                                  checked={field.value === "YES"}
                                />
                              )}
                            />
                          </Col>
                          <Col>
                            <Controller
                              name="kesalahanBerulang"
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Form.Check
                                  {...field}
                                  type="radio"
                                  label="No"
                                  value="NO"
                                  id="radioTidak"
                                  checked={field.value === "NO"}
                                />
                              )}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group>
                      <Form.Label>Additional Notes</Form.Label>
                      <Controller
                        name="catatanAudit"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </Form.Group>
                  </Row>
                  <div className="tambah-ketidakpatuhan-actions">
                    <Button type="submit" className="tambah-ketidakpatuhan-btn">
                      Save
                    </Button>{" "}
                    <Button onClick={handleCancel} className="cancel-btn">
                      Cancel
                    </Button>{" "}
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
}

export default TambahKetidakpatuhan;
