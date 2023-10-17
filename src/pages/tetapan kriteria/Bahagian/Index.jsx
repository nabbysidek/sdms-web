import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateBahagian from "./Create";
import EditBahagian from "./Edit";

function IndexBahagian() {
  return (
    <>
      {/* Page header */}
      <h1>Bahagian</h1>
      <hr />
      <h2>Tambah Bahagian</h2>

      <h3>Senarai Bahagian</h3>
      <CreateBahagian />
      <hr />

      {/* Table Senarai Bahagian */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Bahagian</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{/* Bilangan */}</td>
            <td>{/* Bahagian */}</td>
            <td>
              <EditBahagian />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default IndexBahagian;
