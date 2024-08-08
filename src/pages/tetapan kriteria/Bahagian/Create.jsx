import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useBahagianStore from "../../../store/bahagian-store";

function CreateBahagian({ onAddSuccess }) {
  // ----------FE----------
  // `Create` modal
  const [showCreateBahagian, setShowCreateBahagian] = useState(false);

  const handleShowCreateBahagian = () => setShowCreateBahagian(true);
  const handleCloseCreateBahagian = () => {
    setShowCreateBahagian(false);
    reset();
  };

  // Form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // handle create bahagian
  const createBahagian = useBahagianStore((state) => state.createBahagian);

  const onSubmit = (data) => {
    createBahagian(data, () => {
      handleCloseCreateBahagian();
      // reload the table
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateBahagian}>
        Tambah
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
                    placeholder="Masukkan bahagian"
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
