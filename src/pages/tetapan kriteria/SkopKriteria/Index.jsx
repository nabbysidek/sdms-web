import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateSkopKriteria from "./Create";
import EditSkopKriteria from "./Edit";
import axios from "axios";

function IndexSkopKriteria() {
  // ----------FE----------
  const [skopKriterias, setSkopKriterias] = useState([]);

  // ----------BE----------
  // List skop kriteria
  const fetchSkopKriterias = async() => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/skop-kriteria`);
      setSkopKriterias(response.data);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat skop kriteria:', error);
    }
  };

  useEffect(() => {
    fetchSkopKriterias();

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      fetchSkopKriterias();
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Page header */}
      <h1>SkopKriteria</h1>
      <hr />
      <h2>Tambah SkopKriteria</h2>

      <h3>Senarai SkopKriteria</h3>
      <CreateSkopKriteria />
      <hr />

      {/* Table Senarai Skop Kriteria */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Skop Kriteria</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {skopKriterias.length > 0 && skopKriterias.map((skopKriteriasData, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{skopKriteriasData.namaSkopKriteria}</td>
              <td><EditSkopKriteria /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default IndexSkopKriteria;