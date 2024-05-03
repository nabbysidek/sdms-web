import React, { useEffect, useState, useCallback } from "react";
import { Table, Dropdown, Container } from "react-bootstrap";
import ModalAllowAccess from "./ModalAllowAccess";
import ModalAllowAccessSenaraiPengguna from "./ModalAllowAccessSenaraiPengguna";
import ModalRejectAccessSenaraiPengguna from "./ModalRejectAccess";
import ModalTerminateAccessSenaraiPengguna from "./ModalTerminateAccessSenaraiPengguna";
import "../../assets/styles/styles_tetapan_pengguna.css";
import axiosCustom from "../../axios";

function IndexTetapanPengguna() {
  // -------------------- BE ---------------------------
  // Fetch permohonan akses
  const [permohonanAkses, setPermohonanAkses] = useState([]);

  const fetchPermohonanAkses = async () => {
    try {
      const response = await axiosCustom.get(
        `/tetapan-pengguna/tetapan-akses-pengguna/permohonan-akses`
      );

      if (response.status >= 200 && response.status < 300) {
        setPermohonanAkses(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPermohonanAkses();
  }, []);

  // Fetch senarai pengguna
  const [senaraiPengguna, setSenaraiPengguna] = useState([]);

  const fetchSenaraiPengguna = async () => {
    try {
      const response = await axiosCustom.get(
        `/tetapan-pengguna/tetapan-akses-pengguna/senarai-pengguna`
      );

      if (response.status >= 200 && response.status < 300) {
        setSenaraiPengguna(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSenaraiPengguna();
  }, []);

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
      }
    } catch (error) {
      console.log(error);
    }
  }, [setPerananOptions]);
  
  useEffect(() => {
    fetchPeranans();
  }, [fetchPeranans]);

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
            {permohonanAkses.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <center>Tiada rekod.</center>
                </td>
              </tr>
            ) : (
              permohonanAkses.map(
                (permohonanAksesData, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{permohonanAksesData.idAuditor}</td>
                    <td>{permohonanAksesData.namaAuditor}</td>
                    <td>{permohonanAksesData.emelAuditor}</td>
                    <td>
                      <ModalAllowAccess userId={permohonanAksesData.id} />
                      <ModalRejectAccess userId={permohonanAksesData.id} />
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
            {senaraiPengguna.length < 0 ? (
              <tr>
                <td colSpan="7">
                  <center>Tiada rekod.</center>
                </td>
              </tr>
            ) : (
              senaraiPengguna.map(
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
                      <ModalAllowAccessSenaraiPengguna
                        disableButtonBenar={
                          senaraiPenggunaData.statusAuditor === "Benar"
                        }
                        userId={senaraiPenggunaData.id}
                      />
                      <ModalTerminateAccessSenaraiPengguna
                        disableButtonSekat={
                          senaraiPenggunaData.statusAuditor === "Sekat"
                        }
                        userId={senaraiPenggunaData.id}
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
