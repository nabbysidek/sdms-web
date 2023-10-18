import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateKakitangan from "./Create";
import EditKakitangan from "./Edit";
import axios from "axios";

function IndexKakitangan() {
  // ----------FE----------
  const [kakitangans, setKakitangans] = useState([]);

  // ----------BE----------
  // List kakitangn
  const fetchKakitangans = async() => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/kakitangan`);
      setKakitangans(response.data);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat kakitangan:', error);
    }
  };

  useEffect(() => {
    fetchKakitangans();

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      fetchKakitangans();
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Page header */}
      <h1>Kakitangan</h1>
      <hr />
      <h2>Tambah Kakitangan</h2>

      <h3>Senarai Kakitangan</h3>
      <CreateKakitangan />
      <hr />

      {/* Table Senarai Kakitangan */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>ID Kakitangan</th>
            <th>Nama Kakitangan</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {kakitangans.length > 0 && kakitangans.map((kakitangansData, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{kakitangansData.idKakitangan}</td>
              <td>{kakitangansData.namaKakitangan}</td>
              <td><EditKakitangan /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default IndexKakitangan;