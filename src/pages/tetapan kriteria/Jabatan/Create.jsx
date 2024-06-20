import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";
import useJabatanStore from "../../../store/jabatan-store";

function CreateJabatan({bahagianOptions, onAddSuccess}) {
  // ----------FE----------
  // `Create` modal
  const [showCreateJabatan, setShowCreateJabatan] = useState(false);

  const handleShowCreateJabatan = () => setShowCreateJabatan(true);
  const handleCloseCreateJabatan = () => {
    setShowCreateJabatan(false);
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
  // handle create jabatan
  const createJabatan = useJabatanStore((state) => state.createJabatan);

  const onSubmit = (data) => {
    createJabatan(data, () => {
      handleCloseCreateJabatan();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateJabatan}>
        Tambah
      </Button>

      <Modal
        show={showCreateJabatan}
        onHide={handleCloseCreateJabatan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Jabatan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Bahagian</Form.Label>
              <Controller
                id="bahagianId"
                name="bahagianId"
                control={control}
                rules={{ required: "Sila pilih bahagian" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select onChange={onChange} value={value}>
                      <option value="">
                        Pilih Bahagian
                      </option>
                      {bahagianOptions.map((bahagian) => (
                        <option key={bahagian.value} value={bahagian.value}>
                          {bahagian.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.bahagianId && (
                      <span className="error-message">
                        {errors.bahagianId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Jabatan</Form.Label>
              <Controller
                id="namaJabatan"
                name="namaJabatan"
                control={control}
                defaultValue=""
                rules={{
                  required: "Nama jabatan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan jabatan"
                      autoFocus
                    />
                    {errors.namaJabatan && (
                      <span className="error-message">
                        {errors.namaJabatan.message}
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
            Tambah Jabatan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJabatan;
