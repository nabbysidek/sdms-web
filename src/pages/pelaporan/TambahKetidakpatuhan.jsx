import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../assets/styles/styles_pelaporan.css";

function TambahKetidakpatuhan() {
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

  return (
    <>
      <div className="page-title">
        <h2>Pelaporan</h2>
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
          <div className="location-container">
            <h4>Lokasi</h4>
            <hr />
            <div>
              <Row>
                <Col xs={12} xl={6}>
                  <Form>
                    <Form.Group>
                      <Form.Label>Wilayah</Form.Label>
                      <Controller
                        name="wilayah"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Sila pilih wilayah" }}
                        render={({ field }) => (
                          <>
                            <Form.Select
                              aria-label="wilayahSelect"
                              {...field}
                              isInvalid={!!errors.wilayah}
                            >
                              <option value="">Pilih wilayah</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.wilayah && errors.wilayah.message}
                            </Form.Control.Feedback>
                          </>
                        )}
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col xs={12} xl={6}>
                  <Form>
                    <Form.Group>
                      <Form.Label>Cawangan</Form.Label>
                      <Controller
                        name="cawangan"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Sila pilih cawangan" }}
                        render={({ field }) => (
                          <>
                            <Form.Select
                              aria-label="cawanganSelect"
                              {...field}
                              isInvalid={!!errors.cawangan}
                            >
                              <option value="">Pilih cawangan</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.cawangan && errors.cawangan.message}
                            </Form.Control.Feedback>
                          </>
                        )}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
          <div className="maklumat-terperinci-container">
            <h4>Maklumat Kakitangan Terperinci</h4>
            <hr />
            <div>
              <Row>
                <Col>
                  <Form>
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
                  </Form>
                </Col>
                <Col>
                  <Form>
                    <Form.Group>
                      <Form.Label>Bahagian</Form.Label>
                      <Controller
                        name="bahagian"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Sila pilih bahagian" }}
                        render={({ field }) => (
                          <>
                            <Form.Select
                              aria-label="bahagianSelect"
                              {...field}
                              isInvalid={!!errors.bahagian}
                            >
                              <option value="">Pilih bahagian</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.bahagian && errors.bahagian.message}
                            </Form.Control.Feedback>
                          </>
                        )}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Jabatan</Form.Label>
                    <Controller
                      name="jabatan"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Sila pilih jabatan" }}
                      render={({ field }) => (
                        <>
                          <Form.Select
                            aria-label="jabatanSelect"
                            {...field}
                            isInvalid={!!errors.jabatan}
                          >
                            <option value="">Pilih jabatan</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.jabatan && errors.jabatan.message}
                          </Form.Control.Feedback>
                        </>
                      )}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Unit</Form.Label>
                    <Controller
                      name="unit"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Sila pilih unit" }}
                      render={({ field }) => (
                        <>
                          <Form.Select
                            aria-label="unitSelect"
                            {...field}
                            isInvalid={!!errors.unit}
                          >
                            <option value="">Pilih unit</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.unit && errors.unit.message}
                          </Form.Control.Feedback>
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
                  <Form>
                    <Form.Group>
                      <Form.Label>Tahun Diaudit</Form.Label>
                      <Controller
                        name="tahunDiaudit"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Sila sertakan tahun staff diaudit",
                          pattern: {
                            value: /^\d{4}$/,
                            message: "Please enter a valid year (YYYY)",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <Form.Control
                              type="text"
                              placeholder="Tahun"
                              {...field}
                              isInvalid={!!errors.tahunDiaudit}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.tahunDiaudit &&
                                errors.tahunDiaudit.message}
                            </Form.Control.Feedback>
                          </>
                        )}
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Form>
                    <Form.Group>
                      <Form.Label>Jenis Audit</Form.Label>
                      <Controller
                        name="jenisAudit"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Sila pilih jenis audit" }}
                        render={({ field }) => (
                          <>
                            <Form.Select
                              aria-label="jenisAuditSelect"
                              {...field}
                              isInvalid={!!errors.jenisAudit}
                            >
                              <option value="">Pilih jenis audit</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.jenisAudit && errors.jenisAudit.message}
                            </Form.Control.Feedback>
                          </>
                        )}
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Form>
                    <Form.Group>
                      <Form.Label>Skop Kriteria Ketidakpatuhan</Form.Label>
                      <Controller
                        name="skopKriteriaKetidakpatuhan"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Sila pilih skop kriteria ketidakpatuhan",
                        }}
                        render={({ field }) => (
                          <>
                            <Form.Select
                              aria-label="skopKriteriaKetidakpatuhanSelect"
                              {...field}
                              isInvalid={!!errors.skopKriteriaKetidakpatuhan}
                            >
                              <option value="">
                                Pilih skop kriteria ketidakpatuhan
                              </option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.skopKriteriaKetidakpatuhan &&
                                errors.skopKriteriaKetidakpatuhan.message}
                            </Form.Control.Feedback>
                          </>
                        )}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Form>
                  <Form.Group>
                    <Form.Label>Tajuk Audit</Form.Label>
                    <Controller
                      name="tajukAudit"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Sila sertakan tajuk audit" }}
                      render={({ field }) => (
                        <>
                          <Form.Control
                            type="text"
                            placeholder="Tajuk audit"
                            {...field}
                            isInvalid={!!errors.tajukAudit}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.tajukAudit && errors.tajukAudit.message}
                          </Form.Control.Feedback>
                        </>
                      )}
                    />
                  </Form.Group>
                </Form>
              </Row>
              <Row>
                <Form>
                  <Form.Group>
                    <Form.Label>Tahap Risiko</Form.Label>
                    <div>
                      <Row className="radio-tambah-ketidakpatuhan">
                        <Col>
                          <Form.Check
                            type="radio"
                            label="Penipuan"
                            name="tahapRisikoRadio"
                            id="radioFraud"
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            type="radio"
                            label="Serah Dokumen"
                            name="tahapRisikoRadio"
                            id="radioSerahDoc"
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            type="radio"
                            label="Biasa"
                            name="tahapRisikoRadio"
                            id="radioBiasa"
                            defaultChecked
                          />
                        </Col>
                      </Row>
                    </div>
                  </Form.Group>
                </Form>
              </Row>
              <Row>
                <Form>
                  <Form.Group>
                    <Form.Label>Skop Semakan</Form.Label>
                    <Controller
                      name="skopSemakan"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Sila pilih skop semakan" }}
                      render={({ field }) => (
                        <>
                          <Form.Select
                            aria-label="skopSemakanSelect"
                            {...field}
                            isInvalid={!!errors.jenisAudit}
                          >
                            <option value="">Pilih skop semakan</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.skopSemakan && errors.skopSemakan.message}
                          </Form.Control.Feedback>
                        </>
                      )}
                    />
                  </Form.Group>
                </Form>
              </Row>
              <Row>
                <Form>
                  <Form.Group>
                    <Form.Label>Senarai Ketidakpatuhan</Form.Label>
                    <Controller
                      name="senaraiKetidakpatuhan"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Sila pilih ketidakpatuhan" }}
                      render={({ field }) => (
                        <>
                          <Form.Select
                            aria-label="senaraiKetidakpatuhanSelect"
                            {...field}
                            isInvalid={!!errors.senaraiKetidakpatuhan}
                          >
                            <option value="">Pilih ketidakpatuhan</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.senaraiKetidakpatuhan &&
                              errors.senaraiKetidakpatuhan.message}
                          </Form.Control.Feedback>
                        </>
                      )}
                    />
                  </Form.Group>
                </Form>
              </Row>
              <Row>
                <Form>
                  <Form.Group>
                    <Form.Label>Catatan</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Form>
              </Row>
              <div className="tambah-ketidakpatuhan-actions">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  className="tambah-ketidakpatuhan-btn"
                >
                  Simpan
                </Button>{" "}
                <Button className="cancel-btn">Batal</Button>{" "}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default TambahKetidakpatuhan;
