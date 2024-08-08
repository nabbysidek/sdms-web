import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import CreateBahagian from "./Create";
import EditBahagian from "./Edit";
import SearchBahagian from "./Search";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import Pagination from "../../../components/page layout/Pagination";
import useBahagianStore from "../../../store/bahagian-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

function ShowBahagianList() {
  // USE OF BAHAGIAN STORE
  const { bahagians, fetchBahagians, deleteBahagian } = useBahagianStore();

  // FETCH FROM STORE: BAHAGIAN
  useEffect(() => {
    fetchBahagians();
  }, [fetchBahagians]);

  // HANDLE DELETE OF BAHAGIAN
  const handleDeleteBahagian = useCallback(async (bahagianId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteBahagian(bahagianId);
    }
  }, [deleteBahagian, fetchBahagians]);

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => bahagians, [bahagians]);
  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Nama Bahagian",
      accessorKey: "namaBahagian",
    },
    {
      header: "Tindakan",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditBahagian bahagian={row.original} onUpdateSuccess={fetchBahagians} />
          <Button onClick={() => handleDeleteBahagian(row.original.id)} className="delete-btn">Padam</Button>
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
    state: { sorting: sorting, globalFilter:filtering, },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
      <Container fluid>
        <SearchBahagian filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Bahagian</h3>
            </div>
            <div className="col-md-2">
              <CreateBahagian onAddSuccess={fetchBahagians} />
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

export default ShowBahagianList;
