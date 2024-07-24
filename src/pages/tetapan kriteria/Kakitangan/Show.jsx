import { useState, useEffect } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateKakitangan from "./Create";
import EditKakitangan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useKakitanganStore from "../../../store/kakitangan-store";

function ShowKakitanganList() {
  // initialize store
  const { kakitangans, totalPage, totalItems, fetchKakitangans, deleteKakitangan } = useKakitanganStore();

  // pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const pageSize = 10;

  // fetch kakitangan
  useEffect(() => {
    fetchKakitangans(currentPage);
  }, [currentPage, fetchKakitangans]);


  // handle delete of kakitangan
  const handleDeleteKakitangan = async (kakitanganId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteKakitangan(kakitanganId);
      
      // fetch the total number of items after deletion
      const updatedKakitangans = await fetchKakitangans(currentPage);

      // If the current page is empty and not the first page, go to the previous page
      if (updatedKakitangans.length === 0 && currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        await fetchKakitangans(newPage);
      }
    }
  };

  // handles page reload
  const handleAddSuccess = async () => {
    await fetchKakitangans(currentPage);

    const totalItemsAfterAdd = totalItems + 1;
    const newTotalPage = Math.ceil(totalItemsAfterAdd / pageSize);

    if (totalItemsAfterAdd > pageSize * totalPage) {
      setCurrentPage(newTotalPage);
      await fetchKakitangans(newTotalPage);
    } else {
      setCurrentPage(totalPage);
      await fetchKakitangans(totalPage);
    }
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-9">
              <h3 className="table-title">Senarai Kakitangan</h3>
            </div>
            <div className="col-md-3">
              <CreateKakitangan onAddSuccess={handleAddSuccess} />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>ID Kakitangan</th>
              <th>Nama Kakitangan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {kakitangans.length > 0 &&
              kakitangans.map((kakitangansData, key) => (
                <tr key={key}>
                  <td>{(currentPage - 1) * pageSize + key + 1}</td>
                  <td>{kakitangansData.idKakitangan}</td>
                  <td>{kakitangansData.namaKakitangan}</td>
                  <td>
                    <EditKakitangan kakitangan={kakitangansData} onUpdateSuccess={() => fetchKakitangans(currentPage)} />
                    <Button
                      onClick={() => handleDeleteKakitangan(kakitangansData.id)}
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

export default ShowKakitanganList;
