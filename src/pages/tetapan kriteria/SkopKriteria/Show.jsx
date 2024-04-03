import { useState, useEffect } from "react";
import { Button, Row, Table, Container } from "react-bootstrap";
import CreateSkopKriteria from "./Create";
import EditSkopKriteria from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function ShowSkopKriteriaList() {
  // ----------FE----------
  const [skopKriterias, setSkopKriterias] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List skop kriteria
  const fetchSkopKriterias = async (page) => {
    try {
      const response = await axiosCustom.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/skop-kriteria?page=${page}`
      );
      setSkopKriterias(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat skop kriteria:", error);
    }
  };

  useEffect(() => {
    fetchSkopKriterias(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchSkopKriterias(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  // Handle delete
  const handleDeleteSkopKriteria = async (skopKriteriaId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axiosCustom.delete(
          `http://127.0.0.1:8000/api/tetapan-kriteria/skop-kriteria/${skopKriteriaId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berjaya",
            text: response.data.success, // Access the message from the backend response
          });

          setSkopKriterias((prevSkopKriterias) =>
            prevSkopKriterias.filter(
              (skopKriteria) => skopKriteria.id !== skopKriteriaId
            )
          );
        }
      } catch (error) {
        console.error("Error in deleting skop kriteria", error);
      }
    }
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">
                Senarai Skop Kriteria Ketidakpatuhan
              </h3>
            </div>
            <div className="col-md-2">
              <CreateSkopKriteria />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Skop Semakan</th>
              <th>Skop Kriteria Ketidakpatuhan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {skopKriterias.length > 0 &&
              skopKriterias.map((skopKriteriasData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>
                    {skopKriteriasData.skop_semakan
                      ? skopKriteriasData.skop_semakan.namaSkopSemakan
                      : "N/A"}
                  </td>
                  <td>{skopKriteriasData.namaSkopKriteria}</td>
                  <td>
                    <EditSkopKriteria />
                    <Button
                      onClick={() =>
                        handleDeleteSkopKriteria(skopKriteriasData.id)
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

        <div className="functional-btns-container">
          <ExportButton />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowSkopKriteriaList;
