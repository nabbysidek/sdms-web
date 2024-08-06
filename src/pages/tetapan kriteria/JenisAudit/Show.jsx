import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Table, Container } from "react-bootstrap";
import CreateJenisAudit from "./Create";
import EditJenisAudit from "./Edit";
import SearchJenisAudit from "./Search";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import Pagination from "../../../components/page layout/Pagination";
import useJenisAuditStore from "../../../store/jenis-audit-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

function ShowJenisAuditList() {
  // initialize store
  const { jenisAudits, fetchJenisAudits, deleteJenisAudit } = useJenisAuditStore();

  // fetch jenis audit
  useEffect(() => {
    fetchJenisAudits();
  }, [fetchJenisAudits]);

  // handle delete of jenis audit
  const handleDeleteJenisAudit = useCallback(async (jenisAuditId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteJenisAudit(jenisAuditId);
    }
  }, [deleteJenisAudit, fetchJenisAudits]);

  const data = useMemo(() => jenisAudits, [jenisAudits]);
  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Nama Jenis Audit",
      accessorKey: "namaJenisAudit",
    },
    {
      header: "Tindakan",
      cell: ({ row }) => (
        <div>
          <EditJenisAudit jenisAudit={row.original} onUpdateSuccess={fetchJenisAudits} />
          <Button onClick={() => handleDeleteJenisAudit(row.original.id)} className="delete-btn">Padam</Button>
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
        <SearchJenisAudit filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Jenis Audit</h3>
            </div>
            <div className="col-md-2">
              <CreateJenisAudit onAddSuccess={fetchJenisAudits} />
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

export default ShowJenisAuditList;
