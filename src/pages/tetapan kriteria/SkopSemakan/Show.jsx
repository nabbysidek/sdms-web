import React, { useState, useEffect } from "react";
import { Table, Button, Row } from "react-bootstrap";
import CreateSkopSemakan from "./Create";
import EditSkopSemakan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import axios from "axios";
import Swal from "sweetalert2";

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

  // Handle delete
  const handleDeleteSkopSemakan = async (skopSemakanId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/tetapan-kriteria/skop-semakan/${skopSemakanId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berjaya",
            text: response.data.success, // Access the message from the backend response
          });

          setSkopSemakans((prevSkopSemakans) =>
            prevSkopSemakans.filter(
              (skopSemakan) => skopSemakan.id !== skopSemakanId
            )
          );
        }
      } catch (error) {
        console.error("Error in deleting skop semakan", error);
      }
    }
  };

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
                    <Button
                      onClick={() =>
                        handleDeleteSkopSemakan(skopSemakansData.id)
                      }
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

export default ShowSkopSemakanList;
