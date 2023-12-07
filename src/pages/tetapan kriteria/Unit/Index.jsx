import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateUnit from "./Create";
import EditUnit from "./Edit";
import PaginationTable from "../../../components/pagination/PaginationTable";
import Button from "react-bootstrap/Button";
import axios from "axios";

function IndexUnit() {
   // ----------FE----------
   const [units, setUnits] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

   // ----------BE----------
   // List unit
   const fetchUnits = async(page) => {
     try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/unit?page=${page}`);
        setUnits(response.data.data); // Update the state with the array of objects
        setTotalPage(response.data.last_page);
     } catch(error) {
       console.error('Ralat dalam mengambil maklumat unit:', error);
     }
   };
 
   useEffect(() => {
     fetchUnits(currentPage);

     const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchUnits(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
   }, [currentPage, totalPage]);

  return (
    <div>
      {/* Page title section */}
      <h2>Unit</h2>
      <hr />
      <h3 className="pageTitle">Tambah Unit</h3>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Unit</h4>
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
            {units.length > 0 && units.map((unitsData, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{unitsData.bahagian ? unitsData.bahagian.namaBahagian: "N/A"}</td>
                <td>{unitsData.bahagian ? unitsData.jabatan.namaJabatan: "N/A"}</td>
                <td>{unitsData.namaUnit}</td>
                <td>
                  <EditUnit />
                  <Button variant="danger">Padam</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <PaginationTable currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}

export default IndexUnit;