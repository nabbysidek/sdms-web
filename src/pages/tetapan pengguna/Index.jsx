import React from "react";
import Table from "react-bootstrap/Table";

function IndexTetapanPengguna() {
  return (
    <>
      {/* Page title section */}
      <h2>Tetapan Akses Pengguna</h2>
      <hr />

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Permohonan Akses</h4>
        <hr />
        {/* Table Senarai Permohonan Akses */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>ID Kakitangan</th>
              <th>Nama Kakitangan</th>
              <th>Emel Kakitangan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{/* Bilangan */}</td>
              <td>{/* ID kakitangan */}</td>
              <td>{/* Nama kakitangan */}</td>
              <td>{/* Emel kakitangan */}</td>
              <td>
                {/* Fungsi: Allow access */}
                {/* Fungsi: Reject access */}
              </td>
            </tr>
          </tbody>
        </Table>

        <h4 className="pageTitle">Senarai Pengguna</h4>
        <hr />
        {/* Table Senarai Permohonan Akses */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>ID Kakitangan</th>
              <th>Nama Kakitangan</th>
              <th>Emel Kakitangan</th>
              <th>Peranan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{/* Bilangan */}</td>
              <td>{/* ID kakitangan */}</td>
              <td>{/* Nama kakitangan */}</td>
              <td>{/* Emel kakitangan */}</td>
              <td>{/* Fungsi: User level */}</td>
              <td>{/* Fungsi: Remove */}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default IndexTetapanPengguna;
