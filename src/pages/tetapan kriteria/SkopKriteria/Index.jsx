import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateSkopKriteria from "./Create";
import EditSkopKriteria from "./Edit";

function IndexSkopKriteria() {
  return (
    <>
      {/* Page header */}
      <h1>SkopKriteria</h1>
      <hr />
      <h2>Tambah SkopKriteria</h2>

      <h3>Senarai SkopKriteria</h3>
      <CreateSkopKriteria />
      <hr />

      {/* Table Senarai Skop Kriteria */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Skop Kriteria</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{/* Bilangan */}</td>
            <td>{/* Nama Jenis Skop Kriteria */}</td>
            <td>
              <EditSkopKriteria />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default IndexSkopKriteria;
