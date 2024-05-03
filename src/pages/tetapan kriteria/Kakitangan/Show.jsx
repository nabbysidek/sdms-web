import { useState, useEffect } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import CreateKakitangan from "./Create";
import EditKakitangan from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import PaginationTable from "../../../components/page layout/PaginationTable";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import axiosCustom from "./../../../axios";
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
      const response = await axiosCustom.get(
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
        const response = await axiosCustom.delete(
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
              <h3 className="table-title">Senarai Kakitangan</h3>
            </div>
            <div className="col-md-2">
              <CreateKakitangan />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>ID Kakitangan</th>
              <th>Nama Kakitangan</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {kakitangans.length > 0 &&
              kakitangans.map((kakitangansData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{kakitangansData.idKakitangan}</td>
                  <td>{kakitangansData.namaKakitangan}</td>
                  <td>
                    <EditKakitangan kakitangan={kakitangansData} />
                    <Button
                      onClick={() => handleDeleteKakitangan(kakitangansData.id)}
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

export default ShowKakitanganList;
