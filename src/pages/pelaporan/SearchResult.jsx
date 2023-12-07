import { Link } from "react-router-dom";
import { Table, Row, Col, Form, Button } from "react-bootstrap";
import DownloadButton from "../../components/functional buttons/DownloadButton";
import ExportButton from "../../components/functional buttons/ExportButton";
import ImportButton from "../../components/functional buttons/ImportButton";
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
                <th>Wilayah</th>
                <th>Cawangan</th>
                <th>Jawatan</th>
                <th>Bahagian</th>
                <th>Jabatan</th>
                <th>Unit</th>
                <th>Jenis Audit</th>
                <th>Tahun</th>
                <th>Skop Semakan</th>
                <th>Skop Kesalahan</th>
                <th>Kesalahan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{/* Bilangan */}</td>
                <td>{/* Wilayah */}</td>
                <td>{/* Cawangan */}</td>
                <td>{/* Jawatan */}</td>
                <td>{/* Bahagian */}</td>
                <td>{/* Jabatan */}</td>
                <td>{/* Unit */}</td>
                <td>{/* Jenis Audit */}</td>
                <td>{/* Tahun */}</td>
                <td>{/* Skop Semakan */}</td>
                <td>{/* Skop Kesalahan */}</td>
                <td>{/* Kesalahan */}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* Functional buttons */}
        <div className="functionalBtnsSection">
          <ExportButton />
          <ImportButton />
          <DownloadButton />
        </div>
      </div>
    </>
  );
}

export default SearchResultPelaporan;
