import React, { useState, useEffect } from "react";
import { Table, Button, Row } from "react-bootstrap";
import CreateUnit from "./Create";
import EditUnit from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/pagination/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportButton";
import ImportButton from "../../../components/functional buttons/ImportButton";
import axios from "axios";
import Swal from "sweetalert2";

function ShowUnitList() {
  // ----------FE----------
  const [units, setUnits] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List unit
  const fetchUnits = async (page) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/unit?page=${page}`
      );
      setUnits(response.data.data); // Update the state with the array of objects
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat unit:", error);
    }
  };

  useEffect(() => {
    fetchUnits(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchUnits(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  // Handle delete
  const handleDeleteUnit = async (unitId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/tetapan-kriteria/unit/${unitId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berjaya",
            text: response.data.success, // Access the message from the backend response
          });

          setUnits((prevUnits) =>
            prevUnits.filter((unit) => unit.id !== unitId)
          );
        }
      } catch (error) {
        console.error("Error in deleting unit", error);
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="tableSection">
          <Row>
            <div className="col-md-10">
              <h4 className="tableTitle">Senarai Unit</h4>
            </div>
            <div className="col-md-2">
              <CreateUnit />
            </div>
          </Row>
        </div>
        <hr />

        {/* Table Senarai Unit */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Bahagian</th>
              <th>Jabatan</th>
              <th>Unit</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {units.length > 0 &&
              units.map((unitsData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>
                    {unitsData.bahagian
                      ? unitsData.bahagian.namaBahagian
                      : "N/A"}
                  </td>
                  <td>
                    {unitsData.bahagian ? unitsData.jabatan.namaJabatan : "N/A"}
                  </td>
                  <td>{unitsData.namaUnit}</td>
                  <td>
                    <EditUnit />
                    <Button
                      onClick={() => handleDeleteUnit(unitsData.id)}
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

export default ShowUnitList;
