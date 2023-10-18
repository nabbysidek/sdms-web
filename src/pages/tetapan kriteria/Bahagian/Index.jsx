import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateBahagian from "./Create";
import EditBahagian from "./Edit";

function IndexBahagian() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Bahagian</h2>
        <hr />
        <h3>Tambah Bahagian</h3>
      </div>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Bahagian</h4>
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
      </div>
    </>
  );
}

export default IndexBahagian;
