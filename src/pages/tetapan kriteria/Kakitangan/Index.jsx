import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateKakitangan from "./Create";
import EditKakitangan from "./Edit";

function IndexKakitangan() {
  return (
    <>
      {/* Page title section */}
      <h2>Kakitangan</h2>
      <hr />
      <h3 className="pageTitle">Tambah Kakitangan</h3>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Kakitangan</h4>
        <CreateKakitangan />
        <hr />

        {/* Table Senarai Kakitangan */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>ID Kakitangan</th>
              <th>Nama Kakitangan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{/* Bilangan */}</td>
              <td>{/* ID Kakitangan */}</td>
              <td>{/* Nama Kakitangan */}</td>
              <td>
                <EditKakitangan />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default IndexKakitangan;
