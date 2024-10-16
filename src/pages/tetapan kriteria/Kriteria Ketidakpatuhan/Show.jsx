import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Container } from "react-bootstrap";
import CreateKriteriaKetidakpatuhan from "./Create";
import EditKriteriaKetidakpatuhan from "./Edit";
import SearchKriteriaKetidakpatuhan from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useKriteriaKetidakpatuhanStore from "../../../store/kriteria-ketidakpatuhan-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowKriteriaKetidakpatuhanList() {
  // USE OF KRITERIA KETIDAKPATUHAN STORE
  const {
    kriteriaKetidakpatuhans,
    namaAktivitiSemakanOptions,
    fetchKriteriaKetidakpatuhans,
    fetchAktivitiSemakans,
    deleteKriteriaKetidakpatuhan,
  } = useKriteriaKetidakpatuhanStore();

  // FETCH FROM STORE: KRITERIA KETIDAKPATUHAN & AKTIVITI SEMAKAN
  useEffect(() => {
    fetchKriteriaKetidakpatuhans(); 
    fetchAktivitiSemakans();
  }, [fetchKriteriaKetidakpatuhans, fetchAktivitiSemakans]);


  // HANDLE DELETE OF KRITERIA KETIDAKPATUHAN
  const handleDeleteKriteriaKetidakpatuhan = useCallback(async (kriteriaKetidakpatuhanId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteKriteriaKetidakpatuhan(kriteriaKetidakpatuhanId);
    }
  },[deleteKriteriaKetidakpatuhan, fetchKriteriaKetidakpatuhans]);

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => kriteriaKetidakpatuhans, [kriteriaKetidakpatuhans]);
  const columns = useMemo(() => [
    {
      header: "Num",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Review Scopes",
      accessorFn: (row) => row.aktiviti_semakan?.skop_kriteria?.skop_semakan?.namaSkopSemakan || "N/A",
    },
    {
      header: "Noncompliance Scopes",
      accessorFn: (row) => row.aktiviti_semakan?.skop_kriteria?.namaSkopKriteria || "N/A",
    },
    {
      header: "Activity Reviews",
      accessorFn: (row) => row.aktiviti_semakan?.namaAktivitiSemakan || "N/A",
    },
    {
      header: "Noncompliances",
      accessorKey: "namaKriteriaKetidakpatuhan",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditKriteriaKetidakpatuhan
            kriteriaKetidakpatuhan={row.original}
            aktivitiSemakanOptions={namaAktivitiSemakanOptions}
            onUpdateSuccess={fetchKriteriaKetidakpatuhans}
          />
          <Button
            onClick={() => handleDeleteKriteriaKetidakpatuhan(row.original.id)}
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

  // HANDLE EXPORT AKTIVITI SEMAKAN
  const handleExportKriteriaKetidakpatuhan = () => {
    // PREPARE CSV DATA
    const csvData = data.map((kriteriaKetidakpatuhan, index) => ({
      Bil: index + 1,
      "REVIEW SCOPES": kriteriaKetidakpatuhan.aktiviti_semakan?.skop_kriteria?.skop_semakan?.namaSkopSemakan || "N/A",
      "NONCOMPLIANCE SCOPES": kriteriaKetidakpatuhan.aktiviti_semakan?.skop_kriteria?.namaSkopKriteria || "N/A",
      "ACTIVITY REVIEWS": kriteriaKetidakpatuhan.aktiviti_semakan?.namaAktivitiSemakan || "N/A",
      "NONCOMPLIANCES": kriteriaKetidakpatuhan.namaKriteriaKetidakpatuhan,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "LIST OF NONCOMPLIANCES.csv");
  };

  return (
    <>
      <Container fluid>
      <SearchKriteriaKetidakpatuhan filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-8">
              <h3 className="table-title">List of Noncompliances</h3>
            </div>

            <div className="col-md-4">
              <CreateKriteriaKetidakpatuhan aktivitiSemakanOptions={namaAktivitiSemakanOptions} onAddSuccess={fetchKriteriaKetidakpatuhans} />
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
          <ExportButton onClick={handleExportKriteriaKetidakpatuhan}/>
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowKriteriaKetidakpatuhanList;
