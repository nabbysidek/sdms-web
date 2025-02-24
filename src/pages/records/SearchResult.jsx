import { useEffect, useMemo, useState } from "react";
import { Container, Table, Form, Row, Col } from "react-bootstrap";
import ExportButton from "../../components/functional buttons/ExportBtn";
import ImportButton from "../../components/functional buttons/ImportBtn";
import Pagination from "../../components/page layout/Pagination";
import useRecordsStore from "../../store/records-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import "../../assets/styles/styles_records.css";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function SearchResultRecords() {
  // Use of Laporan store
  const { records, fetchRecords, columns } = useRecordsStore();

  // Fetch from store for records
  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // Filter records by a date range
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredData = useMemo(() => {
    return records.filter((row) => {
      const date = new Date(row.reportDate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (!start || date >= start) && (!end || date <= end);
    });
  }, [records, startDate, endDate]);

  // Fetch data and declare columns
  const data = useMemo(() => records, [records]);

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

  // Handle Export records
  const handleExportRecords = () => {
    // PREPARE CSV DATA
    const csvData = filteredData.map((records, index) => ({
      Bil: index + 1,
      "REPORT DATE": records.reportDate,
      YEAR: records.year?.yearName,
      CLASS: records.class?.className,
      "MISDEMEANOR CATEGORY":
        records.misdemeanor_category?.misdemeanorCategoryName,
      MISDEMEANOR: records.misdemeanor?.misdemeanorName,
      "STUDENT ID": records.student?.studentId,
      "STUDENT NAME": records.student?.studentName,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "MSIDEMEANOR RECORDS.csv");
  };

  return (
    <Container fluid>
      <div className="records-search-container">
        <Form>
          <Row>
            <Col xs={12} xl={6}>
              <Form.Group>
                <Form.Label className="records-filter-header">
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
                <Form.Label className="records-filter-header">
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
          Search Results for Time Range: {startDate ? startDate : "DD/MM/YYYY"}{" "}
          - {endDate ? endDate : "DD/MM/YYYY"}
        </p>
      </div>
      <Table responsive>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isNarrowColumn =
                  header.column.id === "index" ||
                  header.column.id === "reportDate";
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
                      <input
                        type="text"
                        value={header.column.getFilterValue() || ""}
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                        placeholder={`Search ${header.column.columnDef.header}`}
                      />
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
                  cell.column.id === "index" || cell.column.id === "reportDate";
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
        <ExportButton onClick={handleExportRecords} />
        <ImportButton disabled={true} />
      </div>
    </Container>
  );
}

export default SearchResultRecords;
