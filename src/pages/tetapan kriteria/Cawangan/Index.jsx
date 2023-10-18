import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CreateCawangan from "./Create";
import EditCawangan from "./Edit";

function IndexCawangan() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Cawangan</h2>
        <hr />
        <h3>Tambah Cawangan</h3>
      </div>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Cawangan</h4>
        <CreateCawangan />
        <hr />

        {/* Table Senarai Cawangan */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Wilayah</th>
              <th>Cawangan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{/* Bilangan */}</td>
              <td>{/* Pull from table Wilayah */}</td>
              <td>{/* Cawangan */}</td>
              <td>
                <EditCawangan />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default IndexCawangan;
