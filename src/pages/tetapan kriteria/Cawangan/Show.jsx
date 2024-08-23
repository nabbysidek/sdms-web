import { useState, useEffect, useMemo, useCallback } from "react";
import { Row, Button, Container } from "react-bootstrap";
import CreateCawangan from "./Create";
import EditCawangan from "./Edit";
import SearchCawangan from "./Search";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useCawanganStore from "../../../store/cawangan-store";
import TableComponent from "../../../components/TableComponent";

function ShowCawanganList() {
  // USE OF CAWANGAN STORE
  const {
    cawangans,
    namaWilayahOptions,
    fetchCawangans,
    deleteCawangan,
    fetchWilayahs,
  } = useCawanganStore();

  // FETCH FROM STORE: CAWANGAN & WILAYAH
  useEffect(() => {
    fetchCawangans();
    fetchWilayahs();
  }, [fetchCawangans, fetchWilayahs]);

  // HANDLE DELETE OF CAWANGAN
  const handleDeleteCawangan = useCallback(
    async (cawanganId) => {
      const confirmResult = await showConfirmationDialog();

      if (confirmResult.isConfirmed) {
        await deleteCawangan(cawanganId);
      }
    },
    [deleteCawangan, fetchCawangans]
  );

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => cawangans, [cawangans]);
  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Wilayah",
      accessorFn: (row) => row.wilayah?.namaWilayah || "N/A",
    },
    {
      header: "Nama Cawangan",
      accessorKey: "namaCawangan",
    },
    {
      header: "Tindakan",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditCawangan
            cawangan={row.original}
            wilayahOptions={namaWilayahOptions}
            onUpdateSuccess={fetchCawangans}
          />
          <Button
            onClick={() => handleDeleteCawangan(row.original.id)}
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
    <>
      <Container fluid>
        <SearchCawangan filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-9">
              <h3 className="table-title">Senarai Cawangan</h3>
            </div>
            <div className="col-md-3">
              <CreateCawangan
                wilayahOptions={namaWilayahOptions}
                onAddSuccess={fetchCawangans}
              />
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
    </>
  );
}

export default ShowCawanganList;
