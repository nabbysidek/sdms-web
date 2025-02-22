import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Container } from "react-bootstrap";
import CreateMisdemeanorCategory from "./Create";
import EditMisdemeanorCategory from "./Edit";
import SearchMisdemeanorCategory from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../../manage data/showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useMisdemeanorCategoryStore from "../../../store/misdemeanor-category-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowMisdemeanorCategoryList() {
  const {
    misdemeanorCategories,
    fetchMisdemeanorCategories,
    deleteMisdemeanorCategory,
  } = useMisdemeanorCategoryStore();

  useEffect(() => {
    fetchMisdemeanorCategories();
  }, [fetchMisdemeanorCategories]);

  const handleDeleteMisdemeanorCategory = useCallback(
    async (misdemeanorCategoryId) => {
      const confirmResult = await showConfirmationDialog();

      if (confirmResult.isConfirmed) {
        await deleteMisdemeanorCategory(misdemeanorCategoryId);
      }
    },
    [deleteMisdemeanorCategory, fetchMisdemeanorCategories]
  );

  const data = useMemo(() => misdemeanorCategories, [misdemeanorCategories]);
  const columns = useMemo(() => [
    {
      header: "Num",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Misdemeanor Category",
      accessorKey: "namaMisdemeanorCategory",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div>
          <EditMisdemeanorCategory
            misdemeanorCategory={row.original}
            onUpdateSuccess={fetchMisdemeanorCategories}
          />
          <Button
            onClick={() => handleDeleteMisdemeanorCategory(row.original.id)}
            className="delete-btn"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]);

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const handleExportMisdemeanorCategory = () => {
    const csvData = data.map((misdemeanorCategory, index) => ({
      Bil: index + 1,
      "Misdemeanor Category": misdemeanorCategory.namaMisdemeanorCategory,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "LIST OF MISDEMEANOR CATEGORIES.csv");
  };

  return (
    <>
      <Container fluid>
        <SearchMisdemeanorCategory
          filterValue={filtering}
          onFilterChange={setFiltering}
        />
        <div className="table-section">
          <Row>
            <div className="col-md-9">
              <h3 className="table-title">List of Misdemeanor Categories</h3>
            </div>
            <div className="col-md-3">
              <CreateMisdemeanorCategory
                onAddSuccess={fetchMisdemeanorCategories}
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

        <div className="functional-btns-container">
          <ExportButton onClick={handleExportMisdemeanorCategory} />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowMisdemeanorCategoryList;
