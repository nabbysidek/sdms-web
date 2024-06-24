import { useState, useEffect } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateWilayah from "./Create";
import EditWilayah from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useWilayahStore from "../../../store/wilayah-store";

function ShowWilayahList() {
  const { wilayahs, totalPage, fetchWilayahs, deleteWilayah } = useWilayahStore();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // fetch wilayahs
  useEffect(() => {
    fetchWilayahs(currentPage);
  }, [currentPage, fetchWilayahs]);

  // handle delete wilayahs
  const handleDeleteWilayah = async (wilayahId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteWilayah(wilayahId);

      // fetch the total number of items after deletion
      const updatedWilayahs = await fetchWilayahs(currentPage);

      // If the current page is empty and not the first page, go to the previous page
      if (updatedWilayahs.length === 0 && currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        await fetchWilayahs(newPage);
      }
    }
  };

  // handle page reload
  const handleAddSuccess = async () => {
    const updatedWilayahs = await fetchWilayahs(currentPage);

    if (updatedWilayahs.length >= pageSize) {
      setCurrentPage(totalPage + 1);
      fetchWilayahs(totalPage + 1);
    } else {
      fetchWilayahs(currentPage);
    }
  };

  return (
    <Container fluid>
      <div className="table-section">
        <Row>
          <div className="col-md-10">
            <h3 className="table-title">Senarai Wilayah</h3>
          </div>
          <div className="col-md-2">
            <CreateWilayah onAddSuccess={handleAddSuccess} />
          </div>
        </Row>
      </div>
      <hr />
      <Table responsive>
        <thead>
          <tr>
            <th>Bil</th>
            <th>Nama Wilayah</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {wilayahs.length > 0 &&
            wilayahs.map((wilayahsData, key) => (
              <tr key={key}>
                <td>{(currentPage - 1) * pageSize + key + 1}</td>
                <td>{wilayahsData.namaWilayah}</td>
                <td>
                  <EditWilayah wilayah={wilayahsData} onUpdateSuccess={() => fetchWilayahs(currentPage)} />
                  <Button
                    onClick={() => handleDeleteWilayah(wilayahsData.id)}
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

export default ShowWilayahList;
