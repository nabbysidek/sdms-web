import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateJabatan from "./Create";
import EditJabatan from "./Edit";

function IndexJabatan() {
  return (
    <>
      {/* Page title section */}
      <h2>Jabatan</h2>
      <hr />
      <h3 className="pageTitle">Tambah Jabatan</h3>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Jabatan</h4>
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
      </div>
    </>
  );
}

export default IndexJabatan;
