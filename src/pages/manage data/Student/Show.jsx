import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Row, Container } from "react-bootstrap";
import CreateStudent from "./Create";
import EditStudent from "./Edit";
import SearchStudent from "./Search";
import TableComponent from "../../../components/TableComponent";
import showConfirmationDialog from "../showConfirmationDialog";
import ExportButton from "../../../components/functional buttons/ExportBtn";
import ImportButton from "../../../components/functional buttons/ImportBtn";
import useStudentStore from "../../../store/student-store";
import * as FileSaver from "file-saver";
import * as Papa from "papaparse";

function ShowStudentList() {
  // USE OF STUDENT STORE
  const { students, fetchStudents, deleteStudent } = useStudentStore();

  // FETCH STUDENTS FROM STORE
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // HANDLE DELETE STUDENT
  const handleDeleteStudent = useCallback(async (studentId) => {
      const confirmResult = await showConfirmationDialog();

      if (confirmResult.isConfirmed) {
        await deleteStudent(studentId);
      }
    }, [deleteStudent, fetchStudents]);

  // USE OF TANSTACK TABLE
  // FETCH DATA AND DECLARE COLUMNS
  const data = useMemo(() => students, [students]);
  const columns = useMemo(() => [
    {
      header: "Num",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Student ID",
      accessorKey: "id_student",
    },
    {
      header: "Student Name",
      accessorKey: "name_student",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div>
          {/* EDIT AND DELETE BUTTONS */}
          <EditStudent student={row.original} onUpdateSuccess={fetchStudents} />
          <Button
            onClick={() => handleDeleteStudent(row.original.id_student)}
            className="delete-btn"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]);

  // SORTING AND FILTERING
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  
  // HANDLE EXPORT STUDENT LIST
  const handleExportStudent = () => {
    // PREPARE CSV DATA
    const csvData = data.map((student, index) => ({
      Num: index + 1,
      "Student ID": student.id_student,
      "Student Name": student.name_student,
    }));

    // CONVERT TO CSV FORMAT
    const csv = Papa.unparse(csvData);

    // CREATE A BLOB AND SAVE AS CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "STUDENT_LIST.csv");
  };

  return (
    <Container fluid>
      <SearchStudent filterValue={filtering} onFilterChange={setFiltering} />
      <div className="table-section">
        <Row>
          <div className="col-md-9">
            <h3 className="table-title">List of Students</h3>
          </div>
          <div className="col-md-3">
            <CreateStudent onAddSuccess={fetchStudents} /> 
          </div>
        </Row>
      </div>
      <hr />
      <TableComponent
          data={data}
          columns={columns}
          sorting={sorting}
          setSorting={setSorting}
          filtering={filtering}
          setFiltering={setFiltering}
        />

      {/* IMPORT AND EXPORT */}
      <div className="functional-btns-container">
        <ExportButton onClick={handleExportStudent}/>
        <ImportButton />
      </div>
    </Container>
  );
}

export default ShowStudentList;
