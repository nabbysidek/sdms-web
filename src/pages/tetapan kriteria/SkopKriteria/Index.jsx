import React from "react";
import Table from "react-bootstrap/Table";
import CreateSkopKriteria from "./Create";
import EditSkopKriteria from "./Edit";

function IndexSkopKriteria() {
  return (
    <>
      {/* Page title section */}
      <h2>Skop Kriteria</h2>
      <hr />
      <h3 className="pageTitle">Tambah Skop Kriteria</h3>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Skop Kriteria</h4>
        <CreateSkopKriteria />
        <hr />

        {/* Table Senarai Skop Kriteria */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Skop Kriteria</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{/* Bilangan */}</td>
              <td>{/* Nama Jenis Skop Kriteria */}</td>
              <td>
                <EditSkopKriteria />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default IndexSkopKriteria;
