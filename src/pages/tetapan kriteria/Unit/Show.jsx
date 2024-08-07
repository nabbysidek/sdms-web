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
  // initialize the store
  const {
    units,
    namaJabatanOptions,
    fetchUnits,
    deleteUnit,
    fetchJabatans,
  } = useUnitStore();

  // fetch units
  useEffect(() => {
    fetchUnits(); 
    fetchJabatans();
  }, [fetchUnits, fetchJabatans]);


  // handle delete of units
  const handleDeleteUnit = useCallback(async (unitId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteUnit(unitId);
    }
  },[deleteUnit, fetchUnits]);

  const data = useMemo(() => units, [units]);
  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Nama Bahagian",
      accessorFn: (row) => row.jabatan?.bahagian?.namaBahagian || "N/A",
    },
    {
      header: "Nama Jabatan",
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
            {/* {units.length > 0 &&
              units.map((unitsData, key) => (
                <tr key={key}>
                  <td>{(currentPage - 1) * pageSize + key + 1}</td>
                  <td>{unitsData.jabatan.bahagian ? unitsData.jabatan.bahagian.namaBahagian : "N/A"}</td>
                  <td>
                    {unitsData.jabatan ? unitsData.jabatan.namaJabatan : "N/A"}
                  </td>
                  <td>{unitsData.namaUnit}</td>
                  <td>
                    <EditUnit unit={unitsData} jabatanOptions={namaJabatanOptions} onUpdateSuccess={() => fetchUnits(currentPage)} />
                    <Button
                      onClick={() => handleDeleteUnit(unitsData.id)}
                      className="delete-btn"
                    >
                      Padam
                    </Button>
                  </td>
                </tr>
              ))} */}
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

export default ShowUnitList;
