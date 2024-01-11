import React from "react";
import { Container } from "react-bootstrap";
import ExportButton from "../../components/functional buttons/ExportBtn";
import ImportButton from "../../components/functional buttons/ImportBtn";
import Table from "react-bootstrap/Table";

function SearchResultLaporan() {
  return (
    <>
      <Container fluid>
        <h4 className="page-title">
          Senarai Laporan Ketidakpatuhan Kakitangan
        </h4>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Nama Kakitangan</th>
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
              <td>{/* Nama Kakitangan */}</td>
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

        {/* Functional buttons */}
        <div className="functional-btns-container">
          <ExportButton />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default SearchResultLaporan;
