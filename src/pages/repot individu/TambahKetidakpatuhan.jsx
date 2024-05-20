import { useForm, Controller } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../assets/styles/styles_repot_individu.css";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function TambahKetidakpatuhan() {
  // ------- FE -------------
  // Form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const createRepotIndividu = async (repotIndividuInput) => {
    try {
      const response = await axiosCustom.post(
        `repot-individu/ketidakpatuhan-kakitangan`,
        repotIndividuInput
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, 
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error,  
      });
    }
  }

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
          {/* Form Tambah ketidakpatuhan */}
          <div>
            <h4>Lokasi</h4>
            <hr />
            <Form onSubmit={handleSubmit(createRepotIndividu)} onReset={reset}>
              <Row>
                <Col xs={12} xl={6}>
                  <Form.Group>
                    <Form.Label>Wilayah</Form.Label>
                    <Controller
                      id="wilayahId"
                      name="wilayahId"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Sila pilih wilayah" }}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Form.Select
                            // aria-label="wilayahSelect"
                            onChange={onChange}
                            value={value}
                            // isInvalid={!!errors.wilayah}
                          >
                            <option value="">Pilih wilayah</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
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
                            // aria-label="cawanganSelect"
                            onChange={onChange}
                            value={value}
                            // isInvalid={!!errors.cawangan}
                          >
                            <option value="">Pilih cawangan</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
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
                          id="jawatanStaff"
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
                                // isInvalid={!!errors.jawatanStaff}
                              />
                              {errors.jawatanStaff && (
                                <span className="error-message">
                                  {errors.jawatanStaff.message}
                                </span>
                              )}
                              {/* <Form.Control.Feedback type="invalid">
                                {errors.jawatanStaff &&
                                  errors.jawatanStaff.message}
                              </Form.Control.Feedback> */}
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
                                onChange={onChange}
                                value={value}
                                // isInvalid={!!errors.bahagian}
                              >
                                <option value="">Pilih bahagian</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
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
                                onChange={onChange}
                                value={value}
                                // aria-label="jabatanSelect"
                                // {...field}
                                // isInvalid={!!errors.jabatan}
                              >
                                <option value="">Pilih jabatan</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
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
                                onChange={onChange}
                                value={value}
                                // aria-label="unitSelect"
                                // {...field}
                                // isInvalid={!!errors.unit}
                              >
                                <option value="">Pilih unit</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
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
                                onChange={onChange}
                                value={value}
                                // aria-label="jenisAuditSelect"
                                // {...field}
                                // isInvalid={!!errors.jenisAudit}
                              >
                                <option value="">Pilih jenis audit</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
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
                                onChange={onChange}
                                value={value}
                                // aria-label="skopSemakanSelect"
                                // {...field}
                                // isInvalid={!!errors.jenisAudit}
                              >
                                <option value="">Pilih skop semakan</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
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
                                onChange={onChange}
                                value={value}
                                // aria-label="skopKriteriaKetidakpatuhanSelect"
                                // {...field}
                                // isInvalid={!!errors.skopKriteriaKetidakpatuhan}
                              >
                                <option value="">
                                  Pilih skop kriteria ketidakpatuhan
                                </option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
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
                                onChange={onChange}
                                value={value}
                                // aria-label="aktivitiSemakanSelect"
                                // {...field}
                                // isInvalid={!!errors.aktivitiSemakan}
                              >
                                <option value="">Pilih aktiviti semakan</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
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
                              onChange={onChange}
                              value={value}
                              // aria-label="kriteriaKetidakpatuhanSelect"
                              // {...field}
                              // isInvalid={!!errors.kriteriaKetidakpatuhan}
                            >
                              <option value="">
                                Pilih kriteria ketidakpatuhan
                              </option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
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
                        <Row className="radio-tambah-ketidakpatuhan">
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
                  <div className="tambah-ketidakpatuhan-actions">
                    <Button
                      onClick={handleSubmit(createRepotIndividu)}
                      className="tambah-ketidakpatuhan-btn"
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

export default TambahKetidakpatuhan;
