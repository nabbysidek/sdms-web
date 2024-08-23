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
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Bahagian",
      accessorFn: (row) => row.bahagian?.namaBahagian || "N/A",
    },
    {
      header: "Nama Jabatan",
      accessorKey: "namaJabatan",
    },
    {
      header: "Tindakan",
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
            Padam
          </Button>
        </div>
      ),
    },
  ]);

  // SORTING AND FILTERING
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  return (
    <Container fluid>
      <SearchJabatan filterValue={filtering} onFilterChange={setFiltering} />
      <div className="table-section">
        <Row>
          <div className="col-md-10">
            <h3 className="table-title">Senarai Jabatan</h3>
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
        <ExportButton />
        <ImportButton />
      </div>
    </Container>
  );
}

export default Show;
