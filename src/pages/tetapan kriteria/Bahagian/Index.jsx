import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateBahagian from "./Create";
import EditBahagian from "./Edit";
import PaginationTable from "../../../components/pagination/PaginationTable";
import Button from "react-bootstrap/Button";
import axios from "axios";

function IndexBahagian() {
  // ----------FE----------
  const [bahagians, setBahagians] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List bahagian
  const fetchBahagians = async(page) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tetapan-kriteria/bahagian?page=${page}`);
      setBahagians(response.data.data);
      setTotalPage(response.data.last_page);
    } catch(error) {
      console.error('Ralat dalam mengambil maklumat bahagian:', error);
    }
  };

  useEffect(() => {
    fetchBahagians(currentPage);

    const interval = setInterval(() => { // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchBahagians(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  return (
    <div>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Bahagian</h2>
        <hr />
        <h3>Tambah Bahagian</h3>
      </div>

      {/* Search function section */}
      <Container>
        <div className="searchBahagian"></div>
      </Container>

      {/* Page content section */}
      <div className="container-fluid">
        <h4 className="pageTitle">Senarai Bahagian</h4>
        <CreateBahagian />
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
            {bahagians.length > 0 && bahagians.map((bahagiansData, key) => (
            <tr key={key}>
                <td>{key + 1}</td>
                <td>{bahagiansData.namaBahagian}</td>
                <td>
                  <EditBahagian />
                  <Button variant="danger">Kemaskini</Button>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <PaginationTable currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default IndexBahagian;