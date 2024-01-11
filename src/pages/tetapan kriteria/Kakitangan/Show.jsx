import React, { useState, useEffect } from "react";
import { Table, Button, Row } from "react-bootstrap";
import CreateKakitangan from "./Create";
import EditKakitangan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import axios from "axios";
import Swal from "sweetalert2";

function ShowKakitanganList() {
  // ----------FE----------
  const [kakitangans, setKakitangans] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List kakitangn
  const fetchKakitangans = async (page) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/kakitangan?page=${page}`
      );
      setKakitangans(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat kakitangan:", error);
    }
  };

  useEffect(() => {
    fetchKakitangans(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchKakitangans(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  // Handle delete
  const handleDeleteKakitangan = async (kakitanganId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/tetapan-kriteria/kakitangan/${kakitanganId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berjaya",
            text: response.data.success, // Access the message from the backend response
          });

          setKakitangans((prevKakitangans) =>
            prevKakitangans.filter(
              (kakitangan) => kakitangan.id !== kakitanganId
            )
          );
        }
      } catch (error) {
        console.error("Error in deleting kakitangan", error);
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="tableSection">
          <Row>
            <div className="col-md-10">
              <h4 className="tableTitle">Senarai Kakitangan</h4>
            </div>
            <div className="col-md-2">
              <CreateKakitangan />
            </div>
          </Row>
        </div>
        <hr />

        {/* Table Senarai Kakitangan */}
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Wilayah</th>
              <th>Cawangan</th>
              <th>Bahagian</th>
              <th>Jabatan</th>
              <th>Unit</th>
              <th>ID Kakitangan</th>
              <th>Nama Kakitangan</th>
              <th>Jawatan Kakitangan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {kakitangans.length > 0 &&
              kakitangans.map((kakitangansData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>
                    {kakitangansData.wilayah
                      ? kakitangansData.wilayah.namaWilayah
                      : "N/A"}
                  </td>
                  <td>
                    {kakitangansData.cawangan
                      ? kakitangansData.cawangan.namaCawangan
                      : "N/A"}
                  </td>
                  <td>
                    {kakitangansData.bahagian
                      ? kakitangansData.bahagian.namaBahagian
                      : "N/A"}
                  </td>
                  <td>
                    {kakitangansData.jabatan
                      ? kakitangansData.jabatan.namaJabatan
                      : "N/A"}
                  </td>
                  <td>
                    {kakitangansData.unit ? kakitangansData.unit.idUnit : "N/A"}
                  </td>
                  <td>{kakitangansData.idKakitangan}</td>
                  <td>{kakitangansData.namaKakitangan}</td>
                  <td>{kakitangansData.jawatanKakitangan}</td>
                  <td>
                    <EditKakitangan />
                    <Button
                      onClick={() => handleDeleteKakitangan(kakitangansData.id)}
                      className="delBtn"
                    >
                      Padam
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <PaginationTable
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={setCurrentPage}
        />

        {/* Functional buttons */}
        <div className="functionalBtnsSection">
          <ExportButton />
          <ImportButton />
        </div>
      </div>
    </>
  );
}

export default ShowKakitanganList;
