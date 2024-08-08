import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateUnit from "./Create";
import EditUnit from "./Edit";
import SearchUnit from "./Search";
import showConfirmationDialog from "../showConfirmationDialog";
import Pagination from "../../../components/page layout/Pagination";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useUnitStore from "../../../store/unit-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

function ShowUnitList() {
  // USE OF UNIT STORE
  const {
    units,
    namaJabatanOptions,
    fetchUnits,
    deleteUnit,
    fetchJabatans,
  } = useUnitStore();

   // FETCH FROM STORE: UNIT & JABATAN
  useEffect(() => {
    fetchUnits(); 
    fetchJabatans();
  }, [fetchUnits, fetchJabatans]);

  // HANDLE DELETE OF UNIT
  const handleDeleteUnit = useCallback(async (unitId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteUnit(unitId);
    }
  },[deleteUnit, fetchUnits]);

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => units, [units]);
  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Bahagian",
      accessorFn: (row) => row.jabatan?.bahagian?.namaBahagian || "N/A",
    },
    {
      header: "Jabatan",
      accessorFn: (row) => row.jabatan?.namaJabatan || "N/A",
    },
    {
      header: "Nama Unit",
      accessorKey: "namaUnit",
    },
    {
      header: "Tindakan",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditUnit
            unit={row.original}
            jabatanOptions={namaJabatanOptions}
            onUpdateSuccess={fetchUnits}
          />
          <Button
            onClick={() => handleDeleteUnit(row.original.id)}
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
      <SearchUnit filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Unit</h3>
            </div>
            <div className="col-md-2">
              <CreateUnit jabatanOptions={namaJabatanOptions} onAddSuccess={fetchUnits} />
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

export default ShowUnitList;
