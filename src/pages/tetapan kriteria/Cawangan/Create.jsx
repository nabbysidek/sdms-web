import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useCawanganStore from "../../../store/cawangan-store.js";

function CreateCawangan({wilayahOptions, onAddSuccess}) {
  // ----------FE----------
  // `Create` modal
  const [showCreateCawangan, setShowCreateCawangan] = useState(false);

  const handleShowCreateCawangan = () => setShowCreateCawangan(true);
  const handleCloseCreateCawangan = () => {
    setShowCreateCawangan(false);
    reset();
  };

  // Form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // ----------BE----------
  // Handle create of cawangan
  const createCawangan = useCawanganStore((state) => state.createCawangan);

  const onSubmit = (data) => {
    createCawangan(data, () => {
      handleCloseCreateCawangan();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateCawangan}>
        Tambah
      </Button>

      <Modal
        show={showCreateCawangan}
        onHide={handleCloseCreateCawangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Cawangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(createCawangan)} onReset={reset}>
            <Form.Group>
              <Form.Label>Wilayah</Form.Label>
              <Controller
                id="wilayahId"
                name="wilayahId"
                control={control}
                rules={{ required: "Sila pilih wilayah" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select aria-label="wilayahSelect" onChange={onChange} value={value}>
                      <option value="">
                        Pilih Wilayah
                      </option>
                      {wilayahOptions.map((wilayah) => (
                        <option key={wilayah.value} value={wilayah.value}>
                          {wilayah.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.wilayahId && (
                      <span className="error-message">
                        {errors.wilayahId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nama Cawangan</Form.Label>
              <Controller
                id="namaCawangan"
                name="namaCawangan"
                control={control}
                defaultValue=""
                rules={{
                  required: "Nama cawangan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan cawangan"
                      autoFocus
                    />
                    {errors.namaCawangan && (
                      <span className="error-message">
                        {errors.namaCawangan.message}
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
            Tambah Cawangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateCawangan;
