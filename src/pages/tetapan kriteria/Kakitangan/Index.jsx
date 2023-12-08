import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import CreateKakitangan from "./Create";
import EditKakitangan from "./Edit";
import PaginationTable from "../../../components/pagination/PaginationTable";
import axios from "axios";
import "../Tetapan.css";

function IndexKakitangan() {
  // ----------FE----------
  const [kakitangans, setKakitangans] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List kakitangn
  const fetchKakitangans = async (page) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/kakitangan?page=${page}`
      );
      setKakitangans(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat kakitangan:", error);
    }
  };

  useEffect(() => {
    fetchKakitangans(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchKakitangans(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  return (
    <div>
      {/* Page title section */}
      <h2>Kakitangan</h2>
      <hr />
      <h3 className="pageTitle">Tambah Kakitangan</h3>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Kakitangan</h4>
        <CreateKakitangan />
        <hr />

        {/* Table Senarai Kakitangan */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>ID Kakitangan</th>
              <th>Nama Kakitangan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {kakitangans.length > 0 &&
              kakitangans.map((kakitangansData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{kakitangansData.idKakitangan}</td>
                  <td>{kakitangansData.namaKakitangan}</td>
                  <td>
                    <EditKakitangan />
                    <Button variant="danger">Padam</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <PaginationTable
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default IndexKakitangan;
