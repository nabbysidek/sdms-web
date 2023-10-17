import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateKakitangan from "./Create";
import EditKakitangan from "./Edit";

function IndexKakitangan() {
  return (
    <>
      {/* Page header */}
      <h1>Kakitangan</h1>
      <hr />
      <h2>Tambah Kakitangan</h2>

      <h3>Senarai Kakitangan</h3>
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
    </>
  );
}

export default IndexKakitangan;
