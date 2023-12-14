import React, { useState, useEffect } from "react";
import { Button, Row, Table } from "react-bootstrap";
import CreateJenisAudit from "./Create";
import EditJenisAudit from "./Edit";
import ExportButton from "../../../components/functional buttons/ExportButton";
import ImportButton from "../../../components/functional buttons/ImportButton";
import PaginationTable from "../../../components/pagination/PaginationTable";
import axios from "axios";

function ShowJenisAuditList() {
  // ----------FE----------
  const [jenisAudits, setJenisAudits] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List jenis audit
  const fetchJenisAudits = async (page) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/jenis-audit?page=${page}`
      );
      setJenisAudits(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat jenis audit:", error);
    }
  };

  useEffect(() => {
    fetchJenisAudits(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
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
      <div className="container-fluid">
        <div className="tableSection">
          <Row>
            <div className="col-md-10">
              <h4 className="tableTitle">Senarai Jenis Audit</h4>
            </div>
            <div className="col-md-2">
              <CreateJenisAudit />
            </div>
          </Row>
        </div>
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
            {jenisAudits.length > 0 &&
              jenisAudits.map((jenisAuditsData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{jenisAuditsData.namaJenisAudit}</td>
                  <td>
                    <EditJenisAudit />
                    <Button className="delBtn">Padam</Button>
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

        {/* Functional buttons */}
        <div className="functionalBtnsSection">
          <ExportButton />
          <ImportButton />
        </div>
      </div>
    </>
  );
}

export default ShowJenisAuditList;
