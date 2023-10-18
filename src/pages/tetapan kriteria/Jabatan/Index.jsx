import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateJabatan from "./Create";
import EditJabatan from "./Edit";
import axios from "axios";

function IndexJabatan() {
  // ----------FE----------
  const [jabatans, setJabatans] = useState([]);

  // ----------BE----------
  // List jabatan
  const fetchJabatans = async() => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/jabatan`);
      setJabatans([response.data]); // Update the state with the array of objects
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat jabatan:', error);
    }
  };

  useEffect(() => {
    fetchJabatans();

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      fetchJabatans();

      const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
        fetchJabatans();
      }, 5000);
  
      // Cleanup the interval when the component unmounts
      return () => {
        clearInterval(interval);
      };
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Page header */}
      <h1>Jabatan</h1>
      <hr />
      <h2>Tambah Jabatan</h2>

      <h3>Senarai Jabatan</h3>
      <CreateJabatan />
      <hr />

      {/* Table Senarai Jabatan */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Bahagian</th>
            <th>Jabatan</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {jabatans.length > 0 && jabatans[0].map((jabatansData, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{jabatansData.bahagian ? jabatansData.bahagian.namaBahagian: "N/A"}</td>
              <td>{jabatansData.namaJabatan}</td>
              <td><EditJabatan /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default IndexJabatan;