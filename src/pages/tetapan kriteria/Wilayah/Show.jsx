import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Container } from "react-bootstrap";
import CreateWilayah from "./Create";
import EditWilayah from "./Edit";
import SearchWilayah from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useWilayahStore from "../../../store/wilayah-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowWilayahList() {
  // USE OF WILAYAH STORE
  const { wilayahs, fetchWilayahs, deleteWilayah } = useWilayahStore();

  // FETCH FROM STORE: WILAYAH
  useEffect(() => {
    fetchWilayahs();
  }, [fetchWilayahs]);

  // HANDLE DELETE OF WILAYAH
  const handleDeleteWilayah = useCallback(
    async (wilayahId) => {
      const confirmResult = await showConfirmationDialog();

      if (confirmResult.isConfirmed) {
        await deleteWilayah(wilayahId);
      }
    },
    [deleteWilayah, fetchWilayahs]
  );

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => wilayahs, [wilayahs]);
  const columns = useMemo(() => [
    {
      header: "Num",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "State",
      accessorKey: "namaWilayah",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS FOR TINDAKAN COLUMN */}
          <EditWilayah wilayah={row.original} onUpdateSuccess={fetchWilayahs} />
          <Button
            onClick={() => handleDeleteWilayah(row.original.id)}
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

  // HANDLE EXPORT WILAYAH
  const handleExportWilayah = () => {
    // PREPARE CSV DATA
    const csvData = data.map((wilayah, index) => ({
      Bil: index + 1,
      "STATES": wilayah.namaWilayah,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "LIST OF STATES.csv");
  };

  return (
    <Container fluid>
      <SearchWilayah filterValue={filtering} onFilterChange={setFiltering} />
      <div className="table-section">
        <Row>
          <div className="col-md-10">
            <h3 className="table-title">List of States</h3>
          </div>
          <div className="col-md-2">
            <CreateWilayah onAddSuccess={fetchWilayahs} />
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
        <ExportButton onClick={handleExportWilayah} />
        <ImportButton />
      </div>
    </Container>
  );
}

export default ShowWilayahList;
