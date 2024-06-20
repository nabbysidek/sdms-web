import { useState, useEffect } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import CreateBahagian from "./Create";
import EditBahagian from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import PaginationTable from "../../../components/page layout/PaginationTable";
import useBahagianStore from "../../../store/bahagian-store";

function ShowBahagianList() {
  // ----------FE----------
  // const [bahagians, setBahagians] = useState([]);
  const { bahagians, totalPage, fetchBahagians, deleteBahagian } = useBahagianStore();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const pageSize = 10;

  // ----------BE----------
  // Handle listing of bahagians
  useEffect(() => {
    fetchBahagians(currentPage);
  }, [currentPage, fetchBahagians]);


  // handle delete of bahagian
  const handleDeleteBahagian = async (bahagianId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteBahagian(bahagianId);
      fetchBahagians(currentPage);
    }
  };

  // handles page reload
  const handleAddSuccess = () => {
    const newTotalPage = Math.ceil((bahagians.length + 1) / pageSize);
    setCurrentPage(newTotalPage);
    fetchBahagians(newTotalPage);
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Bahagian</h3>
            </div>
            <div className="col-md-2">
              <CreateBahagian onAddSuccess={handleAddSuccess} />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Nama Bahagian</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {bahagians.length > 0 &&
              bahagians.map((bahagiansData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{bahagiansData.namaBahagian}</td>
                  <td>
                    <EditBahagian bahagian={bahagiansData} onUpdateSuccess={() => fetchWilayahs(currentPage)} />
                    <Button
                      onClick={() => handleDeleteBahagian(bahagiansData.id)}
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

export default ShowBahagianList;
