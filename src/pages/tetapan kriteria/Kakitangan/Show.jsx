import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Container } from "react-bootstrap";
import CreateKakitangan from "./Create";
import EditKakitangan from "./Edit";
import SearchKakitangan from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../showConfirmationDialog";
import Pagination from "../../../components/page layout/Pagination";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useKakitanganStore from "../../../store/kakitangan-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowKakitanganList() {
  // USE OF KAKITANGAN STORE
  const { kakitangans, fetchKakitangans, deleteKakitangan } = useKakitanganStore();

  // FETCH FROM STORE: KAKITANGAN
  useEffect(() => {
    fetchKakitangans();
  }, [fetchKakitangans]);

  // HANDLE DELETE OF KAKITANGAN
  const handleDeleteKakitangan = useCallback(async (kakitanganId) => {
      const confirmResult = await showConfirmationDialog();

      if (confirmResult.isConfirmed) {
        await deleteKakitangan(kakitanganId);
      }
    }, [deleteKakitangan, fetchKakitangans]);

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => kakitangans, [kakitangans]);
  const columns = useMemo(() => [
    {
      header: "Num",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Staff ID",
      accessorKey: "idKakitangan",
    },
    {
      header: "Audited Staff Name",
      accessorKey: "namaKakitangan",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditKakitangan kakitangan={row.original} onUpdateSuccess={fetchKakitangans} />
          <Button
            onClick={() => handleDeleteKakitangan(row.original.id)}
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
  
  // HANDLE EXPORT KAKITANGAN
  const handleExportKakitangan = () => {
    // PREPARE CSV DATA
    const csvData = data.map((kakitangan, index) => ({
      Bil: index + 1,
      "STAFF ID": kakitangan.idKakitangan,
      "AUDITED STAFF NAME": kakitangan.namaKakitangan,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "LIST OF AUDITED STAFF.csv");
  };

  return (
    <Container fluid>
      <SearchKakitangan filterValue={filtering} onFilterChange={setFiltering} />
      <div className="table-section">
        <Row>
          <div className="col-md-9">
            <h3 className="table-title">List of Audited Staff</h3>
          </div>
          <div className="col-md-3">
            <CreateKakitangan onAddSuccess={fetchKakitangans} /> 
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
        <ExportButton onClick={handleExportKakitangan}/>
        <ImportButton />
      </div>
    </Container>
  );
}

export default ShowKakitanganList;
