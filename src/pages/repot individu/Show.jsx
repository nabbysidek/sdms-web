import { Link } from "react-router-dom";
import { Table, Row, Col, Form, Button, Container } from "react-bootstrap";
import ExportButton from "../../components/functional buttons/ExportBtn";
import ImportButton from "../../components/functional buttons/ImportBtn";
import "../../assets/styles/styles_repot_individu.css";

function SearchResultUntukRepotIndividu({ searchResults }) {
  // fetch to display data
  const { maklumatKakitangan, senaraiKetidakpatuhanKakitangan } = searchResults;

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
                <Form.Control type="text" value={maklumatKakitangan.namaKakitangan} disabled />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>ID Kakitangan</Form.Label>
                <Form.Control type="text" value={maklumatKakitangan.idKakitangan} disabled />
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>

      <Container fluid>
        <div className="repot-table">
          <Row>
            <Col md={10}>
              <h3 className="repot-table-title">Senarai Ketidakpatuhan Kakitangan</h3>
            </Col>
            <Col md={2}>
              <Link to="/tambahketidakpatuhan">
                <Button className="to-page-tambah-ketidakpatuhan-btn">Tambah</Button>
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
                <th>Kesalahan Berulang</th>
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
              {senaraiKetidakpatuhanKakitangan.data.length > 0 &&
                senaraiKetidakpatuhanKakitangan.data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.tahapRisikoAudit}</td>
                    <td>{item.kesalahanBerulang ? "YA" : "TIDAK"}</td>
                    {/* <td>{item.kesalahanBerulang}</td> */}
                    <td>{item.tarikhAudit}</td>
                    <td>{item.wilayah.namaWilayah}</td>
                    <td>{item.cawangan.namaCawangan}</td>
                    <td>{item.jawatanKakitangan}</td>
                    <td>{item.bahagian.namaBahagian}</td>
                    <td>{item.jabatan.namaJabatan}</td>
                    <td>{item.unit.namaUnit}</td>
                    <td>{item.jenis_audit.namaJenisAudit}</td>
                    <td>{item.skop_semakan.namaSkopSemakan}</td>
                    <td>{item.skop_kriteria.namaSkopKriteria}</td>
                    <td>{item.aktiviti_semakan.namaAktivitiSemakan}</td>
                    <td>{item.kriteria_ketidakpatuhan.namaKriteriaKetidakpatuhan}</td>
                    <td>{item.catatanAudit}</td>
                    <td>
                      <Link to="/editketidakpatuhan">
                        <Button className="edit-ketidakpatuhan-btn">Edit</Button>
                      </Link>
                      <Button className="delete-btn">Padam</Button>
                    </td>
                  </tr>
                ))}
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
