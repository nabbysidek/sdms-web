import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateSkopKriteria from "./Create";
import EditSkopKriteria from "./Edit";
import PaginationTable from "../../../components/pagination/PaginationTable";
import Button from "react-bootstrap/Button";
import axios from "axios";

function IndexSkopKriteria() {
  // ----------FE----------
  const [skopKriterias, setSkopKriterias] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List skop kriteria
  const fetchSkopKriterias = async(page) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/skop-kriteria?page=${page}`);
      setSkopKriterias(response.data.data);
      setTotalPage(response.data.last_page);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat skop kriteria:', error);
    }
  };

  useEffect(() => {
    fetchSkopKriterias(currentPage);

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchSkopKriterias(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  return (
    <div>
      {/* Page title section */}
      <h2>Skop Kriteria</h2>
      <hr />
      <h3 className="pageTitle">Tambah Skop Kriteria</h3>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Skop Kriteria</h4>
        <CreateSkopKriteria />
        <hr />

        {/* Table Senarai Skop Kriteria */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Skop Kriteria</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {skopKriterias.length > 0 && skopKriterias.map((skopKriteriasData, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{skopKriteriasData.namaSkopKriteria}</td>
                <td>
                  <EditSkopKriteria />
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

export default IndexSkopKriteria;