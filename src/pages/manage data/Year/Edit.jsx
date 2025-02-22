import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useYearStore from "../../../store/year-store";

function EditYear({ year, onUpdateSuccess }) {
  // INITIALIZE EDIT YEAR MODAL
  const [showEditYear, setShowEditYear] = useState(false);

  // HANDLE DISPLAY OF EDIT YEAR MODAL
  const handleCloseEditYear = () => setShowEditYear(false);
  const handleShowEditYear = () => setShowEditYear(true);

  // FORM VALIDATION FOR MODAL
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF YEAR STORE
  const { updateYear } = useYearStore();

  // HANDLE EDIT OF A YEAR
  const onSubmit = (yearInput) => {
    updateYear(year.id, yearInput, handleCloseEditYear, onUpdateSuccess);
  };

  // RESET EDIT FORM DATA WHEN MODAL IS OPENED
  useEffect(() => {
    if (showEditYear) {
      reset({
        idYear: year.idYear,
        namaYear: year.namaYear,
      });
    }
  }, [showEditYear, year, reset]);

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditYear}>
        Edit
      </Button>

      <Modal
        show={showEditYear}
        onHide={handleCloseEditYear}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Year</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Controller
                name="namaYear"
                id="namaYear"
                control={control}
                defaultValue={year.namaYear}
                rules={{ required: "A year is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter year . . ."
                    />
                    {errors?.namaYear && (
                      <span className="error-message">
                        {errors.namaYear.message}
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

export default EditYear;
