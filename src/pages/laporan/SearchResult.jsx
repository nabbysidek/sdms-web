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
              <th>Tahun</th>
              <th>Wilayah</th>
              <th>Cawangan</th>
              <th>Kesalahan Berulang</th>
              <th>Jenis Audit</th>
              <th>Skop Semakan</th>
              <th>Skop Kriteria</th>
              <th>Aktiviti Semakan</th>
              <th>Kriteria Ketidakpatuhan</th>
              <th>Nama Kakitangan</th>
              <th>Jawatan Kakitangan</th>
              <th>Bahagian</th>
              <th>Jabatan</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{/* Bilangan */}</td>
              <td>{/* Tahun */}</td>
              <td>{/* Wilayah */}</td>
              <td>{/* Cawangan */}</td>
              <td>{/* Sekalahan Berulang */}</td>
              <td>{/* Jenis Audit */}</td>
              <td>{/* Skop Semakan */}</td>
              <td>{/* Skop Kriteria */}</td>
              <td>{/* Aktiviti Semakan */}</td>
              <td>{/* Kriteria Ketidakpatuhan */}</td>
              <td>{/* Nama Kakitangan */}</td>
              <td>{/* Jawatan Kakitangan */}</td>
              <td>{/* Bahagian */}</td>
              <td>{/* Jabatan */}</td>
              <td>{/* Unit */}</td>
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
