import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useKakitanganStore from "../../../store/kakitangan-store";

function CreateKakitangan({ onAddSuccess }) {
  // INITIALIZE CREATE KAKITANGAN MODAL
  const [showCreateKakitangan, setShowCreateKakitangan] = useState(false);

  // HANDLE DISPLAY OF CREATE KAKITANGAN MODAL
  const handleShowCreateKakitangan = () => setShowCreateKakitangan(true);
  const handleCloseCreateKakitangan = () => {
    setShowCreateKakitangan(false);
    reset();
  };

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF KAKITANGAN STORE
  const createKakitangan = useKakitanganStore((state) => state.createKakitangan);

  //  HANDLE CREATE A NEW OF KAKITANGAN
  const onSubmit = (data) => {
    createKakitangan(data, () => {
      handleCloseCreateKakitangan();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateKakitangan}>
        Add Audited Staff
      </Button>

      <Modal
        show={showCreateKakitangan}
        onHide={handleCloseCreateKakitangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Audited Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Staff ID</Form.Label>
              <Controller
                id="idKakitangan"
                name="idKakitangan"
                control={control}
                defaultValue=""
                rules={{
                  required: "A staff ID is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter audited staff ID . . ."
                      autoFocus
                    />
                    {errors.idKakitangan && (
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
                defaultValue=""
                rules={{
                  required: "An audited staff name is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter audited staff name . . ."
                    />
                    {errors.namaKakitangan && (
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

export default CreateKakitangan;
