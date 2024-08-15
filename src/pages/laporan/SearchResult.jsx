import { useEffect, useMemo, useState } from "react";
import { Container, Table } from "react-bootstrap";
import ExportButton from "../../components/functional buttons/ExportBtn";
import ImportButton from "../../components/functional buttons/ImportBtn";
import Pagination from "../../components/page layout/Pagination";
import useLaporanStore from "../../store/laporan-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import "../../assets/styles/styles_laporan.css";

// Filter component to handle different types of filters
function Filter({ column }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  if (column.id === "index" || column.id === "tarikhAudit") {
    return null;
  }

  return filterVariant === "select" ? (
    <select
      className="filter-bar"
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue || ""}
    >
      <option value="">Tiada Risiko</option>
      <option value="BIASA">Biasa</option>
      <option value="SERAH DOKUMEN">Serah Dokumen</option>
      <option value="PENIPUAN">Penipuan</option>
    </select>
  ) : (
    <input
      type="text"
      value={columnFilterValue || ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Cari`}
      className="filter-bar"
    />
  );
}

function SearchResultLaporan() {
  // USE OF LAPORAN STORE
  const { audits, fetchAudits, columns } = useLaporanStore();

  // FETCH FROM STORE: AUDIT
  useEffect(() => {
    fetchAudits();
  }, [fetchAudits]);

  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => audits, [audits]);

  // SORTING AND FILTERING
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // TABLE DECLARATION
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    filterFns: {
      fuzzy: (row, columnId, value) => {
        return rankItem(row.getValue(columnId), value).passed;
      },
    },
  });

  return (
    <Container fluid>
      <h4 className="page-title">Senarai Laporan Ketidakpatuhan Kakitangan</h4>
      <hr />
      <div className="dates-container">
        <p>Hasil Carian: DD/MM/YYYY - DD/MM/YYYY</p>
      </div>
      <Table responsive>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isNarrowColumn =
                  header.column.id === "index" ||
                  header.column.id === "tarikhAudit";
                return (
                  <th
                    key={header.id}
                    className={isNarrowColumn ? "" : "wide-column"}
                  >
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span
                          onClick={header.column.getToggleSortingHandler()}
                          style={{ cursor: "pointer" }}
                        >
                          {header.column.getIsSorted() === "asc" && " 🔼"}
                          {header.column.getIsSorted() === "desc" && " 🔽"}
                        </span>
                      )}
                    </div>
                    {header.column.getCanFilter() && (
                      <Filter column={header.column} />
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const isNarrowColumn =
                  cell.column.id === "index" ||
                  cell.column.id === "tarikhAudit";
                return (
                  <td
                    key={cell.id}
                    className={isNarrowColumn ? "" : "wide-column"}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination">
          <Pagination table={table}/> 
        </div>
        
      <div className="functional-btns-container">
        <ExportButton />
        <ImportButton />
      </div>
    </Container>
  );
}

export default SearchResultLaporan;
