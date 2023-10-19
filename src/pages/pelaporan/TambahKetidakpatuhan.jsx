import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

function TambahKetidakpatuhan() {
  // To manage the state for the datepicker
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      {/* Page title section */}
      <h2 className="pageTitle">Pelaporan</h2>
      <hr />
      <div className="pageTitle">
        <h2>Tambah Ketidakpatuhan Kakitangan</h2>
        <Container>
          <div className="staffInfo">
            <h4>Maklumat Kakitangan</h4>
            <hr />
            <div>
              <p>Nama kakitangan:</p>
              <p>ID kakitangan:</p>
            </div>
          </div>

          <Row>
            <h6>Lokasi</h6>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Wilayah</Form.Label>
                  <Form.Select aria-label="wilayahSelect">
                    <option>Pilih wilayah</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Cawangan</Form.Label>
                  <Form.Select aria-label="cawanganSelect">
                    <option>Pilih cawangan</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <hr />
          <Row>
            <h6>Maklumat Kakitangan Terperinci</h6>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Jawatan Kakitangan Waktu Audit</Form.Label>
                  <Form.Control type="text" placeholder="Masukkan jawatan" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Jabatan</Form.Label>
                  <Form.Select aria-label="jabatanSelect">
                    <option>Pilih jabatan</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Bahagian</Form.Label>
                  <Form.Select aria-label="bahagianSelect">
                    <option>Pilih bahagian</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Unit</Form.Label>
                  <Form.Select aria-label="unitSelect">
                    <option>Pilih unit</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <hr />
          <Row>
            <h6>Perincian Audit</h6>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Tahun Diaudit</Form.Label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Jenis Audit</Form.Label>
                  <Form.Select aria-label="jenisAuditSelect">
                    <option>Pilih jenis audit</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Skop Kriteria Ketidakpatuhan</Form.Label>
                  <Form.Select aria-label="skopKriteriaKetidakpatuhanSelect">
                    <option>Pilih skop kriteria</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Form>
              <Form.Group>
                <Form.Label>Tajuk Audit</Form.Label>
                <Form.Control type="text" placeholder="Tajuk audit" />
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <Form>
              <Form.Group>
                <Form.Label>Tahap Risiko</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="Penipuan"
                    name="tahapRisikoRadio"
                    id="radioFraud"
                  />
                  <Form.Check
                    type="radio"
                    label="Serah Dokumen"
                    name="tahapRisikoRadio"
                    id="radioSerahDoc"
                  />
                  <Form.Check
                    type="radio"
                    label="Biasa"
                    name="tahapRisikoRadio"
                    id="radioBiasa"
                  />
                </div>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <Form>
              <Form.Group>
                <Form.Label>Skop Semakan</Form.Label>
                <Form.Select aria-label="skopSemakanSelect">
                  <option>Pilih skop semakan</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <Form>
              <Form.Group>
                <Form.Label>Senarai Kesalahan</Form.Label>
                <Form.Select aria-label="senaraiKetidakpatuhanSelect">
                  <option>Pilih kriteria ketidakpatuhan</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <Form>
              <Form.Group>
                <Form.Label>Catatan</Form.Label>
                <Form.Control type="text" placeholder="Tajuk audit" />
              </Form.Group>
            </Form>
          </Row>
        </Container>
      </div>
      <Button variant="primary">Simpan</Button>{" "}
      <Button variant="secondary">Batal</Button>{" "}
    </>
  );
}

export default TambahKetidakpatuhan;
