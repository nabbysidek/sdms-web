import { Link } from "react-router-dom";
import { Table, Row, Col, Form, Button, Container } from "react-bootstrap";
import ExportButton from "../../components/functional buttons/ExportBtn";
import ImportButton from "../../components/functional buttons/ImportBtn";
import "../../assets/styles/styles_repot_individu.css";

function SearchResultUntukRepotIndividu() {
  return (
    <>
      <div className="kakitangan-info-container">
        <div className="page-title">
          <h3>Maklumat Kakitangan</h3>
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
        <div className="repot-table">
          <Row>
            <Col md={7}>
              <h3 className="repot-table-title">
                Senarai Ketidakpatuhan Kakitangan
              </h3>
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
                <th>Tahun</th>
                <th>Wilayah</th>
                <th>Cawangan</th>
                <th>Jawatan</th>
                <th>Bahagian</th>
                <th>Jabatan</th>
                <th>Unit</th>
                <th>Jenis Audit</th>
                <th>Skop Semakan</th>
                <th>Skop Kriteria</th>
                <th>Aktiviti Semakan</th>
                <th>Kriteria Ketidakpatuhan</th>
                <th>Catatan</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Fraud</td>
                <td>2015</td>
                <td>Kelantan</td>
                <td>Kota Bharu</td>
                <td>PA</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>A</td>
                <td>Skop 1</td>
                <td>Skop 2</td>
                <td>Aktiviti Semakan</td>
                <td>Kriteria Ketidakpatuhan A</td>
                <td>Catatan</td>
                <td>
                  <Link to="/editketidakpatuhan">
                    <Button className="edit-ketidakpatuhan-btn">
                      Edit
                    </Button>
                  </Link>
                  <Button className="delete-btn">Padam</Button>
                </td>
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

export default SearchResultUntukRepotIndividu;
