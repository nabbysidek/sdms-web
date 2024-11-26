import { useEffect, useMemo, useState } from "react";
import { Container, Table, Form, Row, Col } from "react-bootstrap";
import ExportButton from "../../components/functional buttons/ExportBtn";
import ImportButton from "../../components/functional buttons/ImportBtn";
import Pagination from "../../components/page layout/Pagination";
import useLaporanKumulatifStore from "../../store/laporan-kumulatif-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import "../../assets/styles/styles_laporan_kumulatif.css";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

// Filter components to allow different ways of filtering 
function Filter({ column }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  // Dropdown filter for Tahap Risiko 
  if (column.id === "index" || column.id === "tarikhAudit") {
    return null;
  }

  return filterVariant === "select" ? (
    <select
      className="filter-bar"
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue || ""}
    >
      <option value="">Select Risk Level</option>
      <option value="RENDAH">Low</option>
      <option value="SEDERHANA">Medium</option>
      <option value="TINGGI">High</option>
    </select>
  ) : (
    <input
      type="text"
      value={columnFilterValue || ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Tapis`}
      className="filter-bar"
    />
  );
}

function SearchResultLaporanKumulatif() {
  // Use of Laporan store
  const { audits, fetchAudits, columns } = useLaporanKumulatifStore();

  // Fetch from store for Audits
  useEffect(() => {
    fetchAudits();
  }, [fetchAudits]);

  // Filter reports by a date range
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredData = useMemo(() => {
    return audits.filter((row) => {
      const date = new Date(row.tarikhAudit);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (!start || date >= start) && (!end || date <= end);
    });
  }, [audits, startDate, endDate]);

  // Fetch data and declare columns
  const data = useMemo(() => audits, [audits]);

  // Sorting and Filtering
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // Table declaration
  const table = useReactTable({
    data: filteredData,
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

  // Handle Export Reports
  const handleExportLaporan = () => {
    // PREPARE CSV DATA
    const csvData = filteredData.map((laporan, index) => ({
      Bil: index + 1,
      "AUDIT DATE": laporan.tarikhAudit,
      "LEVEL OF RISK": laporan.tahapRisikoAudit,
      "STATE": laporan.wilayah?.namaWilayah,
      "BRANCH": laporan.cawangan?.namaCawangan,
      "REPEATED OFFENSE?": laporan.kesalahanBerulang,
      "TYPES OF AUDIT": laporan.jenis_audit?.namaJenisAudit,
      "REVIEW SCOPE": laporan.skop_semakan?.namaSkopSemakan,
      "NONCOMPLIANCE SCOPE": laporan.skop_kriteria?.namaSkopKriteria,
      "ACTIVITY REVIEW": laporan.aktiviti_semakan?.namaAktivitiSemakan,
      "NONCOMPLIANCE":
        laporan.kriteria_ketidakpatuhan?.namaKriteriaKetidakpatuhan,
      "STAFF ID": laporan.kakitangan?.idKakitangan,
      "STAFF NAME": laporan.kakitangan?.namaKakitangan,
      "STAFF POSITION": laporan.jawatanKakitangan,
      "DIVISION": laporan.bahagian?.namaBahagian,
      "DEPARTMENT": laporan.jabatan?.namaJabatan,
      "UNIT": laporan.unit?.namaUnit,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "NONCOMPLIANCE REPORTS.csv");
  };

  return (
    <Container fluid>
      <div className="laporan-kumulatif-search-container">
        <Form>
          <Row>
            <Col xs={12} xl={6}>
              <Form.Group>
                <Form.Label className="laporan-kumulatif-filter-header">
                  Start Date
                </Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} xl={6}>
              <Form.Group>
                <Form.Label className="laporan-kumulatif-filter-header">
                  End Date
                </Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="dates-container">
        <p>
          Search Results for Time Range: {startDate ? startDate : "DD/MM/YYYY"} -{" "}
          {endDate ? endDate : "DD/MM/YYYY"}
        </p>
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
        <Pagination table={table} />
      </div>

      <div className="functional-btns-container">
        <ExportButton onClick={handleExportLaporan} />
        <ImportButton disabled={true} />
      </div>
    </Container>
  );
}

export default SearchResultLaporanKumulatif;
