import { useState, useEffect, useCallback } from "react";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import CreateKriteriaKetidakpatuhan from "./Create";
import EditKriteriaKetidakpatuhan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import PaginationTable from "../../../components/page layout/PaginationTable";
import useKriteriaKetidakpatuhanStore from "../../../store/kriteria-ketidakpatuhan-store";

function ShowKriteriaKetidakpatuhanList() {
  // initialize the store
  const {
    kriteriaKetidakpatuhans,
    totalPage,
    totalItems,
    namaAktivitiSemakanOptions,
    fetchKriteriaKetidakpatuhans,
    fetchAktivitiSemakans,
    deleteKriteriaKetidakpatuhan,
  } = useKriteriaKetidakpatuhanStore();

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // fetch kriteria ketidakpatuhans
  useEffect(() => {
    fetchKriteriaKetidakpatuhans(currentPage); 
    fetchAktivitiSemakans();
  }, [currentPage, fetchKriteriaKetidakpatuhans, fetchAktivitiSemakans]);


  // handle delete of kriteria ketidakpatuhans
  const handleDeleteKriteriaKetidakpatuhan = async (kriteriaKetidakpatuhanId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteKriteriaKetidakpatuhan(kriteriaKetidakpatuhanId);
      const updateKriteriaKetidakpatuhans = await fetchKriteriaKetidakpatuhans(currentPage);

      if (updateKriteriaKetidakpatuhans.length === 0 && currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        await fetchKriteriaKetidakpatuhans(newPage);
      }
    }
  };

  // handles page reload
  const handleAddSuccess = async () => {
    await fetchKriteriaKetidakpatuhans(currentPage);

    const totalItemsAfterAdd = totalItems + 1;
    const newTotalPage = Math.ceil(totalItemsAfterAdd / pageSize);

    if (totalItemsAfterAdd > pageSize * totalPage) {
      setCurrentPage(newTotalPage);
      await fetchKriteriaKetidakpatuhans(newTotalPage);
    } else {
      setCurrentPage(totalPage);
      await fetchKriteriaKetidakpatuhans(totalPage);
    }
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Kriteria Ketidakpatuhan</h3>
            </div>

            <div className="col-md-2">
              <CreateKriteriaKetidakpatuhan aktivitiSemakanOptions={namaAktivitiSemakanOptions} onAddSuccess={handleAddSuccess} />
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
              <th>Nama Kriteria Ketidakpatuhan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {kriteriaKetidakpatuhans.length > 0 &&
              kriteriaKetidakpatuhans.map(
                (kriteriaKetidakpatuhansData, key) => (
                  <tr key={key}>
                    <td>{(currentPage - 1) * pageSize + key + 1}</td>
                    <td>
                      {kriteriaKetidakpatuhansData.aktiviti_semakan.skop_kriteria.skop_semakan
                        ? kriteriaKetidakpatuhansData.aktiviti_semakan.skop_kriteria.skop_semakan
                            .namaSkopSemakan
                        : "N/A"}
                        </td>
                    <td>
                    {kriteriaKetidakpatuhansData.aktiviti_semakan.skop_kriteria
                        ? kriteriaKetidakpatuhansData.aktiviti_semakan.skop_kriteria
                            .namaSkopKriteria
                        : "N/A"}
                    </td>
                    <td>
                    {kriteriaKetidakpatuhansData.aktiviti_semakan
                        ? kriteriaKetidakpatuhansData.aktiviti_semakan
                            .namaAktivitiSemakan
                        : "N/A"}
                    </td>
                    <td>
                      {kriteriaKetidakpatuhansData.namaKriteriaKetidakpatuhan}
                    </td>
                    <td>
                      <EditKriteriaKetidakpatuhan kriteriaKetidakpatuhan={kriteriaKetidakpatuhansData} aktivitiSemakanOptions={namaAktivitiSemakanOptions} onUpdateSuccess={() => fetchKriteriaKetidakpatuhans(currentPage)} />
                      <Button
                        onClick={() =>
                          handleDeleteKriteriaKetidakpatuhan(
                            kriteriaKetidakpatuhansData.id
                          )
                        }
                        className="delete-btn"
                      >
                        Padam
                      </Button>
                    </td>
                  </tr>
                )
              )}
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

export default ShowKriteriaKetidakpatuhanList;
