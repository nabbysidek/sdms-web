import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateKakitangan from "./Create";
import EditKakitangan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useKakitanganStore from "../../../store/kakitangan-store";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import axiosCustom from "../../../axios";

function ShowKakitanganList() {
  const [kakitangans, setKakitangans] = useState([]);

  useEffect(() => {
    fetchKakitangans();
  }, []);

  const fetchKakitangans = async () => {
    try {
      const response = await axiosCustom.get(`tetapan-kriteria/kakitangan`);
      setKakitangans(response.data);
      // setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat kakitangan:", error);
    }
  };

  const data = useMemo(() => kakitangans, [kakitangans]);

  const columns = useMemo(() => [
    {
      header: "Bil",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "ID Kakitangan",
      accessorKey: "idKakitangan",
    },
    {
      header: "Nama Kakitangan",
      accessorKey: "namaKakitangan",
    },
    {
      header: "Tindakan",
      cell: ({ row }) => (
        <div>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      ),
    },
  ]);

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting: sorting },
    onSortingChange: setSorting,
  });

  return (
    <Container fluid>
      <div className="table-section">
        <Row>
          <div className="col-md-9">
            <h3 className="table-title">Senarai Kakitangan</h3>
          </div>
          <div className="col-md-3">
            <Button>Create</Button>
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
      <Button
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </Button>
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </Button>
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </Button>
      <Button
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </Button>
      <div className="functional-btns-container">
        <ExportButton />
        <ImportButton />
      </div>
    </Container>
  );
}

export default ShowKakitanganList;
