import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useStudentStore from "../../../store/student-store";

function CreateStudent({ onAddSuccess }) {
  // State for controlling modal visibility
  const [showCreateStudent, setShowCreateStudent] = useState(false);

  // Functions to handle opening and closing modal
  const handleShowCreateStudent = () => setShowCreateStudent(true);
  const handleCloseCreateStudent = () => {
    setShowCreateStudent(false);
    reset();
  };

  // Form validation and control
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Access student creation function from store
  const createStudent = useStudentStore((state) => state.createStudent);

  // Handle form submission
  const onSubmit = (data) => {
    createStudent(data, () => {
      handleCloseCreateStudent();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      {/* Button to open create modal */}
      <Button className="create-new-btn" onClick={handleShowCreateStudent}>
        Add Student
      </Button>

      {/* Create Student Modal */}
      <Modal
        show={showCreateStudent}
        onHide={handleCloseCreateStudent}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            {/* Student ID Field */}
            <Form.Group>
              <Form.Label>Student ID</Form.Label>
              <Controller
                name="idStudent"
                control={control}
                defaultValue=""
                rules={{ required: "A student ID is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter student ID..."
                      autoFocus
                    />
                    {errors.idStudent && (
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
                defaultValue=""
                rules={{ required: "A student name is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter student name..."
                    />
                    {errors.nameStudent && (
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
          <Button className="create-new-modal-btn" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateStudent;
