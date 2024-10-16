import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useAktivitiSemakanStore from "../../../store/aktiviti-semakan-store";

function CreateAktivitiSemakan({skopKriteriaOptions, onAddSuccess}) {
  // INITIALIZE CREATE AKTIVITI SEMAKAN MODAL
  const [showCreateAktivitiSemakan, setShowCreateAktivitiSemakan] =
    useState(false);

  // HANDLE DISPLAY OF CREATE AKTIVITI SEMAKAN MODAL
  const handleShowCreateAktivitiSemakan = () => setShowCreateAktivitiSemakan(true);
  const handleCloseCreateAktivitiSemakan = () => {
    setShowCreateAktivitiSemakan(false);
    reset();
  };

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF AKTIVITI SEMAKAN STORE
  const createAktivitiSemakan = useAktivitiSemakanStore((state) => state.createAktivitiSemakan);

  //  HANDLE CREATE A NEW OF AKTIVITI SEMAKAN
  const onSubmit = (data) => {
    createAktivitiSemakan(data, () => {
      handleCloseCreateAktivitiSemakan();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateAktivitiSemakan}>
        Add Activity Review
      </Button>

      <Modal
        show={showCreateAktivitiSemakan}
        onHide={handleCloseCreateAktivitiSemakan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Activity Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Noncompliance Scope</Form.Label>
              <Controller
                id="skopKriteriaId"
                name="skopKriteriaId"
                control={control}
                rules={{ required: "A noncompliance scope is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select onChange={onChange} value={value}>
                      <option value="">
                        Select a Noncompliance Scope
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
              <Form.Label>Activity Review</Form.Label>
              <Controller
                id="namaAktivitiSemakan"
                name="namaAktivitiSemakan"
                control={control}
                defaultValue=""
                rules={{ required: "An activity review is required" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Enter activity review . . ."
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
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateAktivitiSemakan;
