import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateJabatan from "./Create";
import EditJabatan from "./Edit";

function IndexJabatan() {
  return (
    <>
      {/* Page header */}
      <h1>Jabatan</h1>
      <hr />
      <h2>Tambah Jabatan</h2>

      <h3>Senarai Jabatan</h3>
      <CreateJabatan />
      <hr />

      {/* Table Senarai Jabatan */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Bahagian</th>
            <th>Jabatan</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{/* Bilangan */}</td>
            <td>{/* Pull from table Bahagian */}</td>
            <td>{/* Jabatan */}</td>
            <td>
              <EditJabatan />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default IndexJabatan;
