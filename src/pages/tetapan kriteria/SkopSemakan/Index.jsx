import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateSkopSemakan from "./Create";
import EditSkopSemakan from "./Edit";
import PaginationTable from "../../../components/pagination/PaginationTable";
import Button from "react-bootstrap/Button";
import axios from "axios";

function IndexSkopSemakan() {
  // ----------FE----------
  const [skopSemakans, setSkopSemakans] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List kriteria ketidakpatuhan
  const fetchskopSemakans = async(page) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/skop-semakan?page=${page}`);
      setSkopSemakans(response.data.data);
      setTotalPage(response.data.last_page);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat skop semakan:', error);
    }
  };

  useEffect(() => {
    fetchskopSemakans(currentPage);

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchskopSemakans(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

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
              <td>
                <EditSkopSemakan />
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

export default IndexSkopSemakan;