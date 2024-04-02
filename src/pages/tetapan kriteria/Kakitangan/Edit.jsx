import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";

function EditKakitangan() {
  // ----- FE ---------
  // Handle modal
  const [showEditKakitangan, setShowEditKakitangan] = useState(false);

  const handleCloseEditKakitangan = () => setShowEditKakitangan(false);
  const handleShowEditKakitangan = () => setShowEditKakitangan(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    handleCloseEditKakitangan();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditKakitangan}>
        Kemaskini
      </Button>

      <Modal
        show={showEditKakitangan}
        onHide={handleCloseEditKakitangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Kakitangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Kakitangan</Form.Label>
              <Controller
                name="namaKakitangan"
                control={control}
                rules={{ required: "Nama kakitangan baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Nama Kakitangan"
                      {...field}
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
            <Form.Group>
              <Form.Label>ID Kakitangan</Form.Label>
              <Controller
                name="idKakitangan"
                control={control}
                rules={{ required: "ID kakitangan baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="ID Kakitangan"
                      {...field}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="edit-modal-btn" onClick={handleSubmit(onSubmit)}>
            Kemaskini Kakitangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditKakitangan;
