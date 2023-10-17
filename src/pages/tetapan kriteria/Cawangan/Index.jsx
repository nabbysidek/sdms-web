import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateCawangan from "./Create";
import EditCawangan from "./Edit";

function IndexCawangan() {
  return (
    <>
      {/* Page header */}
      <h1>Cawangan</h1>
      <hr />
      <h2>Tambah Cawangan</h2>

      <h3>Senarai Cawangan</h3>
      <CreateCawangan />
      <hr />

      {/* Table Senarai Cawangan */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Wilayah</th>
            <th>Cawangan</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{/* Bilangan */}</td>
            <td>{/* Pull from table Wilayah */}</td>
            <td>{/* Cawangan */}</td>
            <td>
              <EditCawangan />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default IndexCawangan;
