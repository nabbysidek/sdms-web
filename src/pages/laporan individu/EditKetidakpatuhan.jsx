import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../assets/styles/styles_laporan_individu.css";
import { useOptionStore } from "../../store/option-store";
import useLaporanIndividuStore from "../../store/laporan-individu-store";

function EditKetidakpatuhan() {
  const location = useLocation();
  const { namaKakitangan, idKakitangan, audits } = location.state || {};
  const { handleEditLaporanIndividu } = useLaporanIndividuStore();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const {
    wilayahOptions,
    displayWilayahs,
    displayCawangans,
    filteredCawanganOptions,
    filterCawangansByWilayah,

    bahagianOptions,
    displayBahagians,
    jabatanOptions,
    displayJabatans,
    unitOptions,
    displayUnits,
    filteredJabatanOptions,
    filterJabatansByBahagian,
    filteredUnitOptions,
    filterUnitsByJabatan,

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
    filteredSkopKriteriaOptions,
    filterSkopKriteriasBySkopSemakan,
    filteredAktivitiSemakanOptions,
    filterAktivitiSemakansBySkopKriteria,
    filteredKriteriaKetidakpatuhanOptions,
    filterKriteriaKetidakpatuhansByAktivitiSemakan,
  } = useOptionStore((state) => ({
    wilayahOptions: state.wilayahOptions,
    displayWilayahs: state.displayWilayahs,
    displayCawangans: state.displayCawangans,
    filteredCawanganOptions: state.filteredCawanganOptions,
    filterCawangansByWilayah: state.filterCawangansByWilayah,

    bahagianOptions: state.bahagianOptions,
    displayBahagians: state.displayBahagians,
    jabatanOptions: state.jabatanOptions,
    displayJabatans: state.displayJabatans,
    unitOptions: state.unitOptions,
    displayUnits: state.displayUnits,
    filteredJabatanOptions: state.filteredJabatanOptions,
    filterJabatansByBahagian: state.filterJabatansByBahagian,
    filteredUnitOptions: state.filteredUnitOptions,
    filterUnitsByJabatan: state.filterUnitsByJabatan,

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
    filteredSkopKriteriaOptions: state.filteredSkopKriteriaOptions,
    filterSkopKriteriasBySkopSemakan: state.filterSkopKriteriasBySkopSemakan,
    filteredAktivitiSemakanOptions: state.filteredAktivitiSemakanOptions,
    filterAktivitiSemakansBySkopKriteria:
      state.filterAktivitiSemakansBySkopKriteria,
    filteredKriteriaKetidakpatuhanOptions:
      state.filteredKriteriaKetidakpatuhanOptions,
    filterKriteriaKetidakpatuhansByAktivitiSemakan:
      state.filterKriteriaKetidakpatuhansByAktivitiSemakan,
  }));

  const onSubmit = (data) => {
    handleEditLaporanIndividu(data, audits.id);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    displayWilayahs();
    displayCawangans();

    displayBahagians();
    displayJabatans();
    displayUnits();

    displayJenisAudits();
    displaySkopSemakans();
    displaySkopKriterias();
    displayAktivitiSemakans();
    displayKriteriaKetidakpatuhans();

    if (audits) {
      setValue("wilayahId", audits.wilayah?.id);
      setValue("cawanganId", audits.cawangan?.id);
      filterCawangansByWilayah(audits.wilayah?.id);

      setValue("bahagianId", audits.bahagian?.id);
      setValue("jabatanId", audits.jabatan?.id);
      setValue("unitId", audits.unit?.id);
      filterJabatansByBahagian(audits.bahagian?.id);
      filterUnitsByJabatan(audits.jabatan?.id);

      setValue("skopSemakanId", audits.skop_semakan?.id);
      setValue("skopKriteriaId", audits.skop_kriteria?.id);
      setValue("aktivitiSemakanId", audits.aktiviti_semakan?.id);
      setValue("kriteriaKetidakpatuhanId", audits.kriteria_ketidakpatuhan?.id);

      filterSkopKriteriasBySkopSemakan(audits.skop_semakan?.id);
      filterAktivitiSemakansBySkopKriteria(audits.skop_kriteria?.id);
      filterKriteriaKetidakpatuhansByAktivitiSemakan(
        audits.aktiviti_semakan?.id
      );

      setValue("jenisAuditId", audits.jenis_audit?.id);
      setValue("jawatanKakitangan", audits.jawatanKakitangan);
      setValue("tarikhAudit", audits.tarikhAudit);
      setValue("catatanAudit", audits.catatanAudit);
      setValue("tahapRisikoAudit", audits.tahapRisikoAudit);
      setValue("kesalahanBerulang", audits.kesalahanBerulang);
    }
  }, [
    audits,
    setValue,
    displayWilayahs,
    displayCawangans,
    filterCawangansByWilayah,
    displayBahagians,
    displayJabatans,
    displayUnits,
    filterJabatansByBahagian,
    filterUnitsByJabatan,
    displaySkopSemakans,
    filterSkopKriteriasBySkopSemakan,
    filterAktivitiSemakansBySkopKriteria,
    filterKriteriaKetidakpatuhansByAktivitiSemakan,
  ]);

  const handleWilayahChange = (e) => {
    const selectedWilayahId = e.target.value;
    setValue("wilayahId", selectedWilayahId);
    filterCawangansByWilayah(selectedWilayahId);
  };

  const handleBahagianChange = (e) => {
    const selectedBahagianId = e.target.value;
    setValue("bahagianId", selectedBahagianId);
    filterJabatansByBahagian(selectedBahagianId);
  };

  const handleJabatanChange = (e) => {
    const selectedJabatanId = e.target.value;
    setValue("jabatanId", selectedJabatanId);
    filterUnitsByJabatan(selectedJabatanId);
  };

  const handleSkopSemakanChange = (e) => {
    const selectedSkopSemakanId = e.target.value;
    setValue("skopSemakanId", selectedSkopSemakanId);
    filterSkopKriteriasBySkopSemakan(selectedSkopSemakanId);
  };

  const handleSkopKriteriaChange = (e) => {
    const selectedSkopKriteriaId = e.target.value;
    setValue("skopKriteriaId", selectedSkopKriteriaId);
    filterAktivitiSemakansBySkopKriteria(selectedSkopKriteriaId);
  };

  const handleAktivitiSemakanChange = (e) => {
    const selectedAktivitiSemakanId = e.target.value;
    setValue("aktivitiSemakanId", selectedAktivitiSemakanId);
    filterKriteriaKetidakpatuhansByAktivitiSemakan(selectedAktivitiSemakanId);
  };

  return (
    <>
      <div className="page-title">
        <h2>Laporan Individu</h2>
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
                              handleWilayahChange(e);
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
                            {filteredCawanganOptions
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
                                  handleBahagianChange(e);
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
                                  handleJabatanChange(e);
                                }}
                                value={value}
                              >
                                <option value="">Pilih jabatan</option>
                                {filteredJabatanOptions
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
                                {filteredUnitOptions
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
                        <Form.Label>Tarikh Mesyuarat Penutup</Form.Label>
                        <Controller
                          name="tarikhAudit"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: "Sila sertakan tarikh mesyuarat penutup",
                          }}
                          render={({ field }) => (
                            <>
                              <Form.Control
                                type="date"
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
                                  handleSkopSemakanChange(e);
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
                                  handleSkopKriteriaChange(e);
                                }}
                                value={value}
                              >
                                <option value="">Pilih skop kriteria</option>
                                {filteredSkopKriteriaOptions
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
                                  handleAktivitiSemakanChange(e);
                                }}
                                value={value}
                              >
                                <option value="">Pilih aktiviti semakan</option>
                                {filteredAktivitiSemakanOptions
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
                              {filteredKriteriaKetidakpatuhanOptions
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
                                  label="Tinggi"
                                  value="TINGGI"
                                  id="radioHigh"
                                  checked={field.value === "TINGGI"}
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
                                  label="Sederhana"
                                  value="SEDERHANA"
                                  id="radioMid"
                                  checked={field.value === "SEDERHANA"}
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
                                  label="Rendah"
                                  value="RENDAH"
                                  id="radioLow"
                                  checked={field.value === "RENDAH"}
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
                    <Button type="submit" className="tambah-ketidakpatuhan-btn">
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
