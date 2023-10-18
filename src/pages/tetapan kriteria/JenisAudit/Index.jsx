import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateJenisAudit from "./Create";
import EditJenisAudit from "./Edit";
import axios from "axios";

function IndexJenisAudit() {
  // ----------FE----------
  const [jenisAudits, setJenisAudits] = useState([]);

  // ----------BE----------
  // List jenis audit
  const fetchJenisAudits = async() => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/jenis-audit`);
      setJenisAudits(response.data);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat jenis audit:', error);
    }
  };

  useEffect(() => {
    fetchJenisAudits();

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      fetchJenisAudits();
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Page header */}
      <h1>Jenis Audit</h1>
      <hr />
      <h2>Tambah Jenis Audit</h2>

      <h3>Senarai Jenis Audit</h3>
      <CreateJenisAudit />
      <hr />

      {/* Table Senarai Jenis Audit */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Jenis Audit</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {jenisAudits.length > 0 && jenisAudits.map((jenisAuditsData, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{jenisAuditsData.namaJenisAudit}</td>
              <td><EditJenisAudit /></td>
          </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default IndexJenisAudit;