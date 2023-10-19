import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function TambahKetidakpatuhan() {
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
                  <Form.Control type="text" placeholder="Masukkan wilayah" />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Cawangan</Form.Label>
                  <Form.Control type="text" placeholder="Masukkan cawangan" />
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
                  <Form.Control type="text" placeholder="Masukkan jabatan" />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Bahagian</Form.Label>
                  <Form.Control type="text" placeholder="Masukkan bahagian" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Unit</Form.Label>
                  <Form.Control type="text" placeholder="Masukkan unit" />
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
                  <Form.Control type="text" placeholder="Tahun" />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Jenis Audit</Form.Label>
                  <Form.Control type="text" placeholder="Jenis Audit" />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Skop Kriteria Ketidakpatuhan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Skop kriteria ketidakpatuhan"
                  />
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
                <Form.Control type="text" placeholder="Tajuk audit" />
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <Form>
              <Form.Group>
                <Form.Label>Skop Semakan</Form.Label>
                <Form.Control type="text" placeholder="Tajuk audit" />
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <Form>
              <Form.Group>
                <Form.Label>Senarai Kesalahan</Form.Label>
                <Form.Control type="text" placeholder="Tajuk audit" />
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
      <Button variant="primary">Primary</Button>{" "}
      <Button variant="secondary">Secondary</Button>{" "}
    </>
  );
}

export default TambahKetidakpatuhan;
