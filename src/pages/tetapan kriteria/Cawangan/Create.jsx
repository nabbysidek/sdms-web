import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useCawanganStore from "../../../store/cawangan-store.js";

function CreateCawangan({wilayahOptions, onAddSuccess}) {
  // INITIALIZE CREATE CAWANGAN MODAL
  const [showCreateCawangan, setShowCreateCawangan] = useState(false);

  // HANDLE DISPLAY OF CREATE CAWANGAN MODAL
  const handleShowCreateCawangan = () => setShowCreateCawangan(true);
  const handleCloseCreateCawangan = () => {
    setShowCreateCawangan(false);
    reset();
  };

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF CAWANGAN STORE
  const createCawangan = useCawanganStore((state) => state.createCawangan);

  //  HANDLE CREATE A NEW OF CAWANGAN
  const onSubmit = (data) => {
    createCawangan(data, () => {
      handleCloseCreateCawangan();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateCawangan}>
        Tambah cawangan
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
                      placeholder="Masukkan nama cawangan"
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
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateCawangan;
