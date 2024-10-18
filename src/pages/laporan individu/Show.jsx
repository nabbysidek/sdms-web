import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import TableComponent from "../../components/TableComponent";
import ExportButton from "../../components/functional buttons/ExportBtn";
import ImportButton from "../../components/functional buttons/ImportBtn";
import useLaporanIndividuStore from "../../store/laporan-individu-store";
import "../../assets/styles/styles_laporan_individu.css";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function SearchResultUntukLaporanIndividu({ searchResults }) {
  const { maklumatKakitangan, senaraiKetidakpatuhanKakitangan } = searchResults;
  const { handleDeleteLaporanIndividu } = useLaporanIndividuStore();

  const data = useMemo(
    () => senaraiKetidakpatuhanKakitangan,
    [senaraiKetidakpatuhanKakitangan]
  );
  const columns = useMemo(
    () => [
      {
        header: "Num",
        accessorFn: (row, i) => i + 1,
        id: "index",
      },
      {
        header: "Levels of Risk",
        accessorKey: "tahapRisikoAudit",
      },
      {
        header: "Repeated Offence?",
        accessorKey: "kesalahanBerulang",
      },
      {
        header: "Dates of Audit",
        accessorKey: "tarikhAudit",
      },
      {
        header: "States",
        accessorKey: "wilayah.namaWilayah",
      },
      {
        header: "Branches",
        accessorKey: "cawangan.namaCawangan",
      },
      {
        header: "Positions",
        accessorKey: "jawatanKakitangan",
      },
      {
        header: "Divisions",
        accessorKey: "bahagian.namaBahagian",
      },
      {
        header: "Departments",
        accessorKey: "jabatan.namaJabatan",
      },
      {
        header: "Units",
        accessorKey: "unit.namaUnit",
      },
      {
        header: "Types of Audit",
        accessorKey: "jenis_audit.namaJenisAudit",
      },
      {
        header: "Review Scopes",
        accessorKey: "skop_semakan.namaSkopSemakan",
      },
      {
        header: "Noncompliance Scopes",
        accessorKey: "skop_kriteria.namaSkopKriteria",
      },
      {
        header: "Activity Reviews",
        accessorKey: "aktiviti_semakan.namaAktivitiSemakan",
      },
      {
        header: "Noncompliances",
        accessorKey: "kriteria_ketidakpatuhan.namaKriteriaKetidakpatuhan",
      },
      {
        header: "Additional Notes",
        accessorKey: "catatanAudit",
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <>
            <Link
              to="/editketidakpatuhan"
              state={{
                id: maklumatKakitangan.id,
                namaKakitangan: maklumatKakitangan.namaKakitangan,
                idKakitangan: maklumatKakitangan.idKakitangan,
                audits: row.original,
              }}
            >
              <Button className="edit-ketidakpatuhan-btn">Edit</Button>
            </Link>
            <Button
              onClick={() => handleDeleteLaporanIndividu(row.original.id)}
              className="delete-btn"
            >
              Delete
            </Button>
          </>
        ),
      },
    ],
    [
      handleDeleteLaporanIndividu,
      maklumatKakitangan.id,
      maklumatKakitangan.namaKakitangan,
      maklumatKakitangan.idKakitangan,
    ]
  );

  // SORTING AND FILTERING
  const [sorting, setSorting] = useState([]);

  // HANDLE EXPORT UNIT
  const handleExportReportIndividu = () => {
    // PREPARE CSV DATA
    const csvData = data.map((reportIndividu, index) => ({
      BIL: index + 1,
      "LEVELS OF RISK": reportIndividu.tahapRisikoAudit,
      "REPEATED OFFENCE": reportIndividu.kesalahanBerulang,
      "DATES OF AUDIT": reportIndividu.tarikhAudit,
      STATES: reportIndividu.wilayah?.namaWilayah || "",
      DIVISIONS: reportIndividu.cawangan?.namaCawangan || "",
      POSITIONS: reportIndividu.jawatanKakitangan,
      DIVISIONS: reportIndividu.bahagian?.namaBahagian || "",
      DEPARTMENTS: reportIndividu.jabatan?.namaJabatan || "",
      UNITS: reportIndividu.unit?.namaUnit || "",
      "TYPES OF AUDIT": reportIndividu.jenis_audit?.namaJenisAudit || "",
      "REVIEW SCOPES": reportIndividu.skop_semakan?.namaSkopSemakan || "",
      "NONCOMPLIANCE SCOPES": reportIndividu.skop_kriteria?.namaSkopKriteria || "",
      "ACTIVITY REVIEWS":
        reportIndividu.aktiviti_semakan?.namaAktivitiSemakan || "",
      "NONCOMPLIANCES":
        reportIndividu.kriteria_ketidakpatuhan?.namaKriteriaKetidakpatuhan ||
        "",
      "ADDITIONAL NOTES": reportIndividu.catatanAudit,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB & SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "LIST OF STAFF AUDIT RECORDS.csv");
  };

  return (
    <>
      {/* BAHAGIAN MAKLUMAT KAKITANGAN */}
      <div className="kakitangan-info-container">
        <div className="page-title">
          <h3>Staff Basic Information</h3>
          <hr />
        </div>
        <div className="kakitangan-info">
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Staff Name</Form.Label>
                <Form.Control
                  type="text"
                  value={maklumatKakitangan.namaKakitangan}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Staff ID</Form.Label>
                <Form.Control
                  type="text"
                  value={maklumatKakitangan.idKakitangan}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>
      {/* BAHAGIAN JADUAL AUDIT KETIDAKPATUHAN KAKITANGAN */}
      <Container fluid>
        <div className="laporan-individu-table">
          <Row>
            <Col md={8}>
              <h3 className="laporan-individu-table-title">
                List of Staff Audit Records
              </h3>
            </Col>
            <Col md={4}>
              {/* ACTION: TAMBAH KETIDAKPATUHAN KAKITANGAN */}
              <Link
                to="/tambahketidakpatuhan"
                state={{
                  id: maklumatKakitangan.id,
                  namaKakitangan: maklumatKakitangan.namaKakitangan,
                  idKakitangan: maklumatKakitangan.idKakitangan,
                }}
              >
                <Button className="to-page-tambah-ketidakpatuhan-btn">
                  Add New Audit
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <hr />
        <div>
          {/* JADUAL AUDIT KETIDAKPATUHAN KAKITANGAN */}
          <TableComponent
            data={data}
            columns={columns}
            sorting={sorting}
            setSorting={setSorting}
          />
        </div>

        {/* IMPORT DAN EKSPORT */}
        <div className="functional-btns-container">
          <ExportButton onClick={handleExportReportIndividu} />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default SearchResultUntukLaporanIndividu;
