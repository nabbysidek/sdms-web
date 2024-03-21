import React, { useEffect, useState, useCallback } from "react";
import { Table, Dropdown, Container } from "react-bootstrap";
import ModalRejectAccess from "./ModalRejectAccess";
import ModalAllowAccess from "./ModalAllowAccess";
import ModalTerminateAccess from "./ModalTerminateAccess";
import "../../assets/styles/styles_tetapan_pengguna.css";
import axiosCustom from "../../axios";

function IndexTetapanPengguna() {
  // -------------------- BE ---------------------------
  // Fetch peranan for the dropdown
  const [perananOptions, setPerananOptions] = useState([]);

  const fetchPeranans = useCallback(async () => {
    try {
      const response = await axiosCustom.get(`/get-peranan`);

      if (Array.isArray(response.data)) {
        setPerananOptions(
          response.data.map((peranan) => ({
            value: peranan.id,
            label: peranan.namaPeranan,
          }))
        );
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setPerananOptions]);

  useEffect(() => {
    fetchPeranans();
  }, [fetchPeranans]);

  // Fetch tetapan akses pengguna
  const [tetapanAksesPengguna, setTetapanAksesPengguna] = useState({});

  const fetchTetapanAksesPenggunas = async () => {
    try {
      const response = await axiosCustom.get(
        `/tetapan-pengguna/tetapan-akses-pengguna`
      );

      if (response.status >= 200 && response.status < 300) {
        setTetapanAksesPengguna(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTetapanAksesPenggunas();
  }, []);

  return (
    <>
      {/* Page title section */}
      <div className="page-title">
        <h2>Tetapan Akses Pengguna</h2>
        <hr />
        <h3>Permohonan Akses</h3>
      </div>

      {/* Page content section */}
      <Container fluid>
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
            {tetapanAksesPengguna.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <center>Tiada rekod.</center>
                </td>
              </tr>
            ) : (
              tetapanAksesPengguna.permohonanAkses &&
              tetapanAksesPengguna.permohonanAkses.data.map(
                (tetapanAksesPenggunaData, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{tetapanAksesPenggunaData.idAuditor}</td>
                    <td>{tetapanAksesPenggunaData.namaAuditor}</td>
                    <td>{tetapanAksesPenggunaData.emelAuditor}</td>
                    <td>
                      <ModalAllowAccess />
                      <ModalRejectAccess />
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </Table>

        <h4 className="page-title">Senarai Pengguna</h4>
        <hr />
        {/* Table Senarai Permohonan Akses */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>ID Kakitangan</th>
              <th>Nama Kakitangan</th>
              <th>Emel Kakitangan</th>
              <th>Status Auditor</th>
              <th>Peranan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {tetapanAksesPengguna.length < 0 ? (
              <tr>
                <td colSpan="7">
                  <center>Tiada rekod.</center>
                </td>
              </tr>
            ) : (
              tetapanAksesPengguna.senaraiPengguna &&
              tetapanAksesPengguna.senaraiPengguna.data.map(
                (senaraiPenggunaData, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{senaraiPenggunaData.idAuditor}</td>
                    <td>{senaraiPenggunaData.namaAuditor}</td>
                    <td>{senaraiPenggunaData.emelAuditor}</td>
                    <td>{senaraiPenggunaData.statusAuditor}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle className="user-level-btn">
                          Tahap Pengguna
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="user-level-item">
                          {perananOptions.map((perananOptions) => (
                            <Dropdown.Item key={perananOptions.value}>
                              {perananOptions.label}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td>
                      <ModalAllowAccess
                        disableButtonBenar={
                          senaraiPenggunaData.statusAuditor === "Benar"
                        }
                      />
                      <ModalTerminateAccess
                        disableButtonSekat={
                          senaraiPenggunaData.statusAuditor === "Sekat"
                        }
                      />
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default IndexTetapanPengguna;
