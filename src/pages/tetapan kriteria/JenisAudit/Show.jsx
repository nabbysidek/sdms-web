import { useState, useEffect } from "react";
import { Button, Row, Table, Container } from "react-bootstrap";
import CreateJenisAudit from "./Create";
import EditJenisAudit from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import PaginationTable from "../../../components/page layout/PaginationTable";
import useJenisAuditStore from "../../../store/jenis-audit-store";

function ShowJenisAuditList() {
  // initialize store
  const { jenisAudits, totalPage, totalItems, fetchJenisAudits, deleteJenisAudit } = useJenisAuditStore();

  // pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const pageSize = 10;

  // fetch bahagians
  useEffect(() => {
    fetchJenisAudits(currentPage);
  }, [currentPage, fetchJenisAudits]);


  // handle delete of bahagians
  const handleDeleteJenisAudit = async (bahagianId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteJenisAudit(bahagianId);
      
      // fetch the total number of items after deletion
      const updatedJenisAudits = await fetchJenisAudits(currentPage);

      // If the current page is empty and not the first page, go to the previous page
      if (updatedJenisAudits.length === 0 && currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        await fetchJenisAudits(newPage);
      }
    }
  };

  // handles page reload
  const handleAddSuccess = async () => {
    await fetchJenisAudits(currentPage);

    const totalItemsAfterAdd = totalItems + 1;
    const newTotalPage = Math.ceil(totalItemsAfterAdd / pageSize);

    if (totalItemsAfterAdd > pageSize * totalPage) {
      setCurrentPage(newTotalPage);
      await fetchJenisAudits(newTotalPage);
    } else {
      setCurrentPage(totalPage);
      await fetchJenisAudits(totalPage);
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
              <CreateJenisAudit onAddSuccess={handleAddSuccess} />
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
                  <td>{(currentPage - 1) * pageSize + key + 1}</td>
                  <td>{jenisAuditsData.namaJenisAudit}</td>
                  <td>
                    <EditJenisAudit jenisAudit={jenisAuditsData} onUpdateSuccess={() => fetchJenisAudits(currentPage)} />
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
