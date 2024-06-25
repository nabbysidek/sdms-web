import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import useUnitStore from "../../../store/unit-store";

function CreateUnit({jabatanOptions, onAddSuccess}) {
  // initialize create modal
  const [showCreateUnit, setShowCreateUnit] = useState(false);

  // handle create modal
  const handleShowCreateUnit = () => setShowCreateUnit(true);
  const handleCloseCreateUnit = () => {
    setShowCreateUnit(false);
    reset();
  };

  // form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // initialize state management store
  const createUnit = useUnitStore((state) => state.createUnit);

  //  handle create of unit
  const onSubmit = (data) => {
    createUnit(data, () => {
      handleCloseCreateUnit();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateUnit}>
        Tambah
      </Button>

      <Modal
        show={showCreateUnit}
        onHide={handleCloseCreateUnit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Jabatan</Form.Label>
              <Controller
                id="jabatanId"
                name="jabatanId"
                control={control}
                rules={{ required: "Sila pilih jabatan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select onChange={onChange} value={value}>
                      <option value="">
                        Pilih Jabatan
                      </option>
                      {jabatanOptions.map((jabatan) => (
                        <option key={jabatan.value} value={jabatan.value}>
                          {jabatan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.jabatanId && (
                      <span className="error-message">
                        {errors.jabatanId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Unit</Form.Label>
              <Controller
                id="namaUnit"
                name="namaUnit"
                control={control}
                defaultValue=""
                rules={{ required: "Nama unit baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <FormControl
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan unit"
                      autoFocus
                    />
                    {errors.namaUnit && (
                      <span className="error-message">
                        {errors.namaUnit.message}
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
            Tambah Unit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateUnit;
