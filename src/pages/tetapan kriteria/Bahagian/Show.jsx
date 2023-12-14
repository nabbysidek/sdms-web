import React, { useState, useEffect } from "react";
import { Table, Row, Button } from "react-bootstrap";
import CreateBahagian from "./Create";
import EditBahagian from "./Edit";
import ExportButton from "../../../components/functional buttons/ExportButton";
import ImportButton from "../../../components/functional buttons/ImportButton";
import PaginationTable from "../../../components/pagination/PaginationTable";
import axios from "axios";

function ShowBahagianList() {
  // ----------FE----------
  const [bahagians, setBahagians] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List kriteria ketidakpatuhan
  const fetchBahagians = async (page) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/kriteria-ketidakpatuhan?page=${page}`
      );
      setBahagians(response.data.data); // Update the state with the array of objects
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error(
        "Ralat dalam mengambil maklumat kriteria ketidakpatuhan:",
        error
      );
    }
  };

  useEffect(() => {
    fetchBahagians(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchBahagians(nextPage);
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
              <h4 className="tableTitle">Senarai Bahagian</h4>
            </div>
            <div className="col-md-2">
              <CreateBahagian />
            </div>
          </Row>
        </div>
        <hr />
        {/* Table Senarai Bahagian */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Bahagian</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {bahagians.length > 0 &&
              bahagians.map((bahagiansData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{bahagiansData.namaBahagian}</td>
                  <td>
                    <EditBahagian />
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

export default ShowBahagianList;
