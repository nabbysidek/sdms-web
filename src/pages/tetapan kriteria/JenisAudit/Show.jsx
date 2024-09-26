import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Container } from "react-bootstrap";
import CreateJenisAudit from "./Create";
import EditJenisAudit from "./Edit";
import SearchJenisAudit from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useJenisAuditStore from "../../../store/jenis-audit-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowJenisAuditList() {
  // USE OF JENIS AUDIT STORE
  const { jenisAudits, fetchJenisAudits, deleteJenisAudit } = useJenisAuditStore();

  // FETCH FROM STORE: JENIS AUDIT
  useEffect(() => {
    fetchJenisAudits();
  }, [fetchJenisAudits]);

  // HANDLE DELETE OF JENIS AUDIT
  const handleDeleteJenisAudit = useCallback(async (jenisAuditId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteJenisAudit(jenisAuditId);
    }
  }, [deleteJenisAudit, fetchJenisAudits]);

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => jenisAudits, [jenisAudits]);
  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Nama Jenis Audit",
      accessorKey: "namaJenisAudit",
    },
    {
      header: "Tindakan",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditJenisAudit jenisAudit={row.original} onUpdateSuccess={fetchJenisAudits} />
          <Button onClick={() => handleDeleteJenisAudit(row.original.id)} className="delete-btn">Padam</Button>
        </div>
      ),
    },
  ]);

  // SORTING AND FILTERING
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // HANDLE EXPORT KAKITANGAN
  const handleExportJenisAudit = () => {
    // PREPARE CSV DATA
    const csvData = data.map((jenisAudit, index) => ({
      Bil: index + 1,
      "NAMA JENIS AUDIT": jenisAudit.namaJenisAudit,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "SENARAI JENIS AUDIT.csv");
  };

  return (
    <>
      <Container fluid>
        <SearchJenisAudit filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-9">
              <h3 className="table-title">Senarai Jenis Audit</h3>
            </div>
            <div className="col-md-3">
              <CreateJenisAudit onAddSuccess={fetchJenisAudits} />
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
          <ExportButton onClick={handleExportJenisAudit}/>
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowJenisAuditList;
