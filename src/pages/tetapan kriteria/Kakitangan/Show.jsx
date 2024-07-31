import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateKakitangan from "./Create";
import EditKakitangan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useKakitanganStore from "../../../store/kakitangan-store";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

function ShowKakitanganList() {
  // initialize store
  const { kakitangans, totalPage, totalItems, fetchKakitangans, deleteKakitangan } = useKakitanganStore();

  // pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const pageSize = 10;

  // fetch kakitangan
  useEffect(() => {
    fetchKakitangans(currentPage);
  }, [currentPage, fetchKakitangans]);

  const data = useMemo(() => kakitangans, [kakitangans]);

  const handleDeleteKakitangan = useCallback(async (kakitanganId) => {
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      await deleteKakitangan(kakitanganId);
      await fetchKakitangans(currentPage);
    }
  }, [deleteKakitangan, fetchKakitangans, currentPage]);

  const handleAddSuccess = useCallback(async () => {
    await fetchKakitangans(currentPage);
  }, [fetchKakitangans, currentPage]);

  const handleUpdateSuccess = useCallback(async () => {
    await fetchKakitangans(currentPage);
  }, [fetchKakitangans, currentPage]);

  const columns = useMemo(() => [
    {
      header: "ID",
      accessorFn: (row, i) => i + 1,
      id: 'index',
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
          <EditKakitangan kakitangan={row.original} onUpdateSuccess={handleUpdateSuccess} />
          <Button
            onClick={() => handleDeleteKakitangan(row.original.id)}
            className="delete-btn"
          >
            Padam
          </Button>
        </div>
      ),
    },
  ], [handleDeleteKakitangan, handleUpdateSuccess]);

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <Container fluid>
      <div className="table-section">
        <Row>
          <div className="col-md-9">
            <h3 className="table-title">Senarai Kakitangan</h3>
          </div>
          <div className="col-md-3">
            <CreateKakitangan onAddSuccess={handleAddSuccess} />
          </div>
        </Row>
      </div>
      <hr />
      <Table responsive>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="functional-btns-container">
        <ExportButton />
        <ImportButton />
      </div>
    </Container>
  );
}

export default ShowKakitanganList;
