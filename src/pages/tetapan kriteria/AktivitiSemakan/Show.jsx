import { useState, useEffect, useCallback } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import CreateAktivitiSemakan from "./Create";
import EditAktivitiSemakan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import PaginationTable from "../../../components/page layout/PaginationTable";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function ShowAktivitiSemakanList() {
  // -------------- FE ----------------
  const [aktivitiSemakans, setAktivitiSemakans] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ------------- BE -------------
  // Fetch options skop semakan data
  const [namaSkopKriteriaOptions, setNamaSkopKriteriaOptions] = useState([]);
  
  const fetchSkopKriterias = useCallback(async () => {
    try {
      const response = await axiosCustom.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/skop-kriteria/display-skop-kriteria`
      );

      if (Array.isArray(response.data)) {
        setNamaSkopKriteriaOptions(
          response.data.map((skopKriteria) => ({
            value: skopKriteria.id,
            label: skopKriteria.namaSkopKriteria,
          }))
        );
      } else {
        console.log(response.data);

      }
    } catch (error) {
      console.log(error);
    }
  }, [setNamaSkopKriteriaOptions]);

  useEffect(() => {
    fetchSkopKriterias();
  }, [fetchSkopKriterias]);

  // List Aktiviti Semakan
  const fetchAktivitiSemakans = async (page) => {
    try {
      const response = await axiosCustom.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/aktiviti-semakan?page=${page}`
      );
      setAktivitiSemakans(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat skop semakan:", error);
    }
  };

  useEffect(() => {
    fetchAktivitiSemakans(currentPage);

    const interval = setInterval(() => {
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchAktivitiSemakans(nextPage);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  // Handle delete
  const handleDeleteAktivitiSemakan = async (aktivitiSemakanId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axiosCustom.delete(
          `http://127.0.0.1:8000/api/tetapan-kriteria/aktiviti-semakan/${aktivitiSemakanId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berjaya",
            text: response.data.success,
          });

          setAktivitiSemakans((prevAktivitiSemakans) =>
            prevAktivitiSemakans.filter(
              (aktivitiSemakan) => aktivitiSemakan.id !== aktivitiSemakanId
            )
          );
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.error, // Access the message from the backend response
      });
        console.error("Error in deleting aktiviti semakan", error);
      }
    }
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Aktiviti Semakan</h3>
            </div>
            <div className="col-md-2">
              <CreateAktivitiSemakan skopKriteriaOptions={namaSkopKriteriaOptions} />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Nama Skop Semakan</th>
              <th>Nama Skop Kriteria Ketidakpatuhan</th>
              <th>Nama Aktiviti Semakan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {aktivitiSemakans.length > 0 &&
              aktivitiSemakans.map((aktivitiSemakansData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>
                    {aktivitiSemakansData.skop_kriteria.skop_semakan
                      ? aktivitiSemakansData.skop_kriteria.skop_semakan
                          .namaSkopSemakan
                      : "N/A"}
                  </td>
                  <td>
                    {aktivitiSemakansData.skop_kriteria
                      ? aktivitiSemakansData.skop_kriteria.namaSkopKriteria
                      : "N/A"}
                  </td>
                  <td>{aktivitiSemakansData.namaAktivitiSemakan}</td>
                  <td>
                    <EditAktivitiSemakan skopKriteriaOptions={namaSkopKriteriaOptions} aktivitiSemakan={aktivitiSemakansData} />
                    <Button
                      onClick={() =>
                        handleDeleteAktivitiSemakan(aktivitiSemakansData.id)
                      }
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

        {/* Functional buttons */}
        <div className="functional-btns-container">
          <ExportButton />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowAktivitiSemakanList;
