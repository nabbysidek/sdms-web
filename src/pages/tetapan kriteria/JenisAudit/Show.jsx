import { useState, useEffect } from "react";
import { Button, Row, Table, Container } from "react-bootstrap";
import CreateJenisAudit from "./Create";
import EditJenisAudit from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import PaginationTable from "../../../components/page layout/PaginationTable";
import axios from "axios";
import Swal from "sweetalert2";

function ShowJenisAuditList() {
  // ----------FE----------
  const [jenisAudits, setJenisAudits] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List jenis audit
  const fetchJenisAudits = async (page) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/jenis-audit?page=${page}`
      );
      setJenisAudits(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat jenis audit:", error);
    }
  };

  useEffect(() => {
    fetchJenisAudits(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchJenisAudits(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  // Handle delete
  const handleDeleteJenisAudit = async (jenisAuditId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/tetapan-kriteria/jenis-audit/${jenisAuditId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berjaya",
            text: response.data.success, // Access the message from the backend response
          });

          setJenisAudits((prevJenisAudits) =>
            prevJenisAudits.filter(
              (jenisAudit) => jenisAudit.id !== jenisAuditId
            )
          );
        }
      } catch (error) {
        console.error("Error in deleting jenis audit", error);
      }
    }
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Jenis Audit</h3>
            </div>
            <div className="col-md-2">
              <CreateJenisAudit />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Nama Jenis Audit</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {jenisAudits.length > 0 &&
              jenisAudits.map((jenisAuditsData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{jenisAuditsData.namaJenisAudit}</td>
                  <td>
                    <EditJenisAudit />
                    <Button
                      onClick={() => handleDeleteJenisAudit(jenisAuditsData.id)}
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

export default ShowJenisAuditList;
