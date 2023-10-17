import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateJenisAudit from "./Create";
import EditJenisAudit from "./Edit";

function IndexJenisAudit() {
  return (
    <>
      {/* Page header */}
      <h1>Jenis Audit</h1>
      <hr />
      <h2>Tambah Jenis Audit</h2>

      <h3>Senarai Jenis Audit</h3>
      <CreateJenisAudit />
      <hr />

      {/* Table Senarai Jenis Audit */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Jenis Audit</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{/* Bilangan */}</td>
            <td>{/* Nama Jenis Audit */}</td>
            <td>
              <EditJenisAudit />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default IndexJenisAudit;
