import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";

function CreateAktivitiSemakan() {
  // ----------------- FE -----------------
  // Manage modal visibility
  const [showCreateAktivitiSemakan, setShowCreateAktivitiSemakan] =
    useState(false);

  const handleShowAktivitiSemakan = () => setShowCreateAktivitiSemakan(true);
  const handleCloseCreateAktivitiSemakan = () => {
    setShowCreateAktivitiSemakan(false);
    reset();
  };

  // Form submission and validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowAktivitiSemakan}>
        Tambah Aktiviti Semakan
      </Button>

      <Modal
        show={showCreateAktivitiSemakan}
        onHide={handleCloseCreateAktivitiSemakan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Aktiviti Semakan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit()} onReset={reset}>
            <Form.Group>
              <Form.Label>Nama Aktiviti Semakan</Form.Label>
              <Controller
                name="namaAktivitiSemakan"
                id="namaAktivitiSemakan"
                control={control}
                defaultValue=""
                rules={{ required: "Aktiviti semakan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan bahagian"
                    autoFocus
                  />
                )}
              />
              {errors.namaAktivitiSemakan && (
                <span className="error-message">
                  {errors.namaAktivitiSemakan.message}
                </span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="create-new=modal-btn" onClick={handleSubmit()}>
            Tambah Aktiviti Semakan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateAktivitiSemakan;
