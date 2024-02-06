import React, { useEffect } from "react";
import { Table, Dropdown, Container } from "react-bootstrap";
import ModalRejectAccess from "./ModalRejectAccess";
import ModalAllowAccess from "./ModalAllowAccess";
import ModalTerminateAccess from "./ModalTerminateAccess";
import "../../assets/styles/styles_tetapan_pengguna.css";
import axios from "axios";
import { useState } from "react";

function IndexTetapanPengguna() {
  const [records,setRecords] = useState([]);
  useEffect(() => {
    let isMounted = true;
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tetapan-pengguna/senarai-pengguna');
  
        if (isMounted) {
          setRecords(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();

    console.log(records);
  
    return () => {
      isMounted = false;
    };
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
              <th>status id</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(records) && records.length > 0 ? (
        records.map((recordsdata, key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{recordsdata.idAuditor}</td>
            <td>{recordsdata.namaAuditor}</td>
            <td>{recordsdata.emelAuditor}</td>
            <td>{recordsdata.statusAuditor}</td>
             <td><ModalAllowAccess />
                <ModalRejectAccess />
              </td>
            
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="2">No records found</td>
        </tr>
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
              <th>status user</th>
              <th>Peranan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(records) && records.length > 0 ? (
        records.map((recordsdata, key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{recordsdata.idAuditor}</td>
            <td>{recordsdata.namaAuditor}</td>
            <td>{recordsdata.emelAuditor}</td>
            <td>{recordsdata.statusAuditor}</td>
             <td>
                <Dropdown>
                  <Dropdown.Toggle className="user-level-btn">
                    Tahap Pengguna
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="user-level-item">
                    <Dropdown.Item>Admin</Dropdown.Item>
                    <Dropdown.Item>Pengguna</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <ModalAllowAccess />
                <ModalTerminateAccess />
              </td>
            
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="2">No records found</td>
        </tr>
      )}
        
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default IndexTetapanPengguna;
