import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateUnit from "./Create";
import EditUnit from "./Edit";

function IndexUnit() {
  return (
    <>
      {/* Page title section */}
      <h2>Unit</h2>
      <hr />
      <h3 className="pageTitle">Tambah Unit</h3>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Unit</h4>
        <CreateUnit />
        <hr />

        {/* Table Senarai Unit */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Bahagian</th>
              <th>Jabatan</th>
              <th>Unit</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{/* Bilangan */}</td>
              <td>{/* Pull from table Bahagian */}</td>
              <td>{/* Pull from table Jabatan */}</td>
              <td>{/* Unit */}</td>
              <td>
                <EditUnit />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default IndexUnit;
