import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import CreateKriteriaKetidakpatuhan from "./Create";
import EditKriteriaKetidakpatuhan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import PaginationTable from "../../../components/page layout/PaginationTable";
import axios from "axios";
import Swal from "sweetalert2";

function ShowKriteriaKetidakpatuhanList() {
  // ----------FE----------
  const [kriteriaKetidakpatuhans, setKriteriaKetidakpatuhans] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List kriteria ketidakpatuhan
  const fetchKriteriaKetidakpatuhans = async (page) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/kriteria-ketidakpatuhan?page=${page}`
      );
      setKriteriaKetidakpatuhans(response.data.data); // Update the state with the array of objects
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error(
        "Ralat dalam mengambil maklumat kriteria ketidakpatuhan:",
        error
      );
    }
  };

  useEffect(() => {
    fetchKriteriaKetidakpatuhans(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchKriteriaKetidakpatuhans(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  // Handle delete
  const handleDeleteKriteriaKetidakpatuhan = async (
    kriteriaKetidakpatuhanId
  ) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/tetapan-kriteria/kriteria-ketidakpatuhan/${kriteriaKetidakpatuhanId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berjaya",
            text: response.data.success, // Access the message from the backend response
          });

          setKriteriaKetidakpatuhans((prevKriteriaKetidakpatuhans) =>
            prevKriteriaKetidakpatuhans.filter(
              (kriteriaKetidakpatuhan) =>
                kriteriaKetidakpatuhan.id !== kriteriaKetidakpatuhanId
            )
          );
        }
      } catch (error) {
        console.error("Error in deleting kriteria ketidakpatuhan", error);
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="tableSection">
          <Row>
            <Col xl={9}>
              <h4 className="tableTitle">Senarai Kriteria Ketidakpatuhan</h4>
            </Col>

            <Col xl={3}>
              <CreateKriteriaKetidakpatuhan />
            </Col>
          </Row>
        </div>
        <hr />

        {/* Table Senarai Kriteria Ketidakpatuhan */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Skop Kriteria</th>
              <th>Kod Kriteria Ketidakpatuhan</th>
              <th>Nama Kriteria Ketidakpatuhan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {kriteriaKetidakpatuhans.length > 0 &&
              kriteriaKetidakpatuhans.map(
                (kriteriaKetidakpatuhansData, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>
                      {kriteriaKetidakpatuhansData.skop_kriteria
                        ? kriteriaKetidakpatuhansData.skop_kriteria
                            .namaSkopKriteria
                        : "N/A"}
                    </td>
                    <td>
                      {kriteriaKetidakpatuhansData.kodKriteriaKetidakpatuhan}
                    </td>
                    <td>
                      {kriteriaKetidakpatuhansData.namaKriteriaKetidakpatuhan}
                    </td>
                    <td>
                      <EditKriteriaKetidakpatuhan />
                      <Button
                        onClick={() =>
                          handleDeleteKriteriaKetidakpatuhan(
                            kriteriaKetidakpatuhansData.id
                          )
                        }
                        className="delBtn"
                      >
                        Padam
                      </Button>
                    </td>
                  </tr>
                )
              )}
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

export default ShowKriteriaKetidakpatuhanList;
