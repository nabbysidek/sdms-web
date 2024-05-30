import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../assets/styles/styles_repot_individu.css";
import { useOptionStore } from "../../store/option-store";

function EditKetidakpatuhan() {
  // ------- FE -------------
  // Form validation
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Perform other form validation checks
    console.log(data);
  };

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
    displayWilayahs();
    displayCawangans(selectedWilayah);

    displayBahagians();
    displayJabatans(selectedBahagian);
    displayUnits(selectedJabatan);

    displayJenisAudits();
    displaySkopSemakans();
    displaySkopKriterias(selectedSkopSemakan);
    displayAktivitiSemakans(selectedSkopKriteria);
    displayKriteriaKetidakpatuhans(selectedAktivitiSemakan);
  }, [
    displayWilayahs,
    displayCawangans,
    selectedWilayah,

    displayBahagians,
    displayJabatans,
    selectedBahagian,
    displayUnits,
    selectedJabatan,

    displayJenisAudits,
    displaySkopSemakans,
    displaySkopKriterias,
    selectedSkopSemakan,
    displayAktivitiSemakans,
    selectedSkopKriteria,
    displayKriteriaKetidakpatuhans,
    selectedAktivitiSemakan,
  ]);
  return (
    <>
      <div className="page-title">
        <h2>Repot Individu</h2>
        <hr />
        <h3>Edit Ketidakpatuhan Kakitangan</h3>
      </div>
      <div className="edit-ketidakpatuhan-form-container">
        <Container>
          <div>
            <h4>Maklumat Kakitangan</h4>
            <hr />
            <div className="kakitangan-info">
              <Row>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Nama</Form.Label>
                    <Form.Control type="text" defaultValue="" disabled />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>ID Kakitangan</Form.Label>
                    <Form.Control type="text" defaultValue="" disabled />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <h4>Lokasi</h4>
            <hr />
            <Form>
              <Row>
                <Col xs={12} xl={6}>
                  <Form.Group>
                    <Form.Label>Wilayah</Form.Label>
                    <Controller
                      id="wilayahId"
                      name="wilayahId"
                      control={control}
                      rules={{ required: "Sila pilih wilayah" }}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Form.Select
                            // aria-label="wilayahSelect"
                            onChange={(e) => {
                              onChange(e);
                              setSelectedWilayah(e.target.value);
                            }}
                            value={value}
                            // isInvalid={!!errors.wilayah}
                          >
                            <option value="">Pilih wilayah</option>
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
                          {/* <Form.Control.Feedback type="invalid">
                            {errors.wilayah && errors.wilayah.message}
                          </Form.Control.Feedback> */}
                        </>
                      )}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} xl={6}>
                  <Form.Group>
                    <Form.Label>Cawangan</Form.Label>
                    <Controller
                      id="cawanganId"
                      name="cawanganId"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Sila pilih cawangan" }}
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
                              Pilih cawangan
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
                          {/* <Form.Control.Feedback type="invalid">
                            {errors.cawangan && errors.cawangan.message}
                          </Form.Control.Feedback> */}
                        </>
                      )}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="maklumat-terperinci-container">
                <h4>Maklumat Kakitangan Terperinci</h4>
                <hr />
                <div>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Jawatan Kakitangan Waktu Audit</Form.Label>
                        <Controller
                          name="jawatanStaff"
                          control={control}
                          defaultValue=""
                          rules={{
                            required:
                              "Sila sertakan jawatan kakitangan sewaktu diaudit",
                          }}
                          render={({ field }) => (
                            <>
                              <Form.Control
                                type="text"
                                placeholder="Jawatan kakitangan"
                                {...field}
                                isInvalid={!!errors.jawatanStaff}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.jawatanStaff &&
                                  errors.jawatanStaff.message}
                              </Form.Control.Feedback>
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Bahagian</Form.Label>
                        <Controller
                          id="bahagianId"
                          name="bahagianId"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Sila pilih bahagian" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                // aria-label="bahagianSelect"
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedBahagian(e.target.value);
                                }}
                                value={value}
                                // isInvalid={!!errors.bahagian}
                              >
                                <option value="">Pilih bahagian</option>
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
                              {/* <Form.Control.Feedback type="invalid">
                                {errors.bahagian && errors.bahagian.message}
                              </Form.Control.Feedback> */}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Jabatan</Form.Label>
                        <Controller
                          id="jabatanId"
                          name="jabatanId"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Sila pilih jabatan" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedJabatan(e.target.value);
                                }}
                                value={value}
                                // aria-label="jabatanSelect"
                                // {...field}
                                // isInvalid={!!errors.jabatan}
                              >
                                <option value="">Pilih jabatan</option>
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
                              {/* <Form.Control.Feedback type="invalid">
                                {errors.jabatan && errors.jabatan.message}
                              </Form.Control.Feedback> */}
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
                          rules={{ required: "Sila pilih unit" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedUnit(e.target.value);
                                }}
                                value={value}
                                // aria-label="unitSelect"
                                // {...field}
                                // isInvalid={!!errors.unit}
                              >
                                <option value="">Pilih unit</option>
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
                              {/* <Form.Control.Feedback type="invalid">
                                {errors.unit && errors.unit.message}
                              </Form.Control.Feedback> */}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="audit-terperinci-container">
                <h4>Perincian Audit</h4>
                <hr />
                <div>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Tahun Diaudit</Form.Label>
                        <Controller
                          id="tahunDiaudit"
                          name="tahunDiaudit"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: "Sila sertakan tahun staff diaudit",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Control
                                type="date"
                                onChange={onChange}
                                value={value}
                                placeholder="Tahun"
                                // {...field}
                                // isInvalid={!!errors.tahunDiaudit}
                              />
                              {errors.tahunDiaudit && (
                                <span className="error-message">
                                  {errors.tahunDiaudit.message}
                                </span>
                              )}
                              {/* <Form.Control.Feedback type="invalid">
                                {errors.tahunDiaudit &&
                                  errors.tahunDiaudit.message}
                              </Form.Control.Feedback> */}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Jenis Audit</Form.Label>
                        <Controller
                          id="jenisAuditId"
                          name="jenisAuditId"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Sila pilih jenis audit" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedJenisAudit(e.target.value);
                                }}
                                value={value}
                                // aria-label="jenisAuditSelect"
                                // {...field}
                                // isInvalid={!!errors.jenisAudit}
                              >
                                <option value="">Pilih jenis audit</option>
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
                              {/* <Form.Control.Feedback type="invalid">
                                {errors.jenisAudit && errors.jenisAudit.message}
                              </Form.Control.Feedback> */}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Skop Semakan</Form.Label>
                        <Controller
                          id="skopSemakanId"
                          name="skopSemakanId"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Sila pilih skop semakan" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedSkopSemakan(e.target.value);
                                }}
                                value={value}
                                // aria-label="skopSemakanSelect"
                                // {...field}
                                // isInvalid={!!errors.jenisAudit}
                              >
                                <option value="">Pilih skop semakan</option>
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
                              {/* <Form.Control.Feedback type="invalid">
                                {errors.skopSemakan &&
                                  errors.skopSemakan.message}
                              </Form.Control.Feedback> */}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Skop Kriteria Ketidakpatuhan</Form.Label>
                        <Controller
                          id="skopKriteriaId"
                          name="skopKriteriaId"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: "Sila pilih skop kriteria ketidakpatuhan",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedSkopKriteria(e.target.value);
                                }}
                                value={value}
                                // aria-label="skopKriteriaKetidakpatuhanSelect"
                                // {...field}
                                // isInvalid={!!errors.skopKriteriaKetidakpatuhan}
                              >
                                <option value="">
                                  Pilih skop kriteria ketidakpatuhan
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
                              {/* <Form.Control.Feedback type="invalid">
                                {errors.skopKriteriaKetidakpatuhan &&
                                  errors.skopKriteriaKetidakpatuhan.message}
                              </Form.Control.Feedback> */}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Row>
                      <Form.Group>
                        <Form.Label>Aktiviti Semakan</Form.Label>
                        <Controller
                          id="aktivitiSemakanId"
                          name="aktivitiSemakanId"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Sila pilih aktiviti semakan" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedAktivitiSemakan(e.target.value);
                                }}
                                value={value}
                                // aria-label="aktivitiSemakanSelect"
                                // {...field}
                                // isInvalid={!!errors.aktivitiSemakan}
                              >
                                <option value="">Pilih aktiviti semakan</option>
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
                              {/* <Form.Control.Feedback type="invalid">
                                {errors.aktivitiSemakan &&
                                  errors.aktivitiSemakan.message}
                              </Form.Control.Feedback> */}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Row>
                  </Row>
                  <Row>
                    <Form.Group>
                      <Form.Label>Kriteria Ketidakpatuhan</Form.Label>
                      <Controller
                        id="kriteriaKetidakpatuhanId"
                        name="kriteriaKetidakpatuhanId"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Sila pilih kriteria ketidakpatuhan",
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
                              // aria-label="kriteriaKetidakpatuhanSelect"
                              // {...field}
                              // isInvalid={!!errors.kriteriaKetidakpatuhan}
                            >
                              <option value="">
                                Pilih kriteria ketidakpatuhan
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
                            {/* <Form.Control.Feedback type="invalid">
                              {errors.kriteriaKetidakpatuhan &&
                                errors.kriteriaKetidakpatuhan.message}
                            </Form.Control.Feedback> */}
                          </>
                        )}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group>
                      <Form.Label>Tahap Risiko</Form.Label>
                      <div>
                        <Row className="radio-edit-ketidakpatuhan">
                          <Col>
                            <Controller
                              name="tahapRisikoRadio"
                              control={control}
                              rules={{ required: true }}
                              defaultValue="Biasa"
                              render={({ field }) => (
                                <Form.Check
                                  {...field}
                                  type="radio"
                                  label="Penipuan"
                                  value="Penipuan"
                                  id="radioFraud"
                                  checked={field.value === "Penipuan"}
                                />
                              )}
                            />
                          </Col>
                          <Col>
                            <Controller
                              name="tahapRisikoRadio"
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Form.Check
                                  {...field}
                                  type="radio"
                                  label="Serah Dokumen"
                                  value="Serah Dokumen"
                                  id="radioSerahDoc"
                                  checked={field.value === "Serah Dokumen"}
                                />
                              )}
                            />
                          </Col>
                          <Col>
                            <Controller
                              name="tahapRisikoRadio"
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Form.Check
                                  {...field}
                                  type="radio"
                                  label="Biasa"
                                  value="Biasa"
                                  id="radioBiasa"
                                  checked={field.value === "Biasa"}
                                />
                              )}
                            />
                          </Col>
                        </Row>
                        {errors.tahapRisikoRadio && (
                          <p>Tahap Risiko diperlukan</p>
                        )}
                      </div>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group>
                      <Form.Label>Kesalahan Berulang</Form.Label>
                      <div>
                        <Row className="radio-kesalahan-berulang">
                          <Col>
                            <Controller
                              name="kesalahanBerulangRadio"
                              control={control}
                              defaultValue="Tidak"
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Form.Check
                                  {...field}
                                  type="radio"
                                  label="Ya"
                                  value="Ya"
                                  id="radioYa"
                                  checked={field.value === "Ya"}
                                />
                              )}
                            />
                            {/* <Form.Check
                              type="radio"
                              label="Ya"
                              name="kesalahanBerulangRadio"
                              id="radiokesalahanBerulangYes"
                            /> */}
                          </Col>
                          <Col>
                            <Controller
                              name="kesalahanBerulangRadio"
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Form.Check
                                  {...field}
                                  type="radio"
                                  label="Tidak"
                                  value="Tidak"
                                  id="radioTidak"
                                  checked={field.value === "Tidak"}
                                />
                              )}
                            />
                            {/* <Form.Check
                              type="radio"
                              label="Tidak"
                              name="kesalahanBerulangRadio"
                              id="radiokesalahanBerulangNo"
                            /> */}
                          </Col>
                        </Row>
                      </div>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group>
                      <Form.Label>Catatan</Form.Label>
                      <Controller
                        name="catatan"
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
                      {/* <Form.Control as="textarea" rows={3} /> */}
                    </Form.Group>
                  </Row>
                  <div className="edit-ketidakpatuhan-actions">
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      className="edit-ketidakpatuhan-btn"
                    >
                      Simpan
                    </Button>{" "}
                    <Button onClick={() => reset()} className="cancel-btn">
                      Batal
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

export default EditKetidakpatuhan;
