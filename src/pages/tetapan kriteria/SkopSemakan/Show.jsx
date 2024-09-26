import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Container } from "react-bootstrap";
import CreateSkopSemakan from "./Create";
import EditSkopSemakan from "./Edit";
import SearchSkopSemakan from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../showConfirmationDialog";
import Pagination from "../../../components/page layout/Pagination";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useSkopSemakanStore from "../../../store/skop-semakan-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowSkopSemakanList() {
  // USE OF SKOP SEMAKAN STORE
  const { skopSemakans, fetchSkopSemakans, deleteSkopSemakan } = useSkopSemakanStore();

  // FETCH FROM STORE: SKOP SEMAKAN
  useEffect(() => {
    fetchSkopSemakans();
  }, [fetchSkopSemakans]);

  // HANDLE DELETE OF SKOP SEMAKAN
  const handleDeleteSkopSemakan = useCallback( async (skopSemakanId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteSkopSemakan(skopSemakanId);
    }
  }, [deleteSkopSemakan, fetchSkopSemakans]);

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => skopSemakans, [skopSemakans]);
  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Nama Skop Semakan",
      accessorKey: "namaSkopSemakan",
    },
    {
      header: "Tindakan",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditSkopSemakan skopSemakan={row.original} onUpdateSuccess={fetchSkopSemakans} />
          <Button onClick={() => handleDeleteSkopSemakan(row.original.id)} className="delete-btn">Padam</Button>
        </div>
      ),
    },
  ]);

  // SORTING AND FILTERING
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // HANDLE EXPORT KAKITANGAN
  const handleExportSkopSemakan = () => {
    // PREPARE CSV DATA
    const csvData = data.map((skopSemakan, index) => ({
      Bil: index + 1,
      "NAMA SKOP SEMAKAN": skopSemakan.namaSkopSemakan,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "SENARAI SKOP SEMAKAN.csv");
  };

  return (
    <>
      <Container fluid>
      <SearchSkopSemakan filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-9">
              <h3 className="table-title">Senarai Skop Semakan</h3>
            </div>
            <div className="col-md-3">
              <CreateSkopSemakan onAddSuccess={fetchSkopSemakans} />
            </div>
          </Row>
        </div>
        <hr />
        <TableComponent
          data={data}
          columns={columns}
          sorting={sorting}
          setSorting={setSorting}
          filtering={filtering}
          setFiltering={setFiltering}
        />
        
        {/* IMPORT AND EXPORT */}
        <div className="functional-btns-container">
          <ExportButton onClick={handleExportSkopSemakan} />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowSkopSemakanList;
