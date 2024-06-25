import { useState, useEffect, useCallback } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateUnit from "./Create";
import EditUnit from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useUnitStore from "../../../store/unit-store";

function ShowUnitList() {
  // initialize the store
  const {
    units,
    totalPage,
    totalItems,
    namaJabatanOptions,
    fetchUnits,
    fetchJabatans,
    deleteUnit,
  } = useUnitStore();

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // fetch units
  useEffect(() => {
    fetchUnits(currentPage); 
    fetchJabatans();
  }, [currentPage, fetchUnits, fetchJabatans]);


  // handle delete of units
  const handleDeleteUnit = async (unitId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteUnit(unitId);
      const updateUnits = await fetchUnits(currentPage);

      if (updateUnits.length === 0 && currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        await fetchUnits(newPage);
      }
    }
  };

  
  // handles page reload
  const handleAddSuccess = async () => {
    await fetchUnits(currentPage);

    const totalItemsAfterAdd = totalItems + 1;
    const newTotalPage = Math.ceil(totalItemsAfterAdd / pageSize);

    if (totalItemsAfterAdd > pageSize * totalPage) {
      setCurrentPage(newTotalPage);
      await fetchUnits(newTotalPage);
    } else {
      setCurrentPage(totalPage);
      await fetchUnits(totalPage);
    }
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Unit</h3>
            </div>
            <div className="col-md-2">
              <CreateUnit jabatanOptions={namaJabatanOptions} onAddSuccess={handleAddSuccess} />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Nama Bahagian</th>
              <th>Nama Jabatan</th>
              <th>Nama Unit</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {units.length > 0 &&
              units.map((unitsData, key) => (
                <tr key={key}>
                  <td>{(currentPage - 1) * pageSize + key + 1}</td>
                  <td>{unitsData.jabatan.bahagian ? unitsData.jabatan.bahagian.namaBahagian : "N/A"}</td>
                  <td>
                    {unitsData.jabatan ? unitsData.jabatan.namaJabatan : "N/A"}
                  </td>
                  <td>{unitsData.namaUnit}</td>
                  <td>
                    <EditUnit unit={unitsData} jabatanOptions={namaJabatanOptions} onUpdateSuccess={() => fetchUnits(currentPage)} />
                    <Button
                      onClick={() => handleDeleteUnit(unitsData.id)}
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

export default ShowUnitList;
