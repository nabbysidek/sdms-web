import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateSkopSemakan from "./Create";
import EditSkopSemakan from "./Edit";

function IndexSkopSemakan() {
  return (
    <>
      {/* Page title section */}
      <h2>Skop Semakan</h2>
      <hr />
      <h3 className="pageTitle">Tambah Skop Semakan</h3>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Skop Semakan</h4>
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
      </div>
    </>
  );
}

export default IndexSkopSemakan;
