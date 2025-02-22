import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Container } from "react-bootstrap";
import CreateYear from "./Create";
import EditYear from "./Edit";
import SearchYear from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../../manage data/showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useYearStore from "../../../store/year-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowYearList() {
  // Access the Year store
  const { years, fetchYears, deleteYear } = useYearStore();

  // Fetch year data when component mounts
  useEffect(() => {
    fetchYears();
  }, [fetchYears]);

  // Handle deleting a year record
  const handleDeleteYear = useCallback(
    async (yearId) => {
      const confirmResult = await showConfirmationDialog();
      if (confirmResult.isConfirmed) {
        await deleteYear(yearId);
      }
    },
    [deleteYear, fetchYears]
  );

  // Prepare table data
  const data = useMemo(() => years, [years]);
  const columns = useMemo(
    () => [
      {
        header: "Num",
        accessorFn: (row, i) => i + 1, // Auto-incremented index
        id: "index",
      },
      {
        header: "Year",
        accessorKey: "nameYear",
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div>
            {/* Edit and Delete buttons */}
            <EditYear year={row.original} onUpdateSuccess={fetchYears} />
            <Button
              onClick={() => handleDeleteYear(row.original.id)}
              className="delete-btn"
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [handleDeleteYear, fetchYears]
  );

  // Sorting and filtering states
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // Handle exporting year data to CSV
  const handleExportYear = () => {
    const csvData = data.map((year, index) => ({
      Num: index + 1,
      Year: year.namaYear, // Change "namaWilayah" to "namaYear"
    }));

    // Convert to CSV format
    const csv = Papa.unparse(csvData);

    // Create a file and trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "LIST_OF_YEARS.csv");
  };

  return (
    <Container fluid>
      {/* Search Bar */}
      <SearchYear filterValue={filtering} onFilterChange={setFiltering} />

      {/* Table Header */}
      <div className="table-section">
        <Row>
          <div className="col-md-10">
            <h3 className="table-title">List of Years</h3>
          </div>
          <div className="col-md-2">
            <CreateYear onAddSuccess={fetchYears} />
          </div>
        </Row>
      </div>
      <hr />

      {/* Table Component */}
      <TableComponent
        data={data}
        columns={columns}
        sorting={sorting}
        setSorting={setSorting}
        filtering={filtering}
        setFiltering={setFiltering}
      />

      {/* Import & Export Buttons */}
      <div className="functional-btns-container">
        <ExportButton onClick={handleExportYear} />
        <ImportButton />
      </div>
    </Container>
  );
}

export default ShowYearList;
