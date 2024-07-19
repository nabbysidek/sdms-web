import { Link } from "react-router-dom";
import { Table, Row, Col, Form, Button, Container } from "react-bootstrap";
import ExportButton from "../../components/functional buttons/ExportBtn";
import ImportButton from "../../components/functional buttons/ImportBtn";
import "../../assets/styles/styles_repot_individu.css";

function SearchResultUntukRepotIndividu({ searchResults }) {
  // fetch to display data
  const { maklumatKakitangan, senaraiKetidakpatuhanKakitangan } = searchResults;
console.log(maklumatKakitangan.id);
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
                <Form.Control
                  type="text"
                  value={maklumatKakitangan.namaKakitangan}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>ID Kakitangan</Form.Label>
                <Form.Control
                  type="text"
                  value={maklumatKakitangan.idKakitangan}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>

      <Container fluid>
        <div className="repot-table">
          <Row>
            <Col md={10}>
              <h3 className="repot-table-title">
                Senarai Ketidakpatuhan Kakitangan
              </h3>
            </Col>
            <Col md={2}>
              <Link
                to="/tambahketidakpatuhan"
                state={{
                  id: maklumatKakitangan.id,
                  namaKakitangan: maklumatKakitangan.namaKakitangan,
                  idKakitangan: maklumatKakitangan.idKakitangan,
                }}
              >
                <Button className="to-page-tambah-ketidakpatuhan-btn">
                  Tambah
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
                senaraiKetidakpatuhanKakitangan.data.map((audits, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{audits.tahapRisikoAudit}</td>
                    <td>{audits.kesalahanBerulang}</td>
                    <td>{audits.tarikhAudit}</td>
                    <td>{audits.wilayah.namaWilayah}</td>
                    <td>{audits.cawangan.namaCawangan}</td>
                    <td>{audits.jawatanKakitangan}</td>
                    <td>{audits.bahagian.namaBahagian}</td>
                    <td>{audits.jabatan.namaJabatan}</td>
                    <td>{audits.unit.namaUnit}</td>
                    <td>{audits.jenis_audit.namaJenisAudit}</td>
                    <td>{audits.skop_semakan.namaSkopSemakan}</td>
                    <td>{audits.skop_kriteria.namaSkopKriteria}</td>
                    <td>{audits.aktiviti_semakan.namaAktivitiSemakan}</td>
                    <td>
                      {audits.kriteria_ketidakpatuhan.namaKriteriaKetidakpatuhan}
                    </td>
                    <td>{audits.catatanAudit}</td>
                    <td>
                      <Link
                        to="/editketidakpatuhan"
                        state={{
                          id: maklumatKakitangan.id,
                          namaKakitangan: maklumatKakitangan.namaKakitangan,
                          idKakitangan: maklumatKakitangan.idKakitangan,
                          audits: audits,
                        }}
                      >
                        <Button className="edit-ketidakpatuhan-btn">
                          Edit
                        </Button>
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
