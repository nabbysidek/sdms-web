import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateSkopSemakan from "./Create";
import EditSkopSemakan from "./Edit";
import axios from "axios";

function IndexSkopSemakan() {
  // ----------FE----------
  const [skopSemakans, setSkopSemakans] = useState([]);

  // ----------BE----------
  // List kriteria ketidakpatuhan
  const fetchskopSemakans = async() => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/skop-semakan`);
      setSkopSemakans(response.data);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat skop semakan:', error);
    }
  };

  useEffect(() => {
    fetchskopSemakans();

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      fetchskopSemakans();
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Page header */}
      <h1>SkopSemakan</h1>
      <hr />
      <h2>Tambah SkopSemakan</h2>

      <h3>Senarai SkopSemakan</h3>
      <CreateSkopSemakan />
      <hr />

      {/* Table Senarai Skop Semakan */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Skop Semakan</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {skopSemakans.length > 0 && skopSemakans.map((skopSemakansData, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{skopSemakansData.namaSkopSemakan}</td>
              <td><EditSkopSemakan /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default IndexSkopSemakan;