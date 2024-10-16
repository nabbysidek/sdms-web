import { useState, useEffect, useMemo, useCallback } from "react";
import { Row, Button, Container } from "react-bootstrap";
import CreateBahagian from "./Create";
import EditBahagian from "./Edit";
import SearchBahagian from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useBahagianStore from "../../../store/bahagian-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowBahagianList() {
  // USE OF BAHAGIAN STORE
  const { bahagians, fetchBahagians, deleteBahagian } = useBahagianStore();

  // FETCH FROM STORE: BAHAGIAN
  useEffect(() => {
    fetchBahagians();
  }, [fetchBahagians]);

  // HANDLE DELETE OF BAHAGIAN
  const handleDeleteBahagian = useCallback(async (bahagianId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteBahagian(bahagianId);
    }
  }, [deleteBahagian, fetchBahagians]);

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => bahagians, [bahagians]);
  const columns = useMemo(() => [
    {
      header: "Num",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Divisions",
      accessorKey: "namaBahagian",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditBahagian bahagian={row.original} onUpdateSuccess={fetchBahagians} />
          <Button onClick={() => handleDeleteBahagian(row.original.id)} className="delete-btn">Padam</Button>
        </div>
      ),
    },
  ]);

  // SORTING AND FILTERING
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // HANDLE EXPORT BAHAGIAN
  const handleExportBahagian = () => {
    // PREPARE CSV DATA
    const csvData = data.map((bahagian, index) => ({
      Bil: index + 1,
      "DIVISIONS": bahagian.namaBahagian,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "LIST OF DIVISIONS.csv");
  };

  return (
    <>
      <Container fluid>
        <SearchBahagian filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">List of Divisions</h3>
            </div>
            <div className="col-md-2">
              <CreateBahagian onAddSuccess={fetchBahagians} />
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
          <ExportButton onClick={handleExportBahagian} />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowBahagianList;
