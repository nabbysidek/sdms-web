import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateJabatan from "./Create";
import EditJabatan from "./Edit";
import PaginationTable from "../../../components/pagination/PaginationTable";
import Button from "react-bootstrap/Button";
import axios from "axios";

function IndexJabatan() {
  // ----------FE----------
  const [jabatans, setJabatans] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List jabatan
  const fetchJabatans = async(page) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/jabatan?page=${page}`);
      setJabatans(response.data.data); // Update the state with the array of objects
      setTotalPage(response.data.last_page);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat jabatan:', error);
    }
  };

  useEffect(() => {
    fetchJabatans(currentPage);

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      fetchJabatans(currentPage);

      const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
        const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
        fetchJabatans(nextPage);
      }, 5000);
  
      // Cleanup the interval when the component unmounts
      return () => {
        clearInterval(interval);
      };
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  return (
    <div>
      {/* Page title section */}
      <h2>Jabatan</h2>
      <hr />
      <h3 className="pageTitle">Tambah Jabatan</h3>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Jabatan</h4>
        <CreateJabatan />
        <hr />

        {/* Table Senarai Jabatan */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Bahagian</th>
              <th>Jabatan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {jabatans.length > 0 && jabatans.map((jabatansData, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{jabatansData.bahagian ? jabatansData.bahagian.namaBahagian: "N/A"}</td>
                <td>{jabatansData.namaJabatan}</td>
                <td>
                  <EditJabatan />
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

export default IndexJabatan;