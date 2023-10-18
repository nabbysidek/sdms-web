import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateKriteriaKetidakpatuhan from "./Create";
import EditKriteriaKetidakpatuhan from "./Edit";

function IndexKriteriaKetidakpatuhan() {
  return (
    <>
      {/* Page title section */}
      <h2>Kriteria Ketidakpatuhan</h2>
      <hr />
      <h3 className="pageTitle">Tambah Kriteria Ketidakpatuhan</h3>

      {/* Page title section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Kriteria Ketidakpatuhan</h4>
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
      </div>
    </>
  );
}

export default IndexKriteriaKetidakpatuhan;
