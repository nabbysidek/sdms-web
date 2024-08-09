import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Table, Container } from "react-bootstrap";
import CreateSkopKriteria from "./Create";
import EditSkopKriteria from "./Edit";
import SearchSkopKriteria from "./Search";
import showConfirmationDialog from "../showConfirmationDialog";
import Pagination from "../../../components/page layout/Pagination";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useSkopKriteriaStore from "../../../store/skop-kriteria-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

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

export default ShowSkopKriteriaList;
