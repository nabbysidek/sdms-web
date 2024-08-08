import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateWilayah from "./Create";
import EditWilayah from "./Edit";
import SearchWilayah from "./Search";
import showConfirmationDialog from "../showConfirmationDialog";
import Pagination from "../../../components/page layout/Pagination";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useWilayahStore from "../../../store/wilayah-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

function ShowWilayahList() {
  // USE OF WILAYAH STORE
  const { wilayahs, fetchWilayahs, deleteWilayah } = useWilayahStore();

  // FETCH FROM STORE: WILAYAH
  useEffect(() => {
    fetchWilayahs();
  }, [fetchWilayahs]);

  // HANDLE DELETE OF WILAYAH
  const handleDeleteWilayah = useCallback(async (wilayahId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteWilayah(wilayahId);
    }
  }, [deleteWilayah, fetchWilayahs]);

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => wilayahs, [wilayahs]);
  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Nama Wilayah",
      accessorKey: "namaWilayah",
    },
    {
      header: "Tindakan",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditWilayah wilayah={row.original} onUpdateSuccess={fetchWilayahs} />
          <Button onClick={() => handleDeleteWilayah(row.original.id)} className="delete-btn">Padam</Button>
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
    <Container fluid>
      <SearchWilayah filterValue={filtering} onFilterChange={setFiltering} />
      <div className="table-section">
        <Row>
          <div className="col-md-10">
            <h3 className="table-title">Senarai Wilayah</h3>
          </div>
          <div className="col-md-2">
            <CreateWilayah onAddSuccess={fetchWilayahs} />
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
  );
}

export default ShowWilayahList;
