import React, { useState, useEffect } from "react";
import { Table, Button, Row } from "react-bootstrap";
import CreateJabatan from "./Create";
import EditJabatan from "./Edit";
import ExportButton from "../../../components/functional buttons/ExportButton";
import ImportButton from "../../../components/functional buttons/ImportButton";
import PaginationTable from "../../../components/pagination/PaginationTable";
import axios from "axios";

function Show() {
  // ----------FE----------
  const [jabatans, setJabatans] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List jabatan
  const fetchJabatans = async (page) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/jabatan?page=${page}`
      );
      setJabatans(response.data.data); // Update the state with the array of objects
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat jabatan:", error);
    }
  };

  useEffect(() => {
    fetchJabatans(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
      fetchJabatans(currentPage);

      const interval = setInterval(() => {
        // Set up recurring fetch every 5 seconds)
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
    <>
      <div className="container-fluid">
        <div className="tableSection">
          <Row>
            <div className="col-md-10">
              <h4 className="tableTitle">Senarai Jabatan</h4>
            </div>
            <div className="col-md-2">
              <CreateJabatan />
            </div>
          </Row>
        </div>
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
            {jabatans.length > 0 &&
              jabatans.map((jabatansData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>
                    {jabatansData.bahagian
                      ? jabatansData.bahagian.namaBahagian
                      : "N/A"}
                  </td>
                  <td>{jabatansData.namaJabatan}</td>
                  <td>
                    <EditJabatan />
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

export default Show;
