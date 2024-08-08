import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useAktivitiSemakanStore from "../../../store/aktiviti-semakan-store";

function CreateAktivitiSemakan({skopKriteriaOptions, onAddSuccess}) {
  // initialize create modal
  const [showCreateAktivitiSemakan, setShowCreateAktivitiSemakan] =
    useState(false);

  // handle create modal
  const handleShowCreateAktivitiSemakan = () => setShowCreateAktivitiSemakan(true);
  const handleCloseCreateAktivitiSemakan = () => {
    setShowCreateAktivitiSemakan(false);
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
  const createAktivitiSemakan = useAktivitiSemakanStore((state) => state.createAktivitiSemakan);

  //  handle create of aktiviti semakan
  const onSubmit = (data) => {
    createAktivitiSemakan(data, () => {
      handleCloseCreateAktivitiSemakan();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateAktivitiSemakan}>
        Tambah
      </Button>

      <Modal
        show={showCreateAktivitiSemakan}
        onHide={handleCloseCreateAktivitiSemakan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Aktiviti Semakan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Skop Kriteria</Form.Label>
              <Controller
                id="skopKriteriaId"
                name="skopKriteriaId"
                control={control}
                rules={{ required: "Sila pilih skop kriteria" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select onChange={onChange} value={value}>
                      <option value="">
                        Pilih Skop Kriteria
                      </option>
                      {skopKriteriaOptions.map((skopKriteria) => (
                        <option key={skopKriteria.value} value={skopKriteria.value}>
                          {skopKriteria.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.skopKriteriaId && (
                      <span className="error-message">
                        {errors.skopKriteriaId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nama Aktiviti Semakan</Form.Label>
              <Controller
                id="namaAktivitiSemakan"
                name="namaAktivitiSemakan"
                control={control}
                defaultValue=""
                rules={{ required: "Aktiviti semakan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan aktiviti semakan"
                    autoFocus
                  />
                )}
              />
              {errors.namaAktivitiSemakan && (
                <span className="error-message">
                  {errors.namaAktivitiSemakan.message}
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

export default CreateAktivitiSemakan;
