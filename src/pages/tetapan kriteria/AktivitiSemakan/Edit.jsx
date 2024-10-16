import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useAktivitiSemakanStore from "../../../store/aktiviti-semakan-store";

function EditAktivitiSemakan({ aktivitiSemakan, skopKriteriaOptions, onUpdateSuccess }) {
  // INITIALIZE EDIT AKTIVITI SEMAKAN MODAL
  const [showEditAktivitiSemakan, setShowEditAktivitiSemakan] = useState(false);

  // HANDLE DISPLAY OF EDIT AKTIVITI SEMAKAN MODAL
  const handleCloseEditAktivitiSemakan = () =>
    setShowEditAktivitiSemakan(false);
  const handleShowEditAktivitiSemakan = () => setShowEditAktivitiSemakan(true);

  // FORM VALIDATION FOR MODAL
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF AKTIVITI SEMAKAN STORE
  const { updateAktivitiSemakan } = useAktivitiSemakanStore();

  // HANDLE EDIT OF AN AKTIVITI SEMAKAN
  const onSubmit = (aktivitiSemakanInput) => {
    updateAktivitiSemakan(aktivitiSemakan.id, aktivitiSemakanInput, handleCloseEditAktivitiSemakan, onUpdateSuccess);
  };

  // RESET EDIT FORM DATA WHEN MODAL IS OPENED
  useEffect(() => {
    if (showEditAktivitiSemakan) {
      reset({
        skopKriteriaId: aktivitiSemakan.skopKriteriaId,
        namaAktivitiSemakan: aktivitiSemakan.namaAktivitiSemakan,
      });
    }
  }, [showEditAktivitiSemakan, aktivitiSemakan, reset]);

  return (
    <div>
      <Button
        className="edit-tetapan-btn"
        onClick={handleShowEditAktivitiSemakan}
      >
        Edit
      </Button>

      <Modal
        show={showEditAktivitiSemakan}
        onHide={handleCloseEditAktivitiSemakan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Activity Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Noncompliance Scope</Form.Label>
              <Controller
                id="skopKriteriaId"
                name="skopKriteriaId"
                control={control}
                defaultValue={aktivitiSemakan.skopKriteriaId}
                rules={{ required: "A noncompliance scope is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="skopKriteriaSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Select a Noncompliance Scope</option>
                      {skopKriteriaOptions.map((skopKriteria) => (
                        <option key={skopKriteria.value} value={skopKriteria.value}>
                          {skopKriteria.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.skopKriteriaId && (
                      <span className="error-message">
                        {errors.skopKriteriaId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Activity Review</Form.Label>
              <Controller
                name="namaAktivitiSemakan"
                id="namaAktivitiSemakan"
                control={control}
                defaultValue={aktivitiSemakan.namaAktivitiSemakan}
                rules={{ required: "An activity review is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter activity review . . ."
                    />
                    {errors?.namaAktivitiSemakan && (
                      <span className="error-message">
                        {errors.namaAktivitiSemakan.message}
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

export default EditAktivitiSemakan;
