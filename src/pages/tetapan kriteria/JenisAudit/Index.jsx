import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateJenisAudit from "./Create";
import EditJenisAudit from "./Edit";
import PaginationTable from "../../../components/pagination/PaginationTable";
import Button from "react-bootstrap/Button";
import axios from "axios";

function IndexJenisAudit() {
  // ----------FE----------
  const [jenisAudits, setJenisAudits] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);
  
  // ----------BE----------
  // List jenis audit
  const fetchJenisAudits = async(page) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/jenis-audit?page=${page}`);
      setJenisAudits(response.data.data);
      setTotalPage(response.data.last_page);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat jenis audit:', error);
    }
  };

  useEffect(() => {
    fetchJenisAudits(currentPage);

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchJenisAudits(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  return (
    <>
      {/* Page title section */}
      <h2>Jenis Audit</h2>
      <hr />
      <h3 className="pageTitle">Tambah Jenis Audit</h3>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Jenis Audit</h4>
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
                <td>
                  <EditJenisAudit />
                <Button variant="danger">Padam</Button>
                </td>
            </tr>
          ))}
          </tbody>
        </Table>

      <PaginationTable currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
      </div>
    </>
  );
}

export default IndexJenisAudit;