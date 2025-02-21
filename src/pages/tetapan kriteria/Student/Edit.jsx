import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useStudentStore from "../../../store/student-store";

function EditStudent({ student, onUpdateSuccess }) {
  // State for controlling modal visibility
  const [showEditStudent, setShowEditStudent] = useState(false);

  // Functions to handle opening and closing modal
  const handleCloseEditStudent = () => setShowEditStudent(false);
  const handleShowEditStudent = () => setShowEditStudent(true);

  // Form validation and control
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Access student update function from store
  const { updateStudent } = useStudentStore();

  // Handle form submission
  const onSubmit = (studentInput) => {
    updateStudent(student.id, studentInput, handleCloseEditStudent, onUpdateSuccess);
  };

  // Reset form data when modal opens
  useEffect(() => {
    if (showEditStudent) {
      reset({
        idStudent: student.idStudent,
        nameStudent: student.nameStudent,
      });
    }
  }, [showEditStudent, student, reset]);

  return (
    <div>
      {/* Button to open edit modal */}
      <Button className="edit-student-btn" onClick={handleShowEditStudent}>
        Edit
      </Button>

      {/* Edit Student Modal */}
      <Modal
        show={showEditStudent}
        onHide={handleCloseEditStudent}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Student Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            {/* Student ID Field */}
            <Form.Group>
              <Form.Label>Student ID</Form.Label>
              <Controller
                name="idStudent"
                control={control}
                defaultValue={student.idStudent}
                rules={{ required: "A student ID is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter student ID..."
                    />
                    {errors?.idStudent && (
                      <span className="error-message">
                        {errors.idStudent.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            {/* Student Name Field */}
            <Form.Group>
              <Form.Label>Student Name</Form.Label>
              <Controller
                name="nameStudent"
                control={control}
                defaultValue={student.nameStudent}
                rules={{ required: "A student name is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter student name..."
                    />
                    {errors?.nameStudent && (
                      <span className="error-message">
                        {errors.nameStudent.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        {/* Modal Footer */}
        <Modal.Footer>
          <Button className="edit-modal-btn" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditStudent;
