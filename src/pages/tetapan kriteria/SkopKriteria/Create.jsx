import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useSkopKriteriaStore from "../../../store/skop-kriteria-store";

function CreateSkopKriteria({skopSemakanOptions, onAddSuccess}) {
  // initialize create modal
  const [showCreateSkopKriteria, setShowCreateSkopKriteria] = useState(false);

  // handle create modal
  const handleShowCreateSkopKriteria = () => setShowCreateSkopKriteria(true);
  const handleCloseCreateSkopKriteria = () => {
    setShowCreateSkopKriteria(false);
    reset();
  };

  // form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // initialize store
  const createSkopKriteria = useSkopKriteriaStore((state) => state.createSkopKriteria);

  // handle create skop kriteria
  const onSubmit = (data) => {
    createSkopKriteria(data, () => {
      handleCloseCreateSkopKriteria();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateSkopKriteria}>
        Tambah
      </Button>

      <Modal
        show={showCreateSkopKriteria}
        onHide={handleCloseCreateSkopKriteria}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Skop Kriteria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Skop Semakan</Form.Label>
              <Controller
                id="skopSemakanId"
                name="skopSemakanId"
                control={control}
                rules={{ required: "Sila pilih skop semakan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select aria-label="skopSemakanSelect" onChange={onChange} value={value}>
                      <option value="">
                        Pilih Skop Semakan
                      </option>
                      {skopSemakanOptions.map((skopSemakan) => (
                        <option key={skopSemakan.value} value={skopSemakan.value}>
                          {skopSemakan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.skopSemakanId && (
                      <span className="error-message">
                        {errors.skopSemakanId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nama Skop Kriteria</Form.Label>
              <Controller
                name="namaSkopKriteria"
                id="namaSkopKriteria"
                control={control}
                defaultValue=""
                rules={{ required: "Skop kriteria baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan skop kriteria"
                    autoFocus
                  />
                )}
              />
              {errors.namaSkopKriteria && (
                <span className="error-message">
                  {errors.namaSkopKriteria.message}
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

export default CreateSkopKriteria;
