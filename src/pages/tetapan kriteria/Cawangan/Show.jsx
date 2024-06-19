import { useState, useEffect } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import CreateCawangan from "./Create";
import EditCawangan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useCawanganStore from "../../../store/cawangan-store";

function ShowCawanganList() {
  // initialize state management store
  const {
    cawangans,
    totalPage,
    namaWilayahOptions,
    fetchCawangans,
    deleteCawangan,
    fetchWilayahs,
  } = useCawanganStore();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // -------- BE --------------
  // handle listing of cawangan
  useEffect(() => {
    fetchCawangans(currentPage); 
    fetchWilayahs();
  }, [currentPage, fetchCawangans, fetchWilayahs]);

  // handle delete of cawangan
  const handleDeleteCawangan = async (cawanganId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteCawangan(cawanganId);
      fetchCawangans(currentPage); // Refetch cawangans after deletion
    }
  };

  // handles page reload
  const handleAddSuccess = () => {
    const newTotalPage = Math.ceil((cawangans.length + 1) / pageSize);
    setCurrentPage(totalPage);
    fetchCawangans(totalPage);
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Cawangan</h3>
            </div>
            <div className="col-md-2">
              <CreateCawangan wilayahOptions={namaWilayahOptions} onAddSuccess={handleAddSuccess} />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Nama Wilayah</th>
              <th>Nama Cawangan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {cawangans.length > 0 &&
              cawangans.map((cawangan, index) => (
                <tr key={cawangan.id}>
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  <td>
                    {cawangan.wilayah
                      ? cawangan.wilayah.namaWilayah
                      : "N/A"}
                  </td>
                  <td>{cawangan.namaCawangan}</td>
                  <td>
                    <EditCawangan cawangan={cawangan} wilayahOptions={namaWilayahOptions} onUpdateSuccess={() => fetchCawangans(currentPage)} />
                    <Button
                      onClick={() => handleDeleteCawangan(cawangan.id)}
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

export default ShowCawanganList;
