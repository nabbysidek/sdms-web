import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import TableComponent from "../../components/TableComponent";
import ExportButton from "../../components/functional buttons/ExportBtn";
import ImportButton from "../../components/functional buttons/ImportBtn";
import useReportStore from "../../store/report-store";
import "../../assets/styles/styles_report.css";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowReport({ searchResults }) {
  const { studentInformation, studentMisdemeanorList } = searchResults;
  const { handleDeleteReport } = useReportStore();

  const data = useMemo(() => studentMisdemeanorList, [studentMisdemeanorList]);
  const columns = useMemo(
    () => [
      {
        header: "Num",
        accessorFn: (row, i) => i + 1,
        id: "index",
      },
      {
        header: "Dates of Report",
        accessorKey: "reportDate",
      },
      {
        header: "Year",
        accessorKey: "year.yearName",
      },
      {
        header: "Class",
        accessorKey: "classes.className",
      },
      {
        header: "Misdemeanor Category",
        accessorKey: "misdemeanorCategory.misdemeanorCategoryName",
      },
      {
        header: "Misdemeanor",
        accessorKey: "misdemeanor.misdemeanorName",
      },
      {
        header: "Additional Notes",
        accessorKey: "reportNotes",
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <>
            <Link
              to="/edit-report"
              state={{
                id: studentInformation.id,
                studentName: studentInformation.studentName,
                studentId: studentInformation.studentId,
                reports: row.original,
              }}
            >
              <Button className="edit-report-btn">Edit</Button>
            </Link>
            <Button
              onClick={() => handleDeleteReport(row.original.id)}
              className="delete-btn"
            >
              Delete
            </Button>
          </>
        ),
      },
    ],
    [
      handleDeleteReport,
      studentInformation.id,
      studentInformation.studentName,
      studentInformation.studentId,
    ]
  );

  const [sorting, setSorting] = useState([]);

  const handleExportReport = () => {
    const csvData = data.map((report, index) => ({
      Num: index + 1,
      "DATES OF REPORT": report.reportDate,
      YEAR: report.region?.regionName || "",
      CLASS: report.branch?.branchName || "",
      "MISDEMEANOR CATEGORY": report.reviewScope?.scopeName || "",
      MISDEMEANOR: report.misdemeanorScope?.scopeName || "",
      "ADDITIONAL NOTES": report.reportNotes,
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "LIST OF STUDENT REPORT RECORDS.csv");
  };

  return (
    <>
      <div className="student-info-container">
        <div className="page-title">
          <h3>Student Basic Information</h3>
          <hr />
        </div>
        <div className="student-info">
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  value={studentInformation.studentName}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  type="text"
                  value={studentInformation.studentId}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>
      <Container fluid>
        <div className="report-table">
          <Row>
            <Col md={8}>
              <h3 className="report-table-title">
                List of Student Report Records
              </h3>
            </Col>
            <Col md={4}>
              <Link
                to="/add-report"
                state={{
                  id: studentInformation.id,
                  studentName: studentInformation.studentName,
                  studentId: studentInformation.studentId,
                }}
              >
                <Button className="to-page-add-report-btn">
                  Add New Report
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <hr />
        <div>
          <TableComponent
            data={data}
            columns={columns}
            sorting={sorting}
            setSorting={setSorting}
          />
        </div>
        <div className="functional-btns-container">
          <ExportButton onClick={handleExportReport} />
          <ImportButton />
        </div>
      </Container>
    </>
  );
}

export default ShowReport;
