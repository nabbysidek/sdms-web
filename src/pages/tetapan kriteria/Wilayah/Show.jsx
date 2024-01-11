import React, { useState, useEffect } from "react";
import { Table, Button, Row } from "react-bootstrap";
import CreateWilayah from "./Create";
import EditWilayah from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import axios from "axios";
import Swal from "sweetalert2";

function ShowWilayahList() {
  // ----------FE----------
  const [wilayahs, setWilayahs] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List wilayah
  const fetchWilayahs = async (page) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/wilayah?page=${page}`
      );
      setWilayahs(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat wilayah:", error);
    }
  };

  useEffect(() => {
    fetchWilayahs(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchWilayahs(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  // Handle delete
  const handleDeleteWilayah = async (wilayahId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/tetapan-kriteria/wilayah/${wilayahId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berjaya",
            text: response.data.success, // Access the message from the backend response
          });

          setWilayahs((prevWilayahs) =>
            prevWilayahs.filter((wilayah) => wilayah.id !== wilayahId)
          );
        }
      } catch (error) {
        console.error("Error in deleting wilayah", error);
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="tableSection">
          <Row>
            <div className="col-md-10">
              <h4 className="tableTitle">Senarai Wilayah</h4>
            </div>
            <div className="col-md-2">
              <CreateWilayah />
            </div>
          </Row>
        </div>

        <hr />

        {/* Table Senarai Wilayah */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Wilayah</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {wilayahs.length > 0 &&
              wilayahs.map((wilayahsData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{wilayahsData.namaWilayah}</td>
                  <td>
                    <EditWilayah />
                    <Button
                      onClick={() => handleDeleteWilayah(wilayahsData.id)}
                      className="delBtn"
                    >
                      Padam
                    </Button>
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

export default ShowWilayahList;
