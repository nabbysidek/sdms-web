import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateCawangan from "./Create";
import EditCawangan from "./Edit";
import axios from "axios";

function IndexCawangan() {
  // ----------FE----------
  const [cawangans, setCawangans] = useState([]);

  // ----------BE----------
  // List cawangan
  const fetchCawangans = async() => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/cawangan`);
      setCawangans([response.data]);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat cawangan:', error);
    }
  };

  useEffect(() => {
    fetchCawangans();

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      fetchCawangans();
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <>
      {/* Page header */}
      <h1>Cawangan</h1>
      <hr />
      <h2>Tambah Cawangan</h2>

      <h3>Senarai Cawangan</h3>
      <CreateCawangan />
      <hr />

      {/* Table Senarai Cawangan */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Wilayah</th>
            <th>Cawangan</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {cawangans.length > 0 && cawangans[0].map((cawangansData, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{cawangansData.wilayah ? cawangansData.wilayah.namaWilayah: "N/A"}</td>
              <td>{cawangansData.namaCawangan}</td>
              <td><EditCawangan /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default IndexCawangan;