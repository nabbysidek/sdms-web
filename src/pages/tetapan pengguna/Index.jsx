import React from "react";
import { Table, Dropdown } from "react-bootstrap";
import ModalRejectAccess from "./ModalRejectAccess";
import ModalAllowAccess from "./ModalAllowAccess";
import ModalTerminateAccess from "./ModalTerminateAccess";
import "./TetapanPengguna.css";

function IndexTetapanPengguna() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Tetapan Akses Pengguna</h2>
        <hr />
        <h3>Permohonan Akses</h3>
      </div>

      {/* Page content section */}
      <div className="container-fluid">
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
                <ModalAllowAccess />
                <ModalRejectAccess />
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
              <td>
                <Dropdown>
                  <Dropdown.Toggle className="userLevelBtn">
                    Tahap Pengguna
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="userLevelItem">
                    <Dropdown.Item>Super Admin</Dropdown.Item>
                    <Dropdown.Item>Admin</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <ModalAllowAccess />
                <ModalTerminateAccess />
              </td>
            </tr>
            <tr>
              <td>{/* Bilangan */}</td>
              <td>{/* ID kakitangan */}</td>
              <td>{/* Nama kakitangan */}</td>
              <td>{/* Emel kakitangan */}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle className="userLevelBtn">
                    Tahap Pengguna
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="userLevelItem">
                    <Dropdown.Item>Super Admin</Dropdown.Item>
                    <Dropdown.Item>Admin</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <ModalAllowAccess />
                <ModalTerminateAccess />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default IndexTetapanPengguna;
