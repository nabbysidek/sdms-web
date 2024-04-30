import { useState, useEffect, useCallback } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import CreateCawangan from "./Create";
import EditCawangan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import PaginationTable from "../../../components/page layout/PaginationTable";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function ShowCawanganList() {
  // ----------FE----------
  const [cawangans, setCawangans] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // Fetch wilayah data
  const [namaWilayahOptions, setNamaWilayahOptions] = useState([]);

  const fetchWilayahs = useCallback(async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/wilayah/display-wilayah`
      );

      if (Array.isArray(response.data)) {
        setNamaWilayahOptions(
          response.data.map((wilayah) => ({
            value: wilayah.id,
            label: wilayah.namaWilayah,
          }))
        );
      } else {
        console.log(response.data);

      }
    } catch (error) {
      console.log(error);
    }
  }, [setNamaWilayahOptions]);

  useEffect(() => {
    fetchWilayahs();
  }, [fetchWilayahs]);


  // List cawangan
  const fetchCawangans = async (page) => {
    try {
      const response = await axiosCustom.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/cawangan?page=${page}`
      );
      setCawangans(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat cawangan:", error);
    }
  };

  useEffect(() => {
    fetchCawangans(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchCawangans(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  
  // Handle delete
  const handleDeleteCawangan = async (cawanganId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axiosCustom.delete(
          `http://127.0.0.1:8000/api/tetapan-kriteria/cawangan/${cawanganId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berjaya",
            text: response.data.success, // Access the message from the backend response
          });

          setCawangans((prevCawangans) =>
            prevCawangans.filter((cawangan) => cawangan.id !== cawanganId)
          );
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.error, 
      });
      }
    }
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-10">
              <h3 className="table-title">Senarai Cawangan</h3>
            </div>
            <div className="col-md-2">
              <CreateCawangan wilayahOptions={namaWilayahOptions} />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Nama Wilayah</th>
              <th>Nama Cawangan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {cawangans.length > 0 &&
              cawangans.map((cawangansData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>
                    {cawangansData.wilayah
                      ? cawangansData.wilayah.namaWilayah
                      : "N/A"}
                  </td>
                  <td>{cawangansData.namaCawangan}</td>
                  <td>
                    <EditCawangan cawangan={cawangansData} wilayahOptions={namaWilayahOptions} />
                    <Button
                      onClick={() => handleDeleteCawangan(cawangansData.id)}
                      className="delete-btn"
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
        <div className="functional-btns-container">
          <ExportButton />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowCawanganList;
