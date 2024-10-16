import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useKriteriaKetidakpatuhanStore from "../../../store/kriteria-ketidakpatuhan-store";

function EditKriteriaKetidakpatuhan({kriteriaKetidakpatuhan, aktivitiSemakanOptions, onUpdateSuccess}) {
  // INITIALIZE EDIT KRITERIA KETIDAKPATUHAN MODAL
  const [showEditKriteriaKetidakpatuhan, setShowEditKriteriaKetidakpatuhan] = useState(false);

  // HANDLE DISPLAY OF EDIT KRITERIA KETIDAKPATUHAN MODAL
  const handleCloseEditKriteriaKetidakpatuhan = () => setShowEditKriteriaKetidakpatuhan(false);
  const handleShowEditKriteriaKetidakpatuhan = () => setShowEditKriteriaKetidakpatuhan(true);

  // FORM VALIDATION FOR MODAL
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF KRITERIA KETIDAKPATUHAN STORE
  const { updateKriteriaKetidakpatuhan } = useKriteriaKetidakpatuhanStore();

  // HANDLE EDIT OF AN KRITERIA KETIDAKPATUHAN
  const onSubmit = (kriteriaKetidakpatuhanInput) => {
    updateKriteriaKetidakpatuhan(kriteriaKetidakpatuhan.id, kriteriaKetidakpatuhanInput, handleCloseEditKriteriaKetidakpatuhan, onUpdateSuccess);
  };

  // RESET EDIT FORM DATA WHEN MODAL IS OPENED
  useEffect(() => {
    if (showEditKriteriaKetidakpatuhan) {
      reset({
        aktivitiSemakanId: kriteriaKetidakpatuhan.aktivitiSemakanId,
        namaKriteriaKetidakpatuhan: kriteriaKetidakpatuhan.namaKriteriaKetidakpatuhan,
      });
    }
  }, [showEditKriteriaKetidakpatuhan, kriteriaKetidakpatuhan, reset]);

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditKriteriaKetidakpatuhan}>
        Edit
      </Button>

      <Modal
        show={showEditKriteriaKetidakpatuhan}
        onHide={handleCloseEditKriteriaKetidakpatuhan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Noncompliance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Activity Review</Form.Label>
              <Controller
                name="aktivitiSemakanId"
                id="aktivitiSemakanId"
                control={control}
                defaultValue={kriteriaKetidakpatuhan.aktivitiSemakanId}
                rules={{ required: "An activity review is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="aktivitiSemakanSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Select an Activity Review</option>
                      {aktivitiSemakanOptions.map((aktivitiSemakan) => (
                        <option key={aktivitiSemakan.value} value={aktivitiSemakan.value}>
                          {aktivitiSemakan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.aktivitiSemakanId && (
                      <span className="error-message">
                        {errors.aktivitiSemakanId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Noncompliance</Form.Label>
              <Controller
                name="namaKriteriaKetidakpatuhan"
                control={control}
                defaultValue={kriteriaKetidakpatuhan.namaKriteriaKetidakpatuhan}
                rules={{ required: "A noncompliance is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter noncompliance . . ."
                    />
                    {errors?.namaKriteriaKetidakpatuhan && (
                      <span className="error-message">
                        {errors.namaKriteriaKetidakpatuhan.message}
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

export default EditKriteriaKetidakpatuhan;
