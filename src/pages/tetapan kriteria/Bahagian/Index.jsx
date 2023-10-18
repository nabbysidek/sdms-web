import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateBahagian from "./Create";
import EditBahagian from "./Edit";
import axios from "axios";

function IndexBahagian() {
  // ----------FE----------
  const [bahagians, setBahagians] = useState([]);

  // ----------BE----------
  // List bahagian
  const fetchBahagians = async() => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/bahagian`);
      setBahagians(response.data);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat bahagian:', error);
    }
  };

  useEffect(() => {
    fetchBahagians();

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      fetchBahagians();
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Page header */}
      <h1>Bahagian</h1>
      <hr />
      <h2>Tambah Bahagian</h2>

      <h3>Senarai Bahagian</h3>
      <CreateBahagian />
      <hr />

      {/* Table Senarai Bahagian */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Bahagian</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {bahagians.length > 0 && bahagians.map((bahagiansData, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{bahagiansData.namaBahagian}</td>
              <td><EditBahagian /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default IndexBahagian;