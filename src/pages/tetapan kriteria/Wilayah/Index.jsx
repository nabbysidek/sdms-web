import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import CreateWilayah from "./Create";
import EditWilayah from "./Edit";

function IndexWilayah() {
  return (
    <>
      {/* Page title section */}
      <h2>Wilayah</h2>
      <hr />
      <h3 className="pageTitle">Tambah Wilayah</h3>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Wilayah</h4>
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
      </div>
    </>
  );
}

export default IndexWilayah;
