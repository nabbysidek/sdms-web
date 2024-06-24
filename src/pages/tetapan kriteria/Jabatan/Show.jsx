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
    totalItems,
    namaBahagianOptions,
    fetchJabatans,
    deleteJabatan,
    fetchBahagians,
  } = useJabatanStore();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;


  // fetch jabatans
  useEffect(() => {
    fetchJabatans(currentPage); 
    fetchBahagians();
  }, [currentPage, fetchJabatans, fetchBahagians]);

  // handle delete of jabatans
  const handleDeleteJabatan = async (jabatanId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteJabatan(jabatanId);
      const updateJabatans = await fetchJabatans(currentPage);

      if (updateJabatans.length === 0 && currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        await fetchJabatans(newPage);
      }
    }
  };

  // handles page reload
  const handleAddSuccess = async () => {
    await fetchJabatans(currentPage);

    const totalItemsAfterAdd = totalItems + 1;
    const newTotalPage = Math.ceil(totalItemsAfterAdd / pageSize);

    if (totalItemsAfterAdd > pageSize * totalPage) {
      setCurrentPage(newTotalPage);
      await fetchJabatans(newTotalPage);
    } else {
      setCurrentPage(totalPage);
      await fetchJabatans(totalPage);
    }
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
                <td>{(currentPage - 1) * pageSize + key + 1}</td>
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
