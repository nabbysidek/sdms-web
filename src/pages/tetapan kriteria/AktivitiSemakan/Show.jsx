import { useState, useEffect, useMemo, useCallback } from "react";
import { Row, Button, Container } from "react-bootstrap";
import CreateAktivitiSemakan from "./Create";
import EditAktivitiSemakan from "./Edit";
import SearchAktivitiSemakan from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import Pagination from "../../../components/page layout/Pagination";
import useAktivitiSemakanStore from "../../../store/aktiviti-semakan-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowAktivitiSemakanList() {
  // USE OF AKTIVITI SEMAKAN STORE
  const {
    aktivitiSemakans,
    namaSkopKriteriaOptions,
    fetchAktivitiSemakans,
    fetchSkopKriterias,
    deleteAktivitiSemakan,
  } = useAktivitiSemakanStore();

  // FETCH FROM STORE: AKTIVITI SEMAKAN & SKOP KRITERIA
  useEffect(() => {
    fetchAktivitiSemakans(); 
    fetchSkopKriterias();
  }, [fetchAktivitiSemakans, fetchSkopKriterias]);

  // HANDLE DELETE OF AKTIVITI SEMAKAN
  const handleDeleteAktivitiSemakan = useCallback(async (aktivitiSemakanId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteAktivitiSemakan(aktivitiSemakanId);
    }
  },[deleteAktivitiSemakan, fetchAktivitiSemakans]);

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => aktivitiSemakans, [aktivitiSemakans]);
  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Skop Semakan",
      accessorFn: (row) => row.skop_kriteria?.skop_semakan?.namaSkopSemakan || "N/A",
    },
    {
      header: "Skop Kriteria Ketidakpatuhan",
      accessorFn: (row) => row.skop_kriteria?.namaSkopKriteria || "N/A",
    },
    {
      header: "Nama Aktiviti Semakan",
      accessorKey: "namaAktivitiSemakan",
    },
    {
      header: "Tindakan",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditAktivitiSemakan
            aktivitiSemakan={row.original}
            skopKriteriaOptions={namaSkopKriteriaOptions}
            onUpdateSuccess={fetchAktivitiSemakans}
          />
          <Button
            onClick={() => handleDeleteAktivitiSemakan(row.original.id)}
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

  // HANDLE EXPORT AKTIVITI SEMAKAN
  const handleExportAktivitiSemakan = () => {
    // PREPARE CSV DATA
    const csvData = data.map((aktivitiSemakan, index) => ({
      Bil: index + 1,
      "SKOP SEMAKAN": aktivitiSemakan.skop_kriteria?.skop_semakan?.namaSkopSemakan || "N/A",
      "SKOP KRITERIA KETIDAKPATUHAN": aktivitiSemakan.skop_kriteria?.namaSkopKriteria || "N/A",
      "NAMA AKTIVITI SEMAKAN": aktivitiSemakan.namaAktivitiSemakan,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "SENARAI AKTIVITI SEMAKAN.csv");
  };

  return (
    <>
      <Container fluid>
      <SearchAktivitiSemakan filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-9">
              <h3 className="table-title">Senarai Aktiviti Semakan</h3>
            </div>
            <div className="col-md-3">
              <CreateAktivitiSemakan skopKriteriaOptions={namaSkopKriteriaOptions} onAddSuccess={fetchAktivitiSemakans} />
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
          <ExportButton onClick={handleExportAktivitiSemakan} />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowAktivitiSemakanList;
