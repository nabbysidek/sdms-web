import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateUnit from "./Create";
import EditUnit from "./Edit";
import axios from "axios";

function IndexUnit() {
   // ----------FE----------
   const [units, setUnits] = useState([]);

   // ----------BE----------
   // List unit
   const fetchUnits = async() => {
     try {
       const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/unit`);
       setUnits([response.data]); // Update the state with the array of objects
     } catch(error) {
       console.error('Ralat dalam mengambil maklumat unit:', error);
     }
   };
 
   useEffect(() => {
     fetchUnits();

     const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      fetchUnits();
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
   }, []);

  return (
    <>
      {/* Page header */}
      <h1>Unit</h1>
      <hr />
      <h2>Tambah Unit</h2>

      <h3>Senarai Unit</h3>
      <CreateUnit />
      <hr />

      {/* Table Senarai Unit */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Bahagian</th>
            <th>Jabatan</th>
            <th>Unit</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {units.length > 0 && units[0].map((unitsData, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{unitsData.bahagian ? unitsData.bahagian.namaBahagian: "N/A"}</td>
              <td>{unitsData.bahagian ? unitsData.jabatan.namaJabatan: "N/A"}</td>
              <td>{unitsData.namaUnit}</td>
              <td><EditUnit /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default IndexUnit;