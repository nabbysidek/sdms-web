import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateKriteriaKetidakpatuhan from "./Create";
import EditKriteriaKetidakpatuhan from "./Edit";

function IndexKriteriaKetidakpatuhan() {
  return (
    <>
      {/* Page header */}
      <h1>Tetapan Kriteria</h1>
      <hr />
      <h2>Tambah Kriteria Ketidakpatuhan</h2>

      <h3>Senarai Kriteria Ketidakpatuhan</h3>
      <CreateKriteriaKetidakpatuhan />
      <hr />

      {/* Table Senarai Kriteria Ketidakpatuhan */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Skop Kriteria</th>
            <th>Nama Kriteria Ketidakpatuhan</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{/* Bilangan */}</td>
            <td>{/* Skop Kriteria */}</td>
            <td>{/* Nama kriteria ketidakpatuhan */}</td>
            <td>
              <EditKriteriaKetidakpatuhan />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default IndexKriteriaKetidakpatuhan;
