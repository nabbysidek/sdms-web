import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateJenisAudit from "./Create";
import EditJenisAudit from "./Edit";

function IndexJenisAudit() {
  return (
    <>
      {/* Page title section */}
      <h2>Jenis Audit</h2>
      <hr />
      <h3 className="pageTitle">Tambah Jenis Audit</h3>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Jenis Audit</h4>
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
      </div>
    </>
  );
}

export default IndexJenisAudit;
