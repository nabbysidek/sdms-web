import React, { useState } from "react"; 
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useYearStore from "../../../store/year-store";

function CreateYear({ onAddSuccess }) {
  // INITIALIZE CREATE YEAR MODAL
  const [showCreateYear, setShowCreateYear] = useState(false);

  // HANDLE DISPLAY OF CREATE YEAR MODAL
  const handleShowCreateYear = () => setShowCreateYear(true);
  const handleCloseCreateYear = () => {
    setShowCreateYear(false);
    reset();
  };

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF YEAR STORE
  const createYear = useYearStore((state) => state.createYear);

  // HANDLE CREATE A NEW YEAR
  const onSubmit = (data) => {
    createYear(data, () => {
      handleCloseCreateYear();
      if (onAddSuccess) onAddSuccess(); 
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateYear}>
        Add Year
      </Button>

      <Modal
        show={showCreateYear}
        onHide={handleCloseCreateYear}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Year</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Controller
                name="namaYear"
                id="namaYear"
                control={control}
                defaultValue=""
                rules={{ required: "A year is required" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Enter year . . ."
                    autoFocus
                  />
                )}
              />
              {errors.namaYear && (
                <span className="error-message">
                  {errors.namaYear.message}
                </span>
              )}
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

export default CreateYear;
