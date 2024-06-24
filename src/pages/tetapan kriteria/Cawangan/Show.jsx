import { useState, useEffect } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import CreateCawangan from "./Create";
import EditCawangan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useCawanganStore from "../../../store/cawangan-store";

function ShowCawanganList() {
  const {
    cawangans,
    totalPage,
    totalItems,
    namaWilayahOptions,
    fetchCawangans,
    deleteCawangan,
    fetchWilayahs,
  } = useCawanganStore();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // fetch cawangans
  useEffect(() => {
    fetchCawangans(currentPage);
    fetchWilayahs();
  }, [currentPage, fetchCawangans, fetchWilayahs]);

  // handle delete cawangans
  const handleDeleteCawangan = async (cawanganId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteCawangan(cawanganId);

      const updateCawangans = await fetchCawangans(currentPage);

      if (updateCawangans.length === 0 && currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        await fetchCawangans(newPage);
      }
    }
  };

  // handle page reload after storing new data
  const handleAddSuccess = async () => {
    await fetchCawangans(currentPage);

    const totalItemsAfterAdd = totalItems + 1;
    const newTotalPage = Math.ceil(totalItemsAfterAdd / pageSize);

    if (totalItemsAfterAdd > pageSize * totalPage) {
      setCurrentPage(newTotalPage);
      await fetchCawangans(newTotalPage);
    } else {
      setCurrentPage(totalPage);
      await fetchCawangans(totalPage);
    }
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Cawangan</h3>
            </div>
            <div className="col-md-2">
              <CreateCawangan wilayahOptions={namaWilayahOptions} onAddSuccess={handleAddSuccess} />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Nama Wilayah</th>
              <th>Nama Cawangan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {cawangans.length > 0 &&
              cawangans.map((cawangansData, key) => (
                <tr key={key}>
                  <td>{(currentPage - 1) * pageSize + key + 1}</td>
                  <td>{cawangansData.wilayah ? cawangansData.wilayah.namaWilayah : "N/A"}</td>
                  <td>{cawangansData.namaCawangan}</td>
                  <td>
                    <EditCawangan cawangan={cawangansData} wilayahOptions={namaWilayahOptions} onUpdateSuccess={() => fetchCawangans(currentPage)} />
                    <Button onClick={() => handleDeleteCawangan(cawangansData.id)} className="delete-btn">
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

export default ShowCawanganList;
