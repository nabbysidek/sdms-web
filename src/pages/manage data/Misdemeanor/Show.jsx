import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Container } from "react-bootstrap";
import CreateMisdemeanor from "./Create";
import EditMisdemeanor from "./Edit";
import SearchMisdemeanor from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../../manage data/showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useMisdemeanorStore from "../../../store/misdemeanor-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowMisdemeanorList() {
  // USE OF MISDEMEANOR STORE
  const {
    misdemeanors,
    misdemeanorCategoryOptions,
    fetchMisdemeanors,
    deleteMisdemeanor,
    fetchMisdemeanorCategories,
  } = useMisdemeanorStore();

  // FETCH FROM STORE: MISDEMEANOR CATEGORY & MISDEMEANOR
  useEffect(() => {
    fetchMisdemeanors();
    fetchMisdemeanorCategories();
  }, [fetchMisdemeanors, fetchMisdemeanorCategories]);

  // HANDLE DELETE OF MISDEMEANOR
  const handleDeleteMisdemeanor = useCallback(
    async (misdemeanorId) => {
      const confirmResult = await showConfirmationDialog();

      if (confirmResult.isConfirmed) {
        await deleteMisdemeanor(misdemeanorId);
      }
    },
    [deleteMisdemeanor, fetchMisdemeanors]
  );

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => misdemeanors, [misdemeanors]);
  const columns = useMemo(() => [
    {
      header: "Num",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Misdemeanor Category",
      accessorFn: (row) => row.misdemeanor_category?.name || "N/A",
    },
    {
      header: "Misdemeanor",
      accessorKey: "name",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR ACTIONS COLUMN */}
          <EditMisdemeanor
            misdemeanor={row.original}
            misdemeanorCategoryOptions={misdemeanorCategoryOptions}
            onUpdateSuccess={fetchMisdemeanors}
          />
          <Button
            onClick={() => handleDeleteMisdemeanor(row.original.id)}
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

  // HANDLE EXPORT MISDEMEANORS
  const handleExportMisdemeanor = () => {
    // PREPARE CSV DATA
    const csvData = data.map((misdemeanor, index) => ({
      Num: index + 1,
      "MISDEMEANOR CATEGORY": misdemeanor.misdemeanor_category?.name || "N/A",
      MISDEMEANOR: misdemeanor.name,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "LIST_OF_MISDEMEANORS.csv");
  };

  return (
    <>
      <Container fluid>
        <SearchMisdemeanor
          filterValue={filtering}
          onFilterChange={setFiltering}
        />
        <div className="table-section">
          <Row>
            <div className="col-md-9">
              <h3 className="table-title">List of Misdemeanors</h3>
            </div>
            <div className="col-md-3">
              <CreateMisdemeanor
                misdemeanorCategoryOptions={misdemeanorCategoryOptions}
                onAddSuccess={fetchMisdemeanors}
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

        {/* IMPORT AND EXPORT */}
        <div className="functional-btns-container">
          <ExportButton onClick={handleExportMisdemeanor} />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowMisdemeanorList;
