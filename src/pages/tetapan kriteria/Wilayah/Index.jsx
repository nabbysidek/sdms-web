import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateWilayah from "./Create";
import EditWilayah from "./Edit";
import PaginationTable from "../../../components/pagination/PaginationTable";
import Button from "react-bootstrap/Button";
import axios from "axios";

function IndexWilayah() {
  // ----------FE----------
  const [wilayahs, setWilayahs] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List wilayah
  const fetchWilayahs = async(page) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/wilayah?page=${page}`);
      setWilayahs(response.data.data);
      setTotalPage(response.data.last_page);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat wilayah:', error);
    }
  };

  useEffect(() => {
    fetchWilayahs(currentPage);

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchWilayahs(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };

  }, [currentPage, totalPage]);

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
              <td>
                <EditWilayah />
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

export default IndexWilayah;