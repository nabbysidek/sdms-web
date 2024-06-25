import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useKriteriaKetidakpatuhanStore from "../../../store/kriteria-ketidakpatuhan-store";

function CreateKriteriaKetidakpatuhan({aktivitiSemakanOptions, onAddSuccess}) {
  // initialize create modal
  const [showCreateKriteriaKetidakpatuhan, setShowCreateKriteriaKetidakpatuhan] = useState(false);

  // handle create modal
  const handleShowCreateKriteriaKetidakpatuhan = () => setShowCreateKriteriaKetidakpatuhan(true);
  const handleCloseCreateKriteriaKetidakpatuhan = () => {
    setShowCreateKriteriaKetidakpatuhan(false);
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
  const createKriteriaKetidakpatuhan = useKriteriaKetidakpatuhanStore((state) => state.createKriteriaKetidakpatuhan);

  //  handle create of kriteria ketidakpatuhan
  const onSubmit = (data) => {
    createKriteriaKetidakpatuhan(data, () => {
      handleCloseCreateKriteriaKetidakpatuhan();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateKriteriaKetidakpatuhan}>
        Tambah
      </Button>

      <Modal
        show={showCreateKriteriaKetidakpatuhan}
        onHide={handleCloseCreateKriteriaKetidakpatuhan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kriteria Ketidakpatuhan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            onReset={reset}
          >
            <Form.Group>
              <Form.Label>Aktiviti Semakan</Form.Label>
              <Controller
                id="aktivitiSemakanId"
                name="aktivitiSemakanId"
                control={control}
                rules={{ required: "Sila pilih aktiviti semakan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select aria-label="aktivitiSemakanSelect" onChange={onChange} value={value}>
                      <option value="">
                        Pilih Skop Semakan
                      </option>
                      {aktivitiSemakanOptions.map((aktivitiSemakan) => (
                        <option key={aktivitiSemakan.value} value={aktivitiSemakan.value}>
                          {aktivitiSemakan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.aktivitiSemakanId && (
                      <span className="error-message">
                        {errors.aktivitiSemakanId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nama Kriteria Ketidakpatuhan</Form.Label>
              <Controller
                id="namaKriteriaKetidakpatuhan"
                name="namaKriteriaKetidakpatuhan"
                defaultValue=""
                control={control}
                rules={{
                  required: "Nama kriteria ketidakpatuhan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan kriteria ketidakpatuhan"
                      autoFocus
                    />
                    {errors.namaKriteriaKetidakpatuhan && (
                      <span className="error-message">
                        {errors.namaKriteriaKetidakpatuhan.message}
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
            Tambah Kriteria Ketidakpatuhan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateKriteriaKetidakpatuhan;
