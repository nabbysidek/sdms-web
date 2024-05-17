import { useState, useEffect, useCallback } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateUnit from "./Create";
import EditUnit from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function ShowUnitList() {
  // ----------FE----------
  const [units, setUnits] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // Fetch options jabatan data
  const [namaJabatanOptions, setNamaJabatanOptions] = useState([]);

  const fetchJabatans = useCallback(async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/jabatan/display-jabatan`
      );

      if (Array.isArray(response.data)) {
        setNamaJabatanOptions(
          response.data.map((jabatan) => ({
            value: jabatan.id,
            label: jabatan.namaJabatan,
          }))
        );
      } else {
        console.log(response.data);

      }
    } catch (error) {
      console.log(error);
    }
  }, [setNamaJabatanOptions]);

  useEffect(() => {
    fetchJabatans();
  }, [fetchJabatans]);


  // List unit
  const fetchUnits = async (page) => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/unit?page=${page}`
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
        const response = await axiosCustom.delete(
          `tetapan-kriteria/unit/${unitId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berjaya",
            text: response.data.success, 
          });

          setUnits((prevUnits) =>
            prevUnits.filter((unit) => unit.id !== unitId)
          );
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.error, 
      });
        console.error("Error in deleting unit", error);
      }
    }
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Unit</h3>
            </div>
            <div className="col-md-2">
              <CreateUnit jabatanOptions={namaJabatanOptions} />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Nama Bahagian</th>
              <th>Nama Jabatan</th>
              <th>Nama Unit</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {units.length > 0 &&
              units.map((unitsData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{unitsData.jabatan.bahagian ? unitsData.jabatan.bahagian.namaBahagian : "N/A"}</td>
                  <td>
                    {unitsData.jabatan ? unitsData.jabatan.namaJabatan : "N/A"}
                  </td>
                  <td>{unitsData.namaUnit}</td>
                  <td>
                    <EditUnit unit={unitsData} jabatanOptions={namaJabatanOptions} />
                    <Button
                      onClick={() => handleDeleteUnit(unitsData.id)}
                      className="delete-btn"
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

        <div className="functional-btns-container">
          <ExportButton />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowUnitList;
