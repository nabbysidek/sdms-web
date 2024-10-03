import React, { useEffect, useState, useCallback } from "react";
import { Table, Dropdown, Container } from "react-bootstrap";
import ModalAllowAccessPermohonanPengguna from "./ModalAllowAccessPermohonanPengguna";
import ModalAllowAccessSenaraiPengguna from "./ModalAllowAccessSenaraiPengguna";
import ModalRejectAccessPermohonanPengguna from "./ModalRejectAccessPermohonanPengguna";
import ModalTerminateAccessSenaraiPengguna from "./ModalTerminateAccessSenaraiPengguna";
import "../../assets/styles/styles_tetapan_pengguna.css";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function IndexTetapanPengguna() {
  // Fetch permohonan akses
  const [permohonanAkses, setPermohonanAkses] = useState([]);
  const fetchPermohonanAkses = async () => {
    try {
      const response = await axiosCustom.get(`/tetapan-pengguna/tetapan-akses-pengguna/permohonan-akses`);
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
      const response = await axiosCustom.get(`/tetapan-pengguna/tetapan-akses-pengguna/senarai-pengguna`);
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
        setPerananOptions(response.data.map((peranan) => ({
          value: peranan.id,
          label: peranan.namaPeranan,
        })));
      }
    } catch (error) {
      console.log(error);
    }
  }, [setPerananOptions]);
  useEffect(() => {
    fetchPeranans();
  }, [fetchPeranans]);

  // Helper function to get the namaPeranan for a given perananId
  const getPerananLabel = (perananId) => {
    const peranan = perananOptions.find((p) => p.value === perananId);
    return peranan ? peranan.label : 'Tiada Peranan';
  };

  // Handle change in peranan
  const handleChangePeranan = async (userId, perananId) => {
    try {
      const response = await axiosCustom.put(
        `/tetapan-pengguna/senarai-pengguna/peranan/${userId}`,
        { perananId }
      );

      if (response.status === 200) {
        setSenaraiPengguna((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, perananId } : user
          )
        );
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, 
        });
      } 
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
          title: "Gagal",
          text: error.response.data.error,
      });
    }
  };

  return (
    <>
      <div className="page-title">
        <h2>Tetapan Akses Pengguna</h2>
        <hr />
        <h3>Permohonan Akses</h3>
      </div>
      <Container fluid>
        <hr />
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
              permohonanAkses.map((permohonanAksesData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{permohonanAksesData.idAuditor}</td>
                  <td>{permohonanAksesData.namaAuditor}</td>
                  <td>{permohonanAksesData.emelAuditor}</td>
                  <td>
                    <ModalAllowAccessPermohonanPengguna userId={permohonanAksesData.id} refetchPermohonanAkses={fetchPermohonanAkses} refetchSenaraiPengguna = {fetchSenaraiPengguna}  />
                    <ModalRejectAccessPermohonanPengguna userId={permohonanAksesData.id} refetchPermohonanAkses={fetchPermohonanAkses} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <h4 className="page-title">Senarai Pengguna</h4>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>ID Kakitangan</th>
              <th>Nama Kakitangan</th>
              <th>Emel Kakitangan</th>
              <th>Status Auditor</th>
              <th>Tahap Pengguna</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {senaraiPengguna.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <center>Tiada rekod.</center>
                </td>
              </tr>
            ) : (
              senaraiPengguna.map((senaraiPenggunaData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{senaraiPenggunaData.idAuditor}</td>
                  <td>{senaraiPenggunaData.namaAuditor}</td>
                  <td>{senaraiPenggunaData.emelAuditor}</td>
                  <td>{senaraiPenggunaData.statusAuditor}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle className="user-level-btn">
                        {getPerananLabel(senaraiPenggunaData.perananId)}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="user-level-item">
                        {perananOptions.map((perananOption) => (
                          <Dropdown.Item 
                            key={perananOption.value} 
                            onClick={() => handleChangePeranan(senaraiPenggunaData.id, perananOption.value)}
                          >
                            {perananOption.label}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>
                    <ModalAllowAccessSenaraiPengguna
                      disableButtonBenar={senaraiPenggunaData.statusAuditor === "BENAR"}
                      userId={senaraiPenggunaData.id} refetchSenaraiPengguna = {fetchSenaraiPengguna}
                    />
                    <ModalTerminateAccessSenaraiPengguna
                      disableButtonSekat={senaraiPenggunaData.statusAuditor === "SEKAT"}
                      userId={senaraiPenggunaData.id} refetchSenaraiPengguna = {fetchSenaraiPengguna}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default IndexTetapanPengguna;
