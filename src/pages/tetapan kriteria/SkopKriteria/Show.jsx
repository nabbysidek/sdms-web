import { useState, useEffect, useCallback } from "react";
import { Button, Row, Table, Container } from "react-bootstrap";
import CreateSkopKriteria from "./Create";
import EditSkopKriteria from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useSkopKriteriaStore from "../../../store/skop-kriteria-store";

function ShowSkopKriteriaList() {
  const {
    skopKriterias,
    totalPage,
    totalItems,
    namaSkopSemakanOptions,
    fetchSkopKriterias,
    deleteSkopKriteria,
    fetchSkopSemakans,
  } = useSkopKriteriaStore();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); 
  const pageSize = 10;

  // fetch skop kriteria
  useEffect(() => {
    fetchSkopKriterias(currentPage);
    fetchSkopSemakans();
  }, [currentPage, fetchSkopKriterias, fetchSkopSemakans]);
  
  // handle delete skop kriteria
  const handleDeleteSkopKriteria = async (skopKriteriaId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteSkopKriteria(skopKriteriaId);

      const updateSkopKriterias = await fetchSkopKriterias(currentPage);

      if (updateSkopKriterias.length === 0 && currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        await fetchSkopKriterias(newPage);
      }
    }
  };

  // handle page reload after storing new data
  const handleAddSuccess = async () => {
    await fetchSkopKriterias(currentPage);

    const totalItemsAfterAdd = totalItems + 1;
    const newTotalPage = Math.ceil(totalItemsAfterAdd / pageSize);
  
    if (totalItemsAfterAdd > pageSize * totalPage) {
      setCurrentPage(newTotalPage);
      await fetchSkopKriterias(newTotalPage);
    } else {
      setCurrentPage(totalPage);
      await fetchSkopKriterias(totalPage);
    }
  };
  

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">
                Senarai Skop Kriteria Ketidakpatuhan
              </h3>
            </div>
            <div className="col-md-2">
              <CreateSkopKriteria skopSemakanOptions={namaSkopSemakanOptions} onAddSuccess={handleAddSuccess} />
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
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {skopKriterias.length > 0 &&
              skopKriterias.map((skopKriteriasData, key) => (
                <tr key={key}>
                  <td>{(currentPage - 1) * pageSize + key + 1}</td>
                  <td>
                    {skopKriteriasData.skop_semakan
                      ? skopKriteriasData.skop_semakan.namaSkopSemakan
                      : "N/A"}
                  </td>
                  <td>{skopKriteriasData.namaSkopKriteria}</td>
                  <td>
                    <EditSkopKriteria skopKriteria={skopKriteriasData} skopSemakanOptions={namaSkopSemakanOptions} onUpdateSuccess={() => fetchSkopKriterias(currentPage)} />
                    <Button
                      onClick={() =>
                        handleDeleteSkopKriteria(skopKriteriasData.id)
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

export default ShowSkopKriteriaList;
