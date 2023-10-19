import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Form, Button } from "react-bootstrap";
import CreateKakitangan from "../tetapan kriteria/Kakitangan/Create";
import SearchLaporan from "./Search";
import SearchResultLaporan from "./SearchResult";

function Pelaporan() {
  return (
    <>
      {/* Page title section */}
      <h2 className="pageTitle">Pelaporan</h2>
      <hr />

      {/* Page search section */}
      <div className="container-fluid searchSection">
        <h4>Cari Kakitangan</h4>

        {/* Search function section */}
        <div className="container-fluid">
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="ID atau nama kakitangan"
              ></Form.Control>
            </Form.Group>
          </Form>
          <Button variant="primary">Cari</Button>{" "}
        </div>
        <CreateKakitangan />
      </div>

      <div className="pageTitle">
        <h4>Maklumat Kakitangan</h4>
        <hr />
        <div>
          <p>Nama kakitangan:</p>
          <p>ID kakitangan:</p>
        </div>
      </div>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Ketidakpatuhan Kakitangan</h4>
        <span>
          <Link to="/tambahketidakpatuhan">
            <button>Tambah Ketidakpatuhan Kakitangan</button>
          </Link>
        </span>

        <hr />
        {/* Table Senarai Pelaporan Ketidakpatuhan Kakitangan */}
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
    </>
  );
}

export default Pelaporan;
