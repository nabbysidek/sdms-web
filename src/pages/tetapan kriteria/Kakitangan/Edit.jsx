import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useKakitanganStore from "../../../store/kakitangan-store";

function EditKakitangan({kakitangan, onUpdateSuccess}) {
  // INITIALIZE EDIT KAKITANGAN MODAL
  const [showEditKakitangan, setShowEditKakitangan] = useState(false);

  // HANDLE DISPLAY OF EDIT KAKITANGAN MODAL
  const handleCloseEditKakitangan = () => setShowEditKakitangan(false);
  const handleShowEditKakitangan = () => setShowEditKakitangan(true);

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF KAKITANGAN STORE
  const { updateKakitangan } = useKakitanganStore();

  // HANDLE EDIT OF AN KAKITANGAN
  const onSubmit = (kakitanganInput) => {
    updateKakitangan(kakitangan.id, kakitanganInput, handleCloseEditKakitangan, onUpdateSuccess);
  };

  // RESET EDIT FORM DATA WHEN MODAL IS OPENED
  useEffect(() => {
    if (showEditKakitangan) {
      reset({
        idKakitangan: kakitangan.idKakitangan,
        namaKakitangan: kakitangan.namaKakitangan,
      });
    }
  }, [showEditKakitangan, kakitangan, reset]);

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditKakitangan}>
        Edit
      </Button>

      <Modal
        show={showEditKakitangan}
        onHide={handleCloseEditKakitangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Audited Staff Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Staff ID</Form.Label>
              <Controller
                id="idKakitangan"
                name="idKakitangan"
                control={control}
                defaultValue={kakitangan.idKakitangan}
                rules={{ required: "A staff ID is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter audited staff ID . . ."
                    />
                    {errors?.idKakitangan && (
                      <span className="error-message">
                        {errors.idKakitangan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Audited Staff Name</Form.Label>
              <Controller
                id="namaKakitangan"
                name="namaKakitangan"
                control={control}
                defaultValue={kakitangan.namaKakitangan}
                rules={{ required: "An audited staff name is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter audited staff name . . ."
                    />
                    {errors?.namaKakitangan && (
                      <span className="error-message">
                        {errors.namaKakitangan.message}
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

export default EditKakitangan;
