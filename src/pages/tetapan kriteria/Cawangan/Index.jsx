import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateCawangan from "./Create";
import EditCawangan from "./Edit";
import PaginationTable from "../../../components/pagination/PaginationTable";
import Button from "react-bootstrap/Button";
import axios from "axios";

function IndexCawangan() {
  // ----------FE----------
  const [cawangans, setCawangans] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List cawangan
  const fetchCawangans = async(page) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/cawangan?page=${page}`);
      setCawangans(response.data.data);
      setTotalPage(response.data.last_page);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat cawangan:', error);
    }
  };

  useEffect(() => {
    fetchCawangans(currentPage);

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchCawangans(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);
  
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Cawangan</h2>
        <hr />
        <h3>Tambah Cawangan</h3>
      </div>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Cawangan</h4>
        <CreateCawangan />
        <hr />

      {/* Table Senarai Cawangan */}
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Wilayah</th>
            <th>Cawangan</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {cawangans.length > 0 && cawangans.map((cawangansData, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{cawangansData.wilayah ? cawangansData.wilayah.namaWilayah: "N/A"}</td>
              <td>{cawangansData.namaCawangan}</td>
              <td>
                <EditCawangan />
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

export default IndexCawangan;