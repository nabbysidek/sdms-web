import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Container } from "react-bootstrap";
import CreateUnit from "./Create";
import EditUnit from "./Edit";
import SearchUnit from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../showConfirmationDialog";
import Pagination from "../../../components/page layout/Pagination";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useUnitStore from "../../../store/unit-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowUnitList() {
  // USE OF UNIT STORE
  const {
    units,
    namaJabatanOptions,
    fetchUnits,
    deleteUnit,
    fetchJabatans,
  } = useUnitStore();

   // FETCH FROM STORE: UNIT & JABATAN
  useEffect(() => {
    fetchUnits(); 
    fetchJabatans();
  }, [fetchUnits, fetchJabatans]);

  // HANDLE DELETE OF UNIT
  const handleDeleteUnit = useCallback(async (unitId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteUnit(unitId);
    }
  },[deleteUnit, fetchUnits]);

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => units, [units]);
  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Bahagian",
      accessorFn: (row) => row.jabatan?.bahagian?.namaBahagian || "N/A",
    },
    {
      header: "Jabatan",
      accessorFn: (row) => row.jabatan?.namaJabatan || "N/A",
    },
    {
      header: "Nama Unit",
      accessorKey: "namaUnit",
    },
    {
      header: "Tindakan",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditUnit
            unit={row.original}
            jabatanOptions={namaJabatanOptions}
            onUpdateSuccess={fetchUnits}
          />
          <Button
            onClick={() => handleDeleteUnit(row.original.id)}
            className="delete-btn"
          >
            Padam
          </Button>
        </div>
      ),
    },
  ]);
  
  // SORTING AND FILTERING
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // HANDLE EXPORT UNIT
  const handleExportUnit = () => {
    // PREPARE CSV DATA
    const csvData = data.map((unit, index) => ({
      Bil: index + 1,
      "BAHAGIAN": unit.jabatan?.bahagian?.namaBahagian || "N/A",
      "JABATAN": unit.jabatan?.namaJabatan || "N/A",
      "NAMA UNIT": unit.namaUnit,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "SENARAI UNIT.csv");
  };

  return (
    <>
      <Container fluid>
      <SearchUnit filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Unit</h3>
            </div>
            <div className="col-md-2">
              <CreateUnit jabatanOptions={namaJabatanOptions} onAddSuccess={fetchUnits} />
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
          <ExportButton onClick={handleExportUnit} />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowUnitList;
