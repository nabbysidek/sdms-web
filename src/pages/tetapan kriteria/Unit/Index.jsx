import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateUnit from "./Create";
import EditUnit from "./Edit";

function IndexUnit() {
  return (
    <>
      {/* Page header */}
      <h1>Unit</h1>
      <hr />
      <h2>Tambah Unit</h2>

      <h3>Senarai Unit</h3>
      <CreateUnit />
      <hr />

      {/* Table Senarai Unit */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Bahagian</th>
            <th>Jabatan</th>
            <th>Unit</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{/* Bilangan */}</td>
            <td>{/* Pull from table Bahagian */}</td>
            <td>{/* Pull from table Jabatan */}</td>
            <td>{/* Unit */}</td>
            <td>
              <EditUnit />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default IndexUnit;
