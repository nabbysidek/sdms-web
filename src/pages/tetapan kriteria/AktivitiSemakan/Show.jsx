import { useState, useEffect, useCallback } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import CreateAktivitiSemakan from "./Create";
import EditAktivitiSemakan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import PaginationTable from "../../../components/page layout/PaginationTable";
import useAktivitiSemakanStore from "../../../store/aktiviti-semakan-store";

function ShowAktivitiSemakanList() {
  // initialize the store
  const {
    aktivitiSemakans,
    totalPage,
    totalItems,
    namaSkopKriteriaOptions,
    fetchAktivitiSemakans,
    fetchSkopKriterias,
    deleteAktivitiSemakan,
  } = useAktivitiSemakanStore();

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // fetch aktiviti semakan
  useEffect(() => {
    fetchAktivitiSemakans(currentPage); 
    fetchSkopKriterias();
  }, [currentPage, fetchAktivitiSemakans, fetchSkopKriterias]);

  // handle delete of aktiviti semakan
  const handleDeleteAktivitiSemakan = async (aktivitiSemakanId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteAktivitiSemakan(aktivitiSemakanId);
      const updateAktivitiSemakans = await fetchAktivitiSemakans(currentPage);

      if (updateAktivitiSemakans.length === 0 && currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        await fetchAktivitiSemakans(newPage);
      }
    }
  };

  
  // handles page reload
  const handleAddSuccess = async () => {
    await fetchAktivitiSemakans(currentPage);

    const totalItemsAfterAdd = totalItems + 1;
    const newTotalPage = Math.ceil(totalItemsAfterAdd / pageSize);

    if (totalItemsAfterAdd > pageSize * totalPage) {
      setCurrentPage(newTotalPage);
      await fetchAktivitiSemakans(newTotalPage);
    } else {
      setCurrentPage(totalPage);
      await fetchAktivitiSemakans(totalPage);
    }
  };


  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Aktiviti Semakan</h3>
            </div>
            <div className="col-md-2">
              <CreateAktivitiSemakan skopKriteriaOptions={namaSkopKriteriaOptions} onAddSuccess={handleAddSuccess} />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Nama Skop Semakan</th>
              <th>Nama Skop Kriteria Ketidakpatuhan</th>
              <th>Nama Aktiviti Semakan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {aktivitiSemakans.length > 0 &&
              aktivitiSemakans.map((aktivitiSemakansData, key) => (
                <tr key={key}>
                  <td>{(currentPage - 1) * pageSize + key + 1}</td>
                  <td>
                    {aktivitiSemakansData.skop_kriteria.skop_semakan
                      ? aktivitiSemakansData.skop_kriteria.skop_semakan
                          .namaSkopSemakan
                      : "N/A"}
                  </td>
                  <td>
                    {aktivitiSemakansData.skop_kriteria
                      ? aktivitiSemakansData.skop_kriteria.namaSkopKriteria
                      : "N/A"}
                  </td>
                  <td>{aktivitiSemakansData.namaAktivitiSemakan}</td>
                  <td>
                    <EditAktivitiSemakan skopKriteriaOptions={namaSkopKriteriaOptions} aktivitiSemakan={aktivitiSemakansData} onUpdateSuccess={() => fetchAktivitiSemakans(currentPage)} />
                    <Button
                      onClick={() =>
                        handleDeleteAktivitiSemakan(aktivitiSemakansData.id)
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

        {/* Functional buttons */}
        <div className="functional-btns-container">
          <ExportButton />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowAktivitiSemakanList;
