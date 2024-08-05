import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateKakitangan from "./Create";
import EditKakitangan from "./Edit";
import SearchKakitangan from "./Search";
import showConfirmationDialog from "../showConfirmationDialog";
import Pagination from "../../../components/page layout/Pagination";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useKakitanganStore from "../../../store/kakitangan-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

function ShowKakitanganList() {
  // ACCESS TO STORE
  const { kakitangans, fetchKakitangans, deleteKakitangan } = useKakitanganStore();

  // FETCH KAKITANGANS
  useEffect(() => {
    fetchKakitangans();
  }, [fetchKakitangans]);

// HANDLE DELETE KAKITANGAN
 const handleDeleteKakitangan = useCallback(async (kakitanganId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteKakitangan(kakitanganId);
      // await fetchKakitangans(currentPage);
    }
  }, [deleteKakitangan, fetchKakitangans]);

  // CONSTRUCT TABLE
  const data = useMemo(() => kakitangans, [kakitangans]);

  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "ID Kakitangan",
      accessorKey: "idKakitangan",
    },
    {
      header: "Nama Kakitangan",
      accessorKey: "namaKakitangan",
    },
    {
      header: "Tindakan",
      cell: ({ row }) => (
        <div>
          <EditKakitangan kakitangan={row.original} onUpdateSuccess={fetchKakitangans} />
          <Button
            onClick={() => handleDeleteKakitangan(row.original.id)}
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
    state: { sorting: sorting, globalFilter:filtering, },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <Container fluid>
      <SearchKakitangan filterValue={filtering} onFilterChange={setFiltering} />
      {/* <input type="text" value={filtering} onChange={ (e) => setFiltering(e.target.value)} /> */}
      <div className="table-section">
        <Row>
          <div className="col-md-9">
            <h3 className="table-title">Senarai Kakitangan</h3>
          </div>
          <div className="col-md-3">
            <CreateKakitangan onAddSuccess={fetchKakitangans} /> 
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
  );
}

export default ShowKakitanganList;
