import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useRepotIndividuStore from "../../store/repot-individu-store";
import { useOptionStore } from "../../store/option-store";
import "../../assets/styles/styles_repot_individu.css";

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
  const { handleCreateRepotIndividu } = useRepotIndividuStore();

  const onSubmit = (data) => {
    handleCreateRepotIndividu(data);
  }

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

  // const createRepotIndividu = async (repotIndividuInput) => {
  //   try {
  //     const response = await axiosCustom.post(
  //       `repot-individu/ketidakpatuhan-kakitangan`,
  //       repotIndividuInput
  //     );

  //     if (response.status === 200) {
  //       console.log('Berjaya')
  //       Swal.fire({
  //         icon: "success",
  //         title: "Berjaya",
  //         text: response.data.success,
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Gagal",
  //       text: error.response.data.error,
  //     });
  //   }
  // };

  return (
    <>
      <div className="page-title">
        <h2>Repot Individu</h2>
        <hr />
        <h3>Tambah Ketidakpatuhan Kakitangan</h3>
      </div>
      <div className="tambah-ketidakpatuhan-form-container">
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
            <Form
              onSubmit={handleSubmit(onSubmit)}
              onReset={reset}
            >
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
                              setSelectedWilayah(e.target.value);
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
                          id="jawatanKakitangan"
                          control={control}
                          defaultValue=""
                          rules={{
                            required:
                              "Sila sertakan jawatan kakitangan sewaktu diaudit",
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
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedBahagian(e.target.value);
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
                          id="tarikhAudit"
                          name="tarikhAudit"
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
                          </>
                        )}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group>
                      <Form.Label>Tahap Risiko</Form.Label>
                      <div>
                        <Row className="radio-tambah-ketidakpatuhan">
                          <Col>
                            <Controller
                              name="tahapRisikoAudit"
                              control={control}
                              rules={{ required: true }}
                              defaultValue="Biasa"
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
                              defaultValue="Tidak"
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

export default TambahKetidakpatuhan;
