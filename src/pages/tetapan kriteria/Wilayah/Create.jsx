import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useWilayahStore from "../../../store/wilayah-store";

function CreateWilayah({ onAddSuccess }) {
  // ----------FE----------
  // `Create` modal
  const [showCreateWilayah, setShowCreateWilayah] = useState(false);

  const handleShowCreateWilayah = () => setShowCreateWilayah(true);
  const handleCloseCreateWilayah = () => {
    setShowCreateWilayah(false);
    reset();
  };

  // Form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Handle create of wilayah
  const createWilayah = useWilayahStore((state) => state.createWilayah);

  const onSubmit = (data) => {
    createWilayah(data, () => {
      handleCloseCreateWilayah();
      // reload the table
      if (onAddSuccess) onAddSuccess(); 
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateWilayah}>
        Tambah
      </Button>

      <Modal
        show={showCreateWilayah}
        onHide={handleCloseCreateWilayah}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Wilayah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Nama Wilayah</Form.Label>
              <Controller
                name="namaWilayah"
                id="namaWilayah"
                control={control}
                defaultValue=""
                rules={{ required: "Wilayah baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan wilayah"
                    autoFocus
                  />
                )}
              />
              {errors.namaWilayah && (
                <span className="error-message">
                  {errors.namaWilayah.message}
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
            Tambah Wilayah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateWilayah;
