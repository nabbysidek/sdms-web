import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useClassStore from "../../../store/class-store";

function EditClass({ classData, yearOptions, onUpdateSuccess }) {
  // INITIALIZE EDIT CLASS MODAL
  const [showEditClass, setShowEditClass] = useState(false);

  // HANDLE DISPLAY OF EDIT CLASS MODAL
  const handleCloseEditClass = () => setShowEditClass(false);
  const handleShowEditClass = () => setShowEditClass(true);

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF CLASS STORE
  const { updateClass } = useClassStore();

  // HANDLE EDIT OF A CLASS
  const onSubmit = (classInput) => {
    updateClass(
      classData.id,
      classInput,
      handleCloseEditClass,
      onUpdateSuccess
    );
  };

  // RESET EDIT FORM DATA WHEN MODAL IS OPENED
  useEffect(() => {
    if (showEditClass) {
      reset({
        yearId: classData.yearId,
        className: classData.className,
      });
    }
  }, [showEditClass, classData, reset]);

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditClass}>
        Edit
      </Button>

      <Modal
        show={showEditClass}
        onHide={handleCloseEditClass}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Controller
                id="yearId"
                name="yearId"
                control={control}
                defaultValue={classData.yearId}
                rules={{ required: "A year is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="yearSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>
                        Select a Year
                      </option>
                      {yearOptions.map((year) => (
                        <option key={year.value} value={year.value}>
                          {year.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.yearId && (
                      <span className="error-message">
                        {errors.yearId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Class</Form.Label>
              <Controller
                name="className"
                control={control}
                defaultValue={classData.className}
                rules={{ required: "A class name is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter class name . . ."
                    />
                    {errors?.className && (
                      <span className="error-message">
                        {errors.className.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="edit-modal-btn" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditClass;
