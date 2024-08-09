import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import CreateAktivitiSemakan from "./Create";
import EditAktivitiSemakan from "./Edit";
import SearchAktivitiSemakan from "./Search";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import Pagination from "../../../components/page layout/Pagination";
import useAktivitiSemakanStore from "../../../store/aktiviti-semakan-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

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

export default ShowAktivitiSemakanList;
