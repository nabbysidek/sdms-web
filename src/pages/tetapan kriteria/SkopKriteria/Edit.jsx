import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useSkopKriteriaStore from "../../../store/skop-kriteria-store";

function EditSkopKriteria({skopKriteria, skopSemakanOptions, onUpdateSuccess}) {
  // INITIALIZE EDIT SKOP KRITERIA MODAL
  const [showEditSkopKriteria, setShowEditSkopKriteria] = useState(false);

 // HANDLE DISPLAY OF EDIT SKOP KRITERIA MODAL
  const handleCloseEditSkopKriteria = () => setShowEditSkopKriteria(false);
  const handleShowEditSkopKriteria = () => setShowEditSkopKriteria(true);

  // FORM VALIDATION FOR MODAL
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF SKOP KRITERIA STORE
  const { updateSkopKriteria } = useSkopKriteriaStore();

  // HANDLE EDIT OF AN SKOP KRITERIA
  const onSubmit = (skopKriteriaInput) => {
    updateSkopKriteria(skopKriteria.id, skopKriteriaInput, handleCloseEditSkopKriteria, onUpdateSuccess);
  };

  // RESET EDIT FORM DATA WHEN MODAL IS OPENED
  useEffect(() => {
    if (showEditSkopKriteria) {
      reset({
        skopSemakanId: skopKriteria.skopSemakanId,
        namaSkopKriteria: skopKriteria.namaSkopKriteria,
      });
    }
  }, [showEditSkopKriteria, skopKriteria, reset]);

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditSkopKriteria}>
        Kemaskini
      </Button>

      <Modal
        show={showEditSkopKriteria}
        onHide={handleCloseEditSkopKriteria}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Skop Kriteria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Skop Semakan</Form.Label>
              <Controller
                id="skopSemakanId"
                name="skopSemakanId"
                control={control}
                defaultValue={skopKriteria.skopSemakanId}
                rules={{ required: "Sila pilih skop semakan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="skopSemakanSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Pilih Skop Semakan</option>
                      {skopSemakanOptions.map((skopSemakan) => (
                        <option key={skopSemakan.value} value={skopSemakan.value}>
                          {skopSemakan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.skopSemakanId && (
                      <span className="error-message">
                        {errors.skopSemakanId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Skop Kriteria</Form.Label>
              <Controller
                name="namaSkopKriteria"
                control={control}
                defaultValue={skopKriteria.namaSkopKriteria}
                rules={{ required: "Skop kriteria baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Skop kriteria"
                    />
                    {errors?.namaSkopKriteria && (
                      <span className="error-message">
                        {errors.namaSkopKriteria.message}
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
            Kemaskini
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditSkopKriteria;
