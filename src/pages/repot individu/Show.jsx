import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import TableComponent from "../../components/TableComponent";
import ExportButton from "../../components/functional buttons/ExportBtn";
import ImportButton from "../../components/functional buttons/ImportBtn";
import useRepotIndividuStore from "../../store/repot-individu-store";
import "../../assets/styles/styles_repot_individu.css";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function SearchResultUntukRepotIndividu({ searchResults }) {
  const { maklumatKakitangan, senaraiKetidakpatuhanKakitangan } = searchResults;
  const { handleDeleteRepotIndividu } = useRepotIndividuStore();

  const data = useMemo(
    () => senaraiKetidakpatuhanKakitangan,
    [senaraiKetidakpatuhanKakitangan]
  );
  const columns = useMemo(
    () => [
      {
        header: "Bil",
        accessorFn: (row, i) => i + 1,
        id: "index",
      },
      {
        header: "Risiko",
        accessorKey: "tahapRisikoAudit",
      },
      {
        header: "Kesalahan Berulang",
        accessorKey: "kesalahanBerulang",
      },
      {
        header: "Tarikh Mesyuarat Penutup",
        accessorKey: "tarikhAudit",
      },
      {
        header: "Wilayah",
        accessorKey: "wilayah.namaWilayah",
      },
      {
        header: "Cawangan",
        accessorKey: "cawangan.namaCawangan",
      },
      {
        header: "Jawatan",
        accessorKey: "jawatanKakitangan",
      },
      {
        header: "Bahagian",
        accessorKey: "bahagian.namaBahagian",
      },
      {
        header: "Jabatan",
        accessorKey: "jabatan.namaJabatan",
      },
      {
        header: "Unit",
        accessorKey: "unit.namaUnit",
      },
      {
        header: "Jenis Audit",
        accessorKey: "jenis_audit.namaJenisAudit",
      },
      {
        header: "Skop Semakan",
        accessorKey: "skop_semakan.namaSkopSemakan",
      },
      {
        header: "Skop Kriteria",
        accessorKey: "skop_kriteria.namaSkopKriteria",
      },
      {
        header: "Aktiviti Semakan",
        accessorKey: "aktiviti_semakan.namaAktivitiSemakan",
      },
      {
        header: "Kriteria Ketidakpatuhan",
        accessorKey: "kriteria_ketidakpatuhan.namaKriteriaKetidakpatuhan",
      },
      {
        header: "Catatan",
        accessorKey: "catatanAudit",
      },
      {
        header: "Tindakan",
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
              onClick={() => handleDeleteRepotIndividu(row.original.id)}
              className="delete-btn"
            >
              Padam
            </Button>
          </>
        ),
      },
    ],
    [
      handleDeleteRepotIndividu,
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
      Bil: index + 1,
      Risiko: reportIndividu.tahapRisikoAudit,
      "Kesalahan Berulang": reportIndividu.kesalahanBerulang,
      "Tarikh Mesyuarat Penutup": reportIndividu.tarikhAudit,
      "Wilayah": reportIndividu.wilayah?.namaWilayah || "",
      "Cawangan": reportIndividu.cawangan?.namaCawangan || "",
      "Jawatan": reportIndividu.jawatanKakitangan,
      "Bahagian": reportIndividu.bahagian?.namaBahagian || "",
      "Jabatan": reportIndividu.jabatan?.namaJabatan || "",
      "Unit": reportIndividu.unit?.namaUnit || "",
      "Jenis Audit": reportIndividu.jenis_audit?.namaJenisAudit || "",
      "Skop Semakan": reportIndividu.skop_semakan?.namaSkopSemakan || "",
      "Skop Kriteria": reportIndividu.skop_kriteria?.namaSkopKriteria || "",
      "Aktiviti Semakan": reportIndividu.aktiviti_semakan?.namaAktivitiSemakan || "",
      "Kriteria Ketidakpatuhan": reportIndividu.kriteria_ketidakpatuhan?.namaKriteriaKetidakpatuhan || "",
      "Catatan": reportIndividu.catatanAudit,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB & SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "SENARAI KETIDAKPATUHAN KAKITANGAN.csv");
  };

  return (
    <>
      {/* BAHAGIAN MAKLUMAT KAKITANGAN */}
      <div className="kakitangan-info-container">
        <div className="page-title">
          <h3>Maklumat Kakitangan</h3>
          <hr />
        </div>
        <div className="kakitangan-info">
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Nama Kakitangan</Form.Label>
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
                <Form.Label>ID Kakitangan</Form.Label>
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
        <div className="repot-table">
          <Row>
            <Col md={8}>
              <h3 className="repot-table-title">
                Senarai Ketidakpatuhan Kakitangan
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
                  Tambah Ketidakpatuhan
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
          <ExportButton onClick={handleExportReportIndividu}/>
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default SearchResultUntukRepotIndividu;
