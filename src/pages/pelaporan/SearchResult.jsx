import { Link } from "react-router-dom";
import { Table, Row, Col, Form, Button } from "react-bootstrap";
import ExportButton from "../../components/functional buttons/ExportBtn";
import ImportButton from "../../components/functional buttons/ImportBtn";
import "./Pelaporan.css";

function SearchResultPelaporan() {
  return (
    <>
      <div className="kakitanganInfoSection">
        <div className="pageTitle">
          <h4>Maklumat Kakitangan</h4>
          <hr />
        </div>
        <div className="kakitanganInfo">
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

      <div className="container-fluid">
        <div className="tableSection">
          <Row>
            <Col md={8}>
              <h4 className="tableTitle">Senarai Ketidakpatuhan Kakitangan</h4>
            </Col>
            <Col md={4}>
              <Link to="/tambahketidakpatuhan">
                <Button className="redirectTambahKetidakpatuhanBtn">
                  Tambah Ketidakpatuhan Kakitangan
                </Button>
              </Link>
            </Col>
          </Row>
        </div>

        <hr />
        <div className="tableSearchResult">
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

        {/* Functional buttons */}
        <div className="functionalBtnsSection">
          <ExportButton />
          <ImportButton />
        </div>
      </div>
    </>
  );
}

export default SearchResultPelaporan;
