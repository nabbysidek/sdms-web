import React, { useState } from "react";
import { Table, Dropdown, Container } from "react-bootstrap";
import ModalRejectAccess from "./ModalRejectAccess";
import ModalAllowAccess from "./ModalAllowAccess";
import ModalTerminateAccess from "./ModalTerminateAccess";
import "../../assets/styles/styles_tetapan_pengguna.css";
import {
  useQueryClient,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { fetchPermohonanAkses } from "../../api";
import { fetchSenaraiPengguna } from "../../api";

function IndexTetapanPengguna() {
  const queryClient = useQueryClient();

  // Permohonan Akses Fetch Query
  const [permohonanAksesPage, setPermohonanAksesPage] = useState(0);
  const [permohonanAksesPageSize, setPermohonanAksesPageSize] = useState(0);

  const {
    isPending: isPendingPermohonanAkses,
    isError: isErrorPermohonanAkses,
    error: errorPermohonanAkses,
    data: permohonanAksesQuery,
    isFetching: isFetchingPermohonanAkses,
    isPlaceholderData: isPlaceholderDataPermohonanAkses,
  } = useQuery({
    queryKey: ["permohonanAkses", permohonanAksesPage, permohonanAksesPageSize],
    queryFn: () =>
      fetchPermohonanAkses(permohonanAksesPage, permohonanAksesPageSize),
    placeholderData: keepPreviousData,
  });

  // Senarai Pengguna Fetch Query
  const [senaraiPenggunaPage, setSenaraiPenggunaPage] = useState(0);
  const [senaraiPenggunaPageSize, setSenaraiPenggunaPageSize] = useState(0);

  const {
    isPending: isPendingSenaraiPengguna,
    isError: isErrorSenaraiPengguna,
    error:errorSenaraiPengguna,
    data: senaraiPenggunaQuery,
    isFetching: isFetchingSenaraiPengguna,
    isPlaceholderData: isPlaceholderDataSenaraiPengguna
  } = useQuery({
    queryKey: ["senaraiPenggunas", senaraiPenggunaPage, senaraiPenggunaPageSize],
    queryFn: () => fetchSenaraiPengguna(senaraiPenggunaPage, senaraiPenggunaPageSize),
    placeholderData: keepPreviousData,
  });


  return (
    <>
      {/* Page title section */}
      <div className="page-title">
        <h2>Tetapan Akses Pengguna</h2>
        <hr />
        <h3>Permohonan Akses</h3>
      </div>

      {/* Page content section */}
      <Container fluid>
        <hr />
        {/* Table Senarai Permohonan Akses */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>ID Kakitangan</th>
              <th>Nama Kakitangan</th>
              <th>Emel Kakitangan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {isPendingPermohonanAkses ? (
              <tr>
                <td colSpan={5}>Loading...</td>
              </tr>
            ) : errorPermohonanAkses ? (
              <tr>
                <td colSpan={5}>Error: {errorPermohonanAkses.message}</td>
              </tr>
            ) : permohonanAksesQuery?.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <center>Tiada rekod.</center>
                </td>
              </tr>
            ) : (
              permohonanAksesQuery.map((permohonanAksesData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{permohonanAksesData?.idAuditor}</td>
                  <td>{permohonanAksesData?.namaAuditor}</td>
                  <td>{permohonanAksesData?.emelAuditor}</td>
                  <td>
                    <ModalAllowAccess />
                    <ModalRejectAccess />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <div>
          {/* Paginate Senarai Permohonan Akses Table */}
          <span>Current Page: {permohonanAksesPage + 1}</span>

          <button
            onClick={() => setPermohonanAksesPage((old) => Math.max(old - 1, 0))}
            disabled={permohonanAksesPage === 0}
          >
            Previous
          </button>{" "}

          <button
            onClick={() => {
              if (
                !isPlaceholderDataPermohonanAkses &&
                permohonanAksesQuery.hasMore
              ) {
                setPermohonanAksesPage((old) => old + 1);
              }
            }}
            // Disable the Next Page button until we know a next page is available
            disabled={
              isPlaceholderDataPermohonanAkses || !permohonanAksesQuery?.hasMore
            }
          >
            Next
          </button>

          {isFetchingPermohonanAkses ? <span> Loading...</span> : null}{" "}
        </div>

        <h4 className="page-title">Senarai Pengguna</h4>
        <hr />
        {/* Table Senarai Permohonan Akses */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>ID Kakitangan</th>
              <th>Nama Kakitangan</th>
              <th>Emel Kakitangan</th>
              <th>Status Auditor</th>
              <th>Peranan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
          
          {senaraiPenggunaQuery?.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <center>Tiada rekod.</center>
              </td>
            </tr>
          ) : (
            senaraiPenggunaQuery?.map((senaraiPenggunaData, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{senaraiPenggunaData.idAuditor}</td>
                <td>{senaraiPenggunaData.namaAuditor}</td>
                <td>{senaraiPenggunaData.emelAuditor}</td>
                <td>{senaraiPenggunaData.statusAuditor}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle className="user-level-btn">
                      Tahap Pengguna
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="user-level-item">
                      <Dropdown.Item></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <ModalAllowAccess />
                  <ModalTerminateAccess />
                </td>
              </tr>
            ))
          )}
          </tbody>
        </Table>

        {/* Paginate Senarai Pengguna Akses Table */}
        <button>Previous</button>
        
        <button>Next</button>
      </Container>
    </>
  );
}

export default IndexTetapanPengguna;
