import { Link } from "react-router-dom";
import { Table, Row, Col, Form, Button, Container } from "react-bootstrap";
import ExportButton from "../../components/functional buttons/ExportBtn";
import ImportButton from "../../components/functional buttons/ImportBtn";
import "../../assets/styles/styles_pelaporan.css";

function SearchResultPelaporan() {
  return (
    <>
      <div className="kakitangan-info-container">
        <div className="page-title">
          <h4>Maklumat Kakitangan</h4>
          <hr />
        </div>
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

      <Container fluid>
        <div className="pelaporan-table">
          <Row>
            <Col md={7}>
              <h4 className="pelaporan-table-title">
                Senarai Ketidakpatuhan Kakitangan
              </h4>
            </Col>
            <Col md={5}>
              <Link to="/tambahketidakpatuhan">
                <Button className="to-page-tambah-ketidakpatuhan-btn">
                  Tambah Ketidakpatuhan Kakitangan
                </Button>
              </Link>
            </Col>
          </Row>
        </div>

        <hr />

        <div>
          <Table responsive>
            <thead>
              <tr>
                <th>Bil</th>
                <th>Risiko</th>
                <th>Wilayah</th>
                <th>Cawangan</th>
                <th>Jawatan</th>
                <th>Bahagian</th>
                <th>Jabatan</th>
                <th>Unit</th>
                <th>Jenis Audit</th>
                <th>Skop Kriteria</th>
                <th>Skop Semakan</th>
                <th>Kriteria Ketidakpatuhan</th>
                <th>Tahun Audit</th>
                <th>Tajuk Audit</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Fraud</td>
                <td>Kelantan</td>
                <td>Kota Bharu</td>
                <td>PA</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>A</td>
                <td>Skop 1</td>
                <td>Skop 2</td>
                <td>Kriteria Ketidakpatuhan A</td>
                <td>2015</td>
                <td>Testing</td>
                <td>Catatan</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div className="functional-btns-container">
          <ExportButton />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default SearchResultPelaporan;
