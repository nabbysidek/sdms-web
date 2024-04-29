import { useState, useEffect, useCallback } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateJabatan from "./Create";
import EditJabatan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import PaginationTable from "../../../components/page layout/PaginationTable";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function Show() {
  // ----------FE----------
  const [jabatans, setJabatans] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // Fetch options bahagian
  const [namaBahagianOptions, setNamaBahagianOptions] = useState([]);

  const fetchBahagians = useCallback(async () => {
    try {
      const response = await axiosCustom.get(
        `tetapan-kriteria/bahagian/display-bahagian`
      );

      if (Array.isArray(response.data)) {
        setNamaBahagianOptions(
          response.data.map((bahagian) => ({
            value: bahagian.id,
            label: bahagian.namaBahagian,
          }))
        );
      } else {
        console.log(response.data);

      }
    } catch (error) {
      console.log(error);
    }
  }, [setNamaBahagianOptions]);

  useEffect(() => {
    fetchBahagians();
  }, [fetchBahagians]);


  // List jabatan
  const fetchJabatans = async (page) => {
    try {
      const response = await axiosCustom.get(
        `http://127.0.0.1:8000/api/tetapan-kriteria/jabatan?page=${page}`
      );
      setJabatans(response.data.data); // Update the state with the array of objects
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Ralat dalam mengambil maklumat jabatan:", error);
    }
  };

  useEffect(() => {
    fetchJabatans(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
      fetchJabatans(currentPage);

      const interval = setInterval(() => {
        // Set up recurring fetch every 5 seconds)
        const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
        fetchJabatans(nextPage);
      }, 5000);

      // Cleanup the interval when the component unmounts
      return () => {
        clearInterval(interval);
      };
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);

  // Handle delete
  const handleDeleteJabatan = async (jabatanId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axiosCustom.delete(
          `http://127.0.0.1:8000/api/tetapan-kriteria/jabatan/${jabatanId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berjaya",
            text: response.data.success, // Access the message from the backend response
          });

          setJabatans((prevJabatans) =>
            prevJabatans.filter((jabatan) => jabatan.id !== jabatanId)
          );
        }
      } catch (error) {
        console.error("Error in deleting jabatan", error);
      }
    }
  };

  return (
    <>
      <Container fluid>
        <div className="table-section">
          <Row>
            <div className="col-md-9">
              <h3 className="table-title">Senarai Jabatan</h3>
            </div>
            <div className="col-md-3">
              <CreateJabatan bahagianOptions={namaBahagianOptions} />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Nama Bahagian</th>
              <th>Nama Jabatan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {jabatans.length > 0 &&
              jabatans.map((jabatansData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>
                    {jabatansData.bahagian
                      ? jabatansData.bahagian.namaBahagian
                      : "N/A"}
                  </td>
                  <td>{jabatansData.namaJabatan}</td>
                  <td>
                    <EditJabatan jabatan={jabatansData} bahagianOptions={namaBahagianOptions} />
                    <Button
                      onClick={() => handleDeleteJabatan(jabatansData.id)}
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

        <div className="functional-btns-container">
          <ExportButton />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default Show;
