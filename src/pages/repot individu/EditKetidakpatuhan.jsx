import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../assets/styles/styles_repot_individu.css";
import { useOptionStore } from "../../store/option-store";
import useRepotIndividuStore from "../../store/repot-individu-store";

function EditKetidakpatuhan() {
  // ------- FE -------------
  // Retrieve maklumat kakitangan & the audit
  const location = useLocation();
  const { namaKakitangan, idKakitangan, audits } = location.state || {};

  /* Destructuring assignment to extract 
  handleEditRepotIndividu from the useRepotIndividuStore hook */ 
  const { handleEditRepotIndividu } = useRepotIndividuStore();

  // Form validation
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    handleEditRepotIndividu(data, audits.id);
  };
  
    // To navigate to the previous page
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  // ___________________________________ Backend __________________________________
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
    if (audits) {
      displayWilayahs();
      displayCawangans(audits.wilayah?.id);
      displayBahagians();
      displayJabatans(audits.bahagian?.id);
      displayUnits(audits.jabatan?.id);
      displayJenisAudits();
      displaySkopSemakans();
      displaySkopKriterias(audits.skop_semakan?.id);
      displayAktivitiSemakans(audits.skop_kriteria?.id);
      displayKriteriaKetidakpatuhans(audits.aktiviti_semakan?.id);

      setValue("wilayahId", audits.wilayah?.id);
      setValue("cawanganId", audits.cawangan?.id);
      setValue("bahagianId", audits.bahagian?.id);
      setValue("jabatanId", audits.jabatan?.id);
      setValue("unitId", audits.unit?.id);
      setValue("jenisAuditId", audits.jenis_audit?.id);
      setValue("skopSemakanId", audits.skop_semakan?.id);
      setValue("skopKriteriaId", audits.skop_kriteria?.id);
      setValue("aktivitiSemakanId", audits.aktiviti_semakan?.id);
      setValue("kriteriaKetidakpatuhanId", audits.kriteria_ketidakpatuhan?.id);
      setValue("jawatanKakitangan", audits.jawatanKakitangan);
      setValue("tarikhAudit", audits.tarikhAudit);
      setValue("catatanAudit", audits.catatanAudit);
      setValue("tahapRisikoAudit", audits.tahapRisikoAudit);
      setValue("kesalahanBerulang", audits.kesalahanBerulang);
    }
  }, [
    displayWilayahs,
    displayCawangans,
    audits,
    displayBahagians,
    displayJabatans,
    displayUnits,
    displayJenisAudits,
    displaySkopSemakans,
    displaySkopKriterias,
    displayAktivitiSemakans,
    displayKriteriaKetidakpatuhans,
    setValue,
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
                    <Form.Control type="text" value={namaKakitangan} disabled />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>ID Kakitangan</Form.Label>
                    <Form.Control type="text" value={idKakitangan} disabled />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <h4>Lokasi</h4>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                            onChange={(e) => {
                              onChange(e);
                              setValue("wilayahId", e.target.value);
                            }}
                            value={value}
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
                      rules={{ required: "Sila pilih cawangan" }}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Form.Select
                            onChange={(e) => {
                              onChange(e);
                              setValue("cawanganId", e.target.value);
                            }}
                            value={value}
                          >
                            <option value="">Pilih cawangan</option>
                            {cawanganOptions
                              .sort((a, b) =>
                                a.namaCawangan.localeCompare(b.namaCawangan)
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
                <h4>Maklumat Kakitangan Terperinci</h4>
                <hr />
                <div>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Jawatan Kakitangan Waktu Audit</Form.Label>
                        <Controller
                          name="jawatanKakitangan"
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
                                isInvalid={!!errors.jawatanKakitangan}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.jawatanKakitangan &&
                                  errors.jawatanKakitangan.message}
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
                          rules={{ required: "Sila pilih bahagian" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setValue("bahagianId", e.target.value);
                                }}
                                value={value}
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
                          rules={{ required: "Sila pilih jabatan" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setValue("jabatanId", e.target.value);
                                }}
                                value={value}
                              >
                                <option value="">Pilih jabatan</option>
                                {jabatanOptions
                                  .sort((a, b) =>
                                    a.namaJabatan.localeCompare(b.namaJabatan)
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
                          rules={{ required: "Sila pilih unit" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setValue("unitId", e.target.value);
                                }}
                                value={value}
                              >
                                <option value="">Pilih unit</option>
                                {unitOptions
                                  .sort((a, b) =>
                                    a.namaUnit.localeCompare(b.namaUnit)
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
                <h4>Perincian Audit</h4>
                <hr />
                <div>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Tahun Diaudit</Form.Label>
                        <Controller
                          name="tarikhAudit"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: "Sila sertakan tarikh audit",
                          }}
                          render={({ field }) => (
                            <>
                              <Form.Control
                                type="text"
                                placeholder="Tarikh audit"
                                {...field}
                                isInvalid={!!errors.tarikhAudit}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.tarikhAudit &&
                                  errors.tarikhAudit.message}
                              </Form.Control.Feedback>
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
                          rules={{ required: "Sila pilih jenisAudit" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setValue("jenisAuditId", e.target.value);
                                }}
                                value={value}
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
                          rules={{ required: "Sila pilih skop semakan" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setValue("skopSemakanId", e.target.value);
                                }}
                                value={value}
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
                          rules={{ required: "Sila pilih skop kriteria" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setValue("skopKriteriaId", e.target.value);
                                }}
                                value={value}
                              >
                                <option value="">Pilih skop kriteria</option>
                                {skopKriteriaOptions
                                  .sort((a, b) =>
                                    a.namaSkopKriteria.localeCompare(
                                      b.namaSkopKriteria
                                    )
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
                    <Row>
                      <Form.Group>
                        <Form.Label>Aktiviti Semakan</Form.Label>
                        <Controller
                          id="aktivitiSemakanId"
                          name="aktivitiSemakanId"
                          control={control}
                          rules={{ required: "Sila pilih aktiviti semakan" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setValue("aktivitiSemakanId", e.target.value);
                                }}
                                value={value}
                              >
                                <option value="">Pilih aktiviti semakan</option>
                                {aktivitiSemakanOptions
                                  .sort((a, b) =>
                                    a.namaAktivitiSemakan.localeCompare(
                                      b.namaAktivitiSemakan
                                    )
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
                  </Row>
                  <Row>
                    <Form.Group>
                      <Form.Label>Kriteria Ketidakpatuhan</Form.Label>
                      <Controller
                        id="kriteriaKetidakpatuhanId"
                        name="kriteriaKetidakpatuhanId"
                        control={control}
                        rules={{
                          required: "Sila pilih kriteria ketidakpatuhan",
                        }}
                        render={({ field: { onChange, value } }) => (
                          <>
                            <Form.Select
                              onChange={(e) => {
                                onChange(e);
                                setValue(
                                  "kriteriaKetidakpatuhanId",
                                  e.target.value
                                );
                              }}
                              value={value}
                            >
                              <option value="">
                                Pilih kriteria ketidakpatuhan
                              </option>
                              {kriteriaKetidakpatuhanOptions
                                .sort((a, b) =>
                                  a.namaKriteriaKetidakpatuhan.localeCompare(
                                    b.namaKriteriaKetidakpatuhan
                                  )
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
                      <Form.Label>Tahap Risiko</Form.Label>
                      <div>
                        <Row className="radio-edit-ketidakpatuhan">
                          <Col>
                            <Controller
                              name="tahapRisikoAudit"
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Form.Check
                                  {...field}
                                  type="radio"
                                  label="Penipuan"
                                  value="PENIPUAN"
                                  id="radioFraud"
                                  checked={field.value === "PENIPUAN"}
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
                                  label="Serah Dokumen"
                                  value="SERAH DOKUMEN"
                                  id="radioSerahDoc"
                                  checked={field.value === "SERAH DOKUMEN"}
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
                                  label="Biasa"
                                  value="BIASA"
                                  id="radioBiasa"
                                  checked={field.value === "BIASA"}
                                />
                              )}
                            />
                          </Col>
                        </Row>
                        {errors.tahapRisikoAudit && (
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
                          name="kesalahanBerulang"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Form.Check
                              {...field}
                              type="radio"
                              label="Ya"
                              value="YA"
                              id="radioYa"
                              checked={field.value === "YA"}
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
                                  label="Tidak"
                                  value="TIDAK"
                                  id="radioTidak"
                                  checked={field.value === "TIDAK"}
                                />
                              )}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Form.Group>
                  </Row>
                  <Row>
                    {/* Note: Catatan is not a required field */}
                    <Form.Group>
                      <Form.Label>Catatan</Form.Label>
                      <Controller
                        name="catatanAudit"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <>
                            <Form.Control
                              as="textarea"
                              placeholder="Catatan audit"
                              {...field}
                            />
                          </>
                        )}
                      />
                    </Form.Group>
                  </Row>
                  <div className="edit-ketidakpatuhan-actions">
                    <Button
                      type="submit"
                      className="tambah-ketidakpatuhan-btn"
                    >
                      Simpan
                    </Button>{" "}
                    <Button onClick={handleCancel} className="cancel-btn">
                      Kembali
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
