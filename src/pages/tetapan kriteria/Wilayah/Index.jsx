import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateWilayah from "./Create";
import EditWilayah from "./Edit";
import axios from "axios";

function IndexWilayah() {
  // ----------FE----------
  const [wilayahs, setWilayahs] = useState([]);

  // ----------BE----------
  // List wilayah
  const fetchWilayahs = async() => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/wilayah`);
      setWilayahs(response.data);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat wilayah:', error);
    }
  };

  useEffect(() => {
    fetchWilayahs();

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      fetchWilayahs();
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };

  }, []);

  return (
    <>
      {/* Page header */}
      <h1>Wilayah</h1>
      <hr />
      <h2>Tambah Wilayah</h2>

      <h3>Senarai Wilayah</h3>
      <CreateWilayah />
      <hr />

      {/* Table Senarai Wilayah */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Wilayah</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {wilayahs.length > 0 && wilayahs.map((wilayahsData, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{wilayahsData.namaWilayah}</td>
              <td><EditWilayah /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default IndexWilayah;