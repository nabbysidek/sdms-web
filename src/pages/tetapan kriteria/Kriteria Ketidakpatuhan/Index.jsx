import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateKriteriaKetidakpatuhan from "./Create";
import EditKriteriaKetidakpatuhan from "./Edit";
import PaginationTable from "../../../components/pagination/PaginationTable";
import Button from "react-bootstrap/Button";
import axios from "axios";

function IndexKriteriaKetidakpatuhan() {
  // ----------FE----------
  const [kriteriaKetidakpatuhans, setKriteriaKetidakpatuhans] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);
 
  // ----------BE----------
  // List kriteria ketidakpatuhan
  const fetchKriteriaKetidakpatuhans = async (page) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/kriteria-ketidakpatuhan?page=${page}`);
      setKriteriaKetidakpatuhans(response.data.data); // Update the state with the array of objects
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat kriteria ketidakpatuhan:", error);
    }
  };

  useEffect(() => {
    fetchKriteriaKetidakpatuhans(currentPage);
    
    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchKriteriaKetidakpatuhans(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  return (
    <>
      {/* Page header */}
      <h1>Tetapan Kriteria</h1>
      <hr />
      <h2>Tambah Kriteria Ketidakpatuhan</h2>

      <h3>Senarai Kriteria Ketidakpatuhan</h3>
      <CreateKriteriaKetidakpatuhan />
      <hr />

      {/* Table Senarai Kriteria Ketidakpatuhan */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Skop Kriteria</th>
            <th>Kod Kriteria</th>
            <th>Nama Kriteria Ketidakpatuhan</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {kriteriaKetidakpatuhans.length > 0 && kriteriaKetidakpatuhans.map((kriteriaKetidakpatuhansData, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{kriteriaKetidakpatuhansData.skop_kriteria ? kriteriaKetidakpatuhansData.skop_kriteria.namaSkopKriteria : "N/A"}</td>
              <td>{kriteriaKetidakpatuhansData.kodKriteria}</td>
              <td>{kriteriaKetidakpatuhansData.namaKriteriaKetidakpatuhan}</td>
              <td>
                <EditKriteriaKetidakpatuhan />
                <Button variant="danger">Padam</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PaginationTable currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
    </>
  );
}

export default IndexKriteriaKetidakpatuhan;