import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateWilayah from "./Create";
import EditWilayah from "./Edit";

function IndexWilayah() {
  return (
    <>
      {/* Page header */}
      <h1>Wilayah</h1>
      <hr />
      <h2>Tambah Wilayah</h2>

      <h3>Senarai Wilayah</h3>
      <CreateWilayah />
      <hr />

      {/* Table Senarai Wilayah */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Wilayah</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{/* Bilangan */}</td>
            <td>{/* Nama Wilayah */}</td>
            <td>
              <EditWilayah />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default IndexWilayah;
