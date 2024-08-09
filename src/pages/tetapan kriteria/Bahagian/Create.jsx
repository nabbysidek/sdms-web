import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useBahagianStore from "../../../store/bahagian-store";

function CreateBahagian({ onAddSuccess }) {
  // INITIALIZE CREATE BAHAGIAN MODAL
  const [showCreateBahagian, setShowCreateBahagian] = useState(false);

  // HANDLE DISPLAY OF CREATE BAHAGIAN MODAL
  const handleShowCreateBahagian = () => setShowCreateBahagian(true);
  const handleCloseCreateBahagian = () => {
    setShowCreateBahagian(false);
    reset();
  };

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF BAHAGIAN STORE
  const createBahagian = useBahagianStore((state) => state.createBahagian);

  //  HANDLE CREATE A NEW OF BAHAGIAN
  const onSubmit = (data) => {
    createBahagian(data, () => {
      handleCloseCreateBahagian();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateBahagian}>
        Tambah bahagian
      </Button>

      <Modal
        show={showCreateBahagian}
        onHide={handleCloseCreateBahagian}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Bahagian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Nama Bahagian</Form.Label>
              <Controller
                name="namaBahagian"
                id="namaBahagian"
                control={control}
                defaultValue=""
                rules={{ required: "Bahagian baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan nama bahagian"
                    autoFocus
                  />
                )}
              />
              {errors.namaBahagian && (
                <span className="error-message">
                  {errors.namaBahagian.message}
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
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateBahagian;
