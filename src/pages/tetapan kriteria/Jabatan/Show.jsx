import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Container } from "react-bootstrap";
import CreateJabatan from "./Create";
import EditJabatan from "./Edit";
import SearchJabatan from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useJabatanStore from "../../../store/jabatan-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function Show() {
  // USE OF JABATAN STORE
  const {
    jabatans,
    namaBahagianOptions,
    fetchJabatans,
    deleteJabatan,
    fetchBahagians,
  } = useJabatanStore();

  // FETCH FROM STORE: JABATAN & BAHAGIAN
  useEffect(() => {
    fetchJabatans(); 
    fetchBahagians();
  }, [fetchJabatans, fetchBahagians]);

  // HANDLE DELETE OF JABATAN
  const handleDeleteJabatan = useCallback(async (jabatanId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteJabatan(jabatanId);
    }
  },[deleteJabatan, fetchJabatans]);

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => jabatans, [jabatans]);
  const columns = useMemo(() => [
    {
      header: "Num",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Divisions",
      accessorFn: (row) => row.bahagian?.namaBahagian || "N/A",
    },
    {
      header: "Departments",
      accessorKey: "namaJabatan",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditJabatan
            jabatan={row.original}
            bahagianOptions={namaBahagianOptions}
            onUpdateSuccess={fetchJabatans}
          />
          <Button
            onClick={() => handleDeleteJabatan(row.original.id)}
            className="delete-btn"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]);

  // SORTING AND FILTERING
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // HANDLE EXPORT JABATAN
  const handleExportJabatan = () => {
    // PREPARE CSV DATA
    const csvData = data.map((jabatan, index) => ({
      Bil: index + 1,
      "DIVISIONS": jabatan.bahagian?.namaBahagian || "N/A",
      "DEPARTMENTS": jabatan.namaJabatan,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "LIST OF DIVISIONS.csv");
  };

  return (
    <Container fluid>
      <SearchJabatan filterValue={filtering} onFilterChange={setFiltering} />
      <div className="table-section">
        <Row>
          <div className="col-md-10">
            <h3 className="table-title">List of Divisions</h3>
          </div>
          <div className="col-md-2">
            <CreateJabatan bahagianOptions={namaBahagianOptions} onAddSuccess={fetchJabatans} />
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
        <ExportButton onClick={handleExportJabatan}/>
        <ImportButton />
      </div>
    </Container>
  );
}

export default Show;
