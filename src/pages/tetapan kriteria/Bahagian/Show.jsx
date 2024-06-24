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
  const { bahagians, totalPage, totalItems, fetchBahagians, deleteBahagian } = useBahagianStore();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const pageSize = 10;

  // fetch bahagians
  useEffect(() => {
    fetchBahagians(currentPage);
  }, [currentPage, fetchBahagians]);


  // handle delete of bahagians
  const handleDeleteBahagian = async (bahagianId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteBahagian(bahagianId);
      
      // fetch the total number of items after deletion
      const updatedBahagians = await fetchBahagians(currentPage);

      // If the current page is empty and not the first page, go to the previous page
      if (updatedBahagians.length === 0 && currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        await fetchBahagians(newPage);
      }
    }
  };

  // handles page reload
  const handleAddSuccess = async () => {
    await fetchBahagians(currentPage);

    const totalItemsAfterAdd = totalItems + 1;
    const newTotalPage = Math.ceil(totalItemsAfterAdd / pageSize);

    if (totalItemsAfterAdd > pageSize * totalPage) {
      setCurrentPage(newTotalPage);
      await fetchBahagians(newTotalPage);
    } else {
      setCurrentPage(totalPage);
      await fetchBahagians(totalPage);
    }
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
                  <td>{(currentPage - 1) * pageSize + key + 1}</td>
                  <td>{bahagiansData.namaBahagian}</td>
                  <td>
                    <EditBahagian bahagian={bahagiansData} onUpdateSuccess={() => fetchBahagians(currentPage)} />
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
