import React, { useState, useEffect } from "react";
import { Table, Button, Row } from "react-bootstrap";
import CreateSkopSemakan from "./Create";
import EditSkopSemakan from "./Edit";
import PaginationTable from "../../../components/pagination/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportButton";
import ImportButton from "../../../components/functional buttons/ImportButton";
import axios from "axios";

function ShowSkopSemakanList() {
  // ----------FE----------
  const [skopSemakans, setSkopSemakans] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List kriteria ketidakpatuhan
  const fetchskopSemakans = async (page) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/skop-semakan?page=${page}`
      );
      setSkopSemakans(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat skop semakan:", error);
    }
  };

  useEffect(() => {
    fetchskopSemakans(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
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
      <div className="container-fluid">
        <div className="tableSection">
          <Row>
            <div className="col-md-10">
              <h4 className="tableTitle">Senarai Skop Semakan</h4>
            </div>
            <div className="col-md-2">
              <CreateSkopSemakan />
            </div>
          </Row>
        </div>
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
            {skopSemakans.length > 0 &&
              skopSemakans.map((skopSemakansData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{skopSemakansData.namaSkopSemakan}</td>
                  <td>
                    <EditSkopSemakan />
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

export default ShowSkopSemakanList;
