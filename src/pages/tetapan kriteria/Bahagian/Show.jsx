import { useState, useEffect } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import CreateBahagian from "./Create";
import EditBahagian from "./Edit";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import PaginationTable from "../../../components/page layout/PaginationTable";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function ShowBahagianList() {
  // ----------FE----------
  const [bahagians, setBahagians] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  // ----------BE----------
  // List bahagians
  const fetchBahagians = async (page) => {
    try {
      const response = await axiosCustom.get(
        `api/tetapan-kriteria/bahagian?page=${page}`
      );
      setBahagians(response.data.data); // Update the state with the array of objects
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error(
        "Ralat dalam mengambil maklumat kriteria ketidakpatuhan:",
        error
      );
    }
  };

  useEffect(() => {
    fetchBahagians(currentPage);

    const interval = setInterval(() => {
      // Set up recurring fetch every 5 seconds)
      const nextPage = currentPage === totalPage ? 1 : currentPage + 1;
      fetchBahagians(nextPage);
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, totalPage]);


  // Handle delete
  const handleDeleteBahagian = async (bahagianId) => {
    // Display a confirmation dialog
    const confirmResult = await showConfirmationDialog();

    if (confirmResult.isConfirmed) {
      try {
        const response = await axiosCustom.delete(
          `tetapan-kriteria/bahagian/${bahagianId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berjaya",
            text: response.data.success, // Access the message from the backend response
          });

          setBahagians((prevBahagians) =>
            prevBahagians.filter((bahagian) => bahagian.id !== bahagianId)
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
              <h3 className="table-title">Senarai Bahagian</h3>
            </div>
            <div className="col-md-2">
              <CreateBahagian />
            </div>
          </Row>
        </div>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>Bil</th>
              <th>Nama Bahagian</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {bahagians.length > 0 &&
              bahagians.map((bahagiansData, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{bahagiansData.namaBahagian}</td>
                  <td>
                    <EditBahagian bahagian={bahagiansData} />
                    <Button
                      onClick={() => handleDeleteBahagian(bahagiansData.id)}
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

export default ShowBahagianList;
