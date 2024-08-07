import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import CreateCawangan from "./Create";
import EditCawangan from "./Edit";
import SearchCawangan from "./Search";
import showConfirmationDialog from "../showConfirmationDialog";
import Pagination from "../../../components/page layout/Pagination";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useCawanganStore from "../../../store/cawangan-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

function ShowCawanganList() {
  // initialize store
  const {
    cawangans,
    namaWilayahOptions,
    fetchCawangans,
    deleteCawangan,
    fetchWilayahs,
  } = useCawanganStore();

  // fetch cawangans
  useEffect(() => {
    fetchCawangans();
    fetchWilayahs();
  }, [fetchCawangans, fetchWilayahs]);

  // handle delete cawangans
  const handleDeleteCawangan = useCallback(
    async (cawanganId) => {
      const confirmResult = await showConfirmationDialog();

      if (confirmResult.isConfirmed) {
        await deleteCawangan(cawanganId);
      }
    },
    [deleteCawangan, fetchCawangans]
  );

  const data = useMemo(() => cawangans, [cawangans]);
  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Nama Wilayah",
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

  // FOR SORTING
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

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
        <SearchCawangan filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Cawangan</h3>
            </div>
            <div className="col-md-2">
              <CreateCawangan
                wilayahOptions={namaWilayahOptions}
                onAddSuccess={fetchCawangans}
              />
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

        <Pagination table={table}/>

        <div className="functional-btns-container">
          <ExportButton />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowCawanganList;
