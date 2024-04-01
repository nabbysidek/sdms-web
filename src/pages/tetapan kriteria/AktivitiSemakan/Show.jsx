import { useState } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import CreateAktivitiSemakan from "./Create";
import EditAktivitiSemakan from "./Edit";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import PaginationTable from "../../../components/page layout/PaginationTable";

function ShowAktivitiSemakanList() {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage
  const [totalPage, setTotalPage] = useState(1);

  return (
    <>
      <Container fluid>
        <div className="table-section">
            <Row>
                <div className="col-md-8">
                    <h3 className="table-title">Senarai Aktiviti Semakan</h3>
                </div>
                <div className="col-md-4">
                    <CreateAktivitiSemakan/>
                </div>
            </Row>
        </div>
        <hr />
        <Table responsive>
            <thead>
                <tr>
                    <th>Bil</th>
                    <th>Nama Aktiviti Semakan</th>
                    <th>Tindakan</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Semakan 1</td>
                    <td>
                        <EditAktivitiSemakan />
                        <Button className="delete-btn">Padam</Button>
                    </td>
                </tr>
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

export default ShowAktivitiSemakanList
