import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useClassStore from "../../../store/class-store.js";

function CreateClass({ yearOptions, onAddSuccess }) {
  // INITIALIZE CREATE CLASS MODAL
  const [showCreateClass, setShowCreateClass] = useState(false);

  // HANDLE DISPLAY OF CREATE CLASS MODAL
  const handleShowCreateClass = () => setShowCreateClass(true);
  const handleCloseCreateClass = () => {
    setShowCreateClass(false);
    reset();
  };

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF CLASS STORE
  const createClass = useClassStore((state) => state.createClass);

  // HANDLE CREATE A NEW CLASS
  const onSubmit = (data) => {
    createClass(data, () => {
      handleCloseCreateClass();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateClass}>
        Add Class
      </Button>

      <Modal
        show={showCreateClass}
        onHide={handleCloseCreateClass}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(createClass)} onReset={reset}>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Controller
                id="yearId"
                name="yearId"
                control={control}
                rules={{ required: "A year is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="yearSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="">Select a Year</option>
                      {yearOptions.map((year) => (
                        <option key={year.value} value={year.value}>
                          {year.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.yearId && (
                      <span className="error-message">
                        {errors.yearId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Class Name</Form.Label>
              <Controller
                id="className"
                name="className"
                control={control}
                defaultValue=""
                rules={{
                  required: "A class name is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter class name . . ."
                      autoFocus
                    />
                    {errors.className && (
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
          <Button
            className="create-new-modal-btn"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateClass;
