import { useState } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import CreateAktivitiSemakan from "./Create";
import EditAktivitiSemakan from "./Edit";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";

function ShowAktivitiSemakanList() {
  return (
    <>
      <Container fluid>
        <div className="table-section">
            <Row>
                <div className="col-md-10">
                    <h3 className="table-title">Senarai Aktiviti Semakan</h3>
                </div>
                <div className="col-md-2">
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
