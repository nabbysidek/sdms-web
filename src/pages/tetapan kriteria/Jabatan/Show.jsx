import { useState, useEffect } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateJabatan from "./Create";
import EditJabatan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import PaginationTable from "../../../components/page layout/PaginationTable";
import useJabatanStore from "../../../store/jabatan-store";

function Show() {
  // initialize state management store
  const {
    jabatans,
    totalPage,
    namaBahagianOptions,
    fetchJabatans,
    deleteJabatan,
    fetchBahagians,
  } = useJabatanStore();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // -------- BE --------------
  // handle listing of jabatan
  useEffect(() => {
    fetchJabatans(currentPage); 
    fetchBahagians();
  }, [currentPage, fetchJabatans, fetchBahagians]);

  // handle delete of jabatan
  const handleDeleteJabatan = async (jabatanId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteJabatan(jabatanId);
      fetchJabatans(currentPage); // Refetch jabatans after deletion
    }
  };

  // handles page reload
  const handleAddSuccess = () => {
    const newTotalPage = Math.ceil((jabatans.length + 1) / pageSize);
    setCurrentPage(newTotalPage);
    fetchJabatans(newTotalPage);
  };

  return (
    <Container fluid>
      <div className="table-section">
        <Row>
          <div className="col-md-9">
            <h3 className="table-title">Senarai Jabatan</h3>
          </div>
          <div className="col-md-3">
            <CreateJabatan bahagianOptions={namaBahagianOptions} onAddSuccess={handleAddSuccess} />
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
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {jabatans.length > 0 &&
            jabatans.map((jabatansData, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>
                  {jabatansData.bahagian
                    ? jabatansData.bahagian.namaBahagian
                    : "N/A"}
                </td>
                <td>{jabatansData.namaJabatan}</td>
                <td>
                  <EditJabatan jabatan={jabatansData} bahagianOptions={namaBahagianOptions} onUpdateSuccess={() => fetchJabatans(currentPage)} />
                  <Button
                    onClick={() => handleDeleteJabatan(jabatansData.id)}
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
  );
}

export default Show;
