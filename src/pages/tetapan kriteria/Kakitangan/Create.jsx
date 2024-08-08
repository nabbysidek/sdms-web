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
        Tambah kakitangan
      </Button>

      <Modal
        show={showCreateKakitangan}
        onHide={handleCloseCreateKakitangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kakitangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>ID Kakitangan</Form.Label>
              <Controller
                id="idKakitangan"
                name="idKakitangan"
                control={control}
                defaultValue=""
                rules={{
                  required: "ID kakitangan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan ID kakitangan"
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
              <Form.Label>Nama Kakitangan</Form.Label>
              <Controller
                id="namaKakitangan"
                name="namaKakitangan"
                control={control}
                defaultValue=""
                rules={{
                  required: "Nama kakitangan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan nama kakitangan"
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
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateKakitangan;
