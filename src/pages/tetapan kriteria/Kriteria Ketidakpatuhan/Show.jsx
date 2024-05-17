import { useState, useEffect, useCallback } from "react";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import CreateKriteriaKetidakpatuhan from "./Create";
import EditKriteriaKetidakpatuhan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import PaginationTable from "../../../components/page layout/PaginationTable";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function ShowKriteriaKetidakpatuhanList() {
  // ----------FE----------
  const [kriteriaKetidakpatuhans, setKriteriaKetidakpatuhans] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // Fetch options aktiviti semakan
  const [namaAktivitiSemakanOptions, setNamaAktivitiSemakanOptions] = useState([]);

  const fetchAktivitiSemakans = useCallback(async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/aktiviti-semakan/display-aktiviti-semakan`
      );

      if (Array.isArray(response.data)) {
        setNamaAktivitiSemakanOptions(
          response.data.map((aktivitiSemakan) => ({
            value: aktivitiSemakan.id,
            label: aktivitiSemakan.namaAktivitiSemakan,
          }))
        );
      } else {
        console.log(response.data);

      }
    } catch (error) {
      console.log(error);
    }
  }, [setNamaAktivitiSemakanOptions]);

  useEffect(() => {
    fetchAktivitiSemakans();
  }, [fetchAktivitiSemakans]);


  // List kriteria ketidakpatuhan
  const fetchKriteriaKetidakpatuhans = async (page) => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/kriteria-ketidakpatuhan?page=${page}`
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
        const response = await axiosCustom.delete(
          `tetapan-kriteria/kriteria-ketidakpatuhan/${kriteriaKetidakpatuhanId}`
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
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.error, 
      });
      }
    }
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <Col xl={10}>
              <h3 className="table-title">Senarai Kriteria Ketidakpatuhan</h3>
            </Col>

            <Col xl={2}>
              <CreateKriteriaKetidakpatuhan aktivitiSemakanOptions={namaAktivitiSemakanOptions} />
            </Col>
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
                      {kriteriaKetidakpatuhansData.aktiviti_semakan.skop_kriteria.skop_semakan
                        ? kriteriaKetidakpatuhansData.aktiviti_semakan.skop_kriteria.skop_semakan
                            .namaSkopSemakan
                        : "N/A"}
                        </td>
                    <td>
                    {kriteriaKetidakpatuhansData.aktiviti_semakan.skop_kriteria
                        ? kriteriaKetidakpatuhansData.aktiviti_semakan.skop_kriteria
                            .namaSkopKriteria
                        : "N/A"}
                    </td>
                    <td>
                    {kriteriaKetidakpatuhansData.aktiviti_semakan
                        ? kriteriaKetidakpatuhansData.aktiviti_semakan
                            .namaAktivitiSemakan
                        : "N/A"}
                    </td>
                    <td>
                      {kriteriaKetidakpatuhansData.namaKriteriaKetidakpatuhan}
                    </td>
                    <td>
                      <EditKriteriaKetidakpatuhan kriteriaKetidakpatuhan={kriteriaKetidakpatuhansData} aktivitiSemakanOptions={namaAktivitiSemakanOptions} />
                      <Button
                        onClick={() =>
                          handleDeleteKriteriaKetidakpatuhan(
                            kriteriaKetidakpatuhansData.id
                          )
                        }
                        className="delete-btn"
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
        <div className="functional-btns-container">
          <ExportButton />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowKriteriaKetidakpatuhanList;
