import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateKriteriaKetidakpatuhan from "./Create";
import EditKriteriaKetidakpatuhan from "./Edit";
import SearchKriteriaKetidakpatuhan from "./Search";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import Pagination from "../../../components/page layout/Pagination";
import useKriteriaKetidakpatuhanStore from "../../../store/kriteria-ketidakpatuhan-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

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
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Skop Semakan",
      accessorFn: (row) => row.aktiviti_semakan?.skop_kriteria?.skop_semakan?.namaSkopSemakan || "N/A",
    },
    {
      header: "Skop Kriteria Ketidakpatuhan",
      accessorFn: (row) => row.aktiviti_semakan?.skop_kriteria?.namaSkopKriteria || "N/A",
    },
    {
      header: "Aktiviti Semakan",
      accessorFn: (row) => row.aktiviti_semakan?.namaAktivitiSemakan || "N/A",
    },
    {
      header: "Nama Kriteria Ketidakpatuhan",
      accessorKey: "namaKriteriaKetidakpatuhan",
    },
    {
      header: "Tindakan",
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
            Padam
          </Button>
        </div>
      ),
    },
  ]);

  // SORTING AND FILTERING
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // TABLE DECLARATION
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting: sorting, globalFilter: filtering },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
      <Container fluid>
      <SearchKriteriaKetidakpatuhan filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-8">
              <h3 className="table-title">Senarai Kriteria Ketidakpatuhan</h3>
            </div>

            <div className="col-md-4">
              <CreateKriteriaKetidakpatuhan aktivitiSemakanOptions={namaAktivitiSemakanOptions} onAddSuccess={fetchKriteriaKetidakpatuhans} />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
          {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      { asc: " 🔼", desc: " 🔽" }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        {/* PAGINATION */}
        <Pagination table={table}/>

        {/* IMPORT AND EXPORT */}
        <div className="functional-btns-container">
          <ExportButton />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowKriteriaKetidakpatuhanList;
