import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Container } from "react-bootstrap";
import CreateSkopKriteria from "./Create";
import EditSkopKriteria from "./Edit";
import SearchSkopKriteria from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../showConfirmationDialog";
import Pagination from "../../../components/page layout/Pagination";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useSkopKriteriaStore from "../../../store/skop-kriteria-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowSkopKriteriaList() {
  // USE OF SKOP KRITERIA STORE
  const {
    skopKriterias,
    namaSkopSemakanOptions,
    fetchSkopKriterias,
    deleteSkopKriteria,
    fetchSkopSemakans,
  } = useSkopKriteriaStore();

  // FETCH FROM STORE: SKOP SEMAKAN & SKOP KRITERIA
  useEffect(() => {
    fetchSkopKriterias();
    fetchSkopSemakans();
  }, [fetchSkopKriterias, fetchSkopSemakans]);
  
  // HANDLE DELETE OF SKOP KRITERIA
  const handleDeleteSkopKriteria = useCallback(async (skopKriteriaId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteSkopKriteria(skopKriteriaId);
    }
  },[deleteSkopKriteria, fetchSkopKriterias]);

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => skopKriterias, [skopKriterias]);
  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Skop Semakan",
      accessorFn: (row) => row.skop_semakan?.namaSkopSemakan || "N/A",
    },
    {
      header: "Nama Skop Kriteria Ketidakpatuhan",
      accessorKey: "namaSkopKriteria",
    },
    {
      header: "Tindakan",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditSkopKriteria
            skopKriteria={row.original}
            skopSemakanOptions={namaSkopSemakanOptions}
            onUpdateSuccess={fetchSkopKriterias}
          />
          <Button
            onClick={() => handleDeleteSkopKriteria(row.original.id)}
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

  // HANDLE EXPORT KAKITANGAN
  const handleExportSkopKriteria = () => {
    // Prepare CSV data
    const csvData = data.map((skopKriteria, index) => ({
      Bil: index + 1,
      "SKOP SEMAKAN": skopKriteria.skop_semakan?.namaSkopSemakan || "N/A",
      "NAMA SKOP KRITERIA KETIDAKPATUHAN": skopKriteria.namaSkopKriteria,
    }));

    // Convert to CSV format
    const csv = Papa.unparse(csvData);

    // Create a Blob and save as CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "SENARAI SKOP KRITERIA.csv");
  };

  return (
    <>
      <Container fluid>
      <SearchSkopKriteria filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-9">
              <h3 className="table-title">
                Senarai Skop Kriteria
              </h3>
            </div>
            <div className="col-md-3">
              <CreateSkopKriteria skopSemakanOptions={namaSkopSemakanOptions} onAddSuccess={fetchSkopKriterias} />
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
          <ExportButton onClick={handleExportSkopKriteria}/>
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowSkopKriteriaList;
