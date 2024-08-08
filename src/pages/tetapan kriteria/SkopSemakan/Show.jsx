import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateSkopSemakan from "./Create";
import EditSkopSemakan from "./Edit";
import SearchSkopSemakan from "./Search";
import showConfirmationDialog from "../showConfirmationDialog";
import Pagination from "../../../components/page layout/Pagination";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useSkopSemakanStore from "../../../store/skop-semakan-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

function ShowSkopSemakanList() {
  const { skopSemakans, fetchSkopSemakans, deleteSkopSemakan } = useSkopSemakanStore();

  // fetch skop semakan
  useEffect(() => {
    fetchSkopSemakans();
  }, [fetchSkopSemakans]);


  // handle delete of skop semakan
  const handleDeleteSkopSemakan = useCallback( async (skopSemakanId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteSkopSemakan(skopSemakanId);
    }
  }, [deleteSkopSemakan, fetchSkopSemakans]);

  const data = useMemo(() => skopSemakans, [skopSemakans]);
  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Nama Skop Semakan",
      accessorKey: "namaSkopSemakan",
    },
    {
      header: "Tindakan",
      cell: ({ row }) => (
        <div>
          <EditSkopSemakan skopSemakan={row.original} onUpdateSuccess={fetchSkopSemakans} />
          <Button onClick={() => handleDeleteSkopSemakan(row.original.id)} className="delete-btn">Padam</Button>
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
    <>
      <Container fluid>
      <SearchSkopSemakan filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-9">
              <h3 className="table-title">Senarai Skop Semakan</h3>
            </div>
            <div className="col-md-3">
              <CreateSkopSemakan onAddSuccess={fetchSkopSemakans} />
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

export default ShowSkopSemakanList;
