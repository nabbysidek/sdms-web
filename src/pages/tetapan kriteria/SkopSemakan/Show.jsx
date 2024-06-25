import { useState, useEffect } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateSkopSemakan from "./Create";
import EditSkopSemakan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useSkopSemakanStore from "../../../store/skop-semakan-store";

function ShowSkopSemakanList() {
  const { skopSemakans, totalPage, totalItems, fetchSkopSemakans, deleteSkopSemakan } = useSkopSemakanStore();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // fetch skop semakan
  useEffect(() => {
    fetchSkopSemakans(currentPage);
  }, [currentPage, fetchSkopSemakans]);


  // handle delete of skop semakan
  const handleDeleteSkopSemakan = async (skopSemakanId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteSkopSemakan(skopSemakanId);
      
      // fetch the total number of items after deletion
      const updatedSkopSemakans = await fetchSkopSemakans(currentPage);

      // If the current page is empty and not the first page, go to the previous page
      if (updatedSkopSemakans.length === 0 && currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        await fetchSkopSemakans(newPage);
      }
    }
  };

  // handles page reload
  const handleAddSuccess = async () => {
    await fetchSkopSemakans(currentPage);

    const totalItemsAfterAdd = totalItems + 1;
    const newTotalPage = Math.ceil(totalItemsAfterAdd / pageSize);

    if (totalItemsAfterAdd > pageSize * totalPage) {
      setCurrentPage(newTotalPage);
      await fetchSkopSemakans(newTotalPage);
    } else {
      setCurrentPage(totalPage);
      await fetchSkopSemakans(totalPage);
    }
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Skop Semakan</h3>
            </div>
            <div className="col-md-2">
              <CreateSkopSemakan onAddSuccess={handleAddSuccess} />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Nama Skop Semakan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {skopSemakans.length > 0 &&
              skopSemakans.map((skopSemakansData, key) => (
                <tr key={key}>
                  <td>{(currentPage - 1) * pageSize + key + 1}</td>
                  <td>{skopSemakansData.namaSkopSemakan}</td>
                  <td>
                    <EditSkopSemakan skopSemakan={skopSemakansData} onUpdateSuccess={() => fetchSkopSemakans(currentPage)} />
                    <Button
                      onClick={() =>
                        handleDeleteSkopSemakan(skopSemakansData.id)
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

export default ShowSkopSemakanList;
