import { useState, useEffect, useMemo, useCallback } from "react";
import { Row, Button, Container } from "react-bootstrap";
import CreateClass from "./Create";
import EditClass from "./Edit";
import SearchClass from "./Search";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useClassStore from "../../../store/class-store";
import TableComponent from "../../../components/TableComponent";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowClassList() {
  // USE OF CLASS STORE
  const {
    classes,
    yearOptions,
    fetchClasses,
    deleteClass,
    fetchYears,
  } = useClassStore();

  // FETCH DATA FROM STORE: CLASSES & YEARS
  useEffect(() => {
    fetchClasses();
    fetchYears();
  }, [fetchClasses, fetchYears]);

  // HANDLE DELETE CLASS
  const handleDeleteClass = useCallback(
    async (classId) => {
      const confirmResult = await showConfirmationDialog();

      if (confirmResult.isConfirmed) {
        await deleteClass(classId);
      }
    },
    [deleteClass, fetchClasses]
  );

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => classes, [classes]);
  const columns = useMemo(() => [
    {
      header: "Num",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Year",
      accessorFn: (row) => row.year?.yearName || "N/A",
    },
    {
      header: "Classes",
      accessorKey: "className",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR ACTIONS COLUMN */}
          <EditClass
            classData={row.original}
            yearOptions={yearOptions}
            onUpdateSuccess={fetchClasses}
          />
          <Button
            onClick={() => handleDeleteClass(row.original.id)}
            className="delete-btn"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]);

  // SORTING AND FILTERING
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // HANDLE EXPORT CLASS DATA
  const handleExportClass = () => {
    // PREPARE CSV DATA
    const csvData = data.map((classItem, index) => ({
      Bil: index + 1,
      YEAR: classItem.year?.yearName || "N/A",
      CLASSES: classItem.className,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "LIST OF CLASSES.csv");
  };

  return (
    <>
      <Container fluid>
        <SearchClass filterValue={filtering} onFilterChange={setFiltering} />
        <div className="table-section">
          <Row>
            <div className="col-md-9">
              <h3 className="table-title">List of Classes</h3>
            </div>
            <div className="col-md-3">
              <CreateClass
                yearOptions={yearOptions}
                onAddSuccess={fetchClasses}
              />
            </div>
          </Row>
        </div>
        <hr />
        <TableComponent
          data={data}
          columns={columns}
          sorting={sorting}
          setSorting={setSorting}
          filtering={filtering}
          setFiltering={setFiltering}
        />

        {/* IMPORT AND EXPORT BUTTONS */}
        <div className="functional-btns-container">
          <ExportButton onClick={handleExportClass} />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowClassList;
