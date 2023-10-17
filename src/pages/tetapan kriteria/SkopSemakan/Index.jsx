import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateSkopSemakan from "./Create";
import EditSkopSemakan from "./Edit";

function IndexSkopSemakan() {
  return (
    <>
      {/* Page header */}
      <h1>SkopSemakan</h1>
      <hr />
      <h2>Tambah SkopSemakan</h2>

      <h3>Senarai SkopSemakan</h3>
      <CreateSkopSemakan />
      <hr />

      {/* Table Senarai Skop Semakan */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Skop Semakan</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{/* Bilangan */}</td>
            <td>{/* Nama Jenis Skop Semakan */}</td>
            <td>
              <EditSkopSemakan />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default IndexSkopSemakan;
