import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useSkopKriteriaStore from "../../../store/skop-kriteria-store";

function CreateSkopKriteria({ skopSemakanOptions, onAddSuccess }) {
  // INITIALIZE CREATE AKTIVITI SEMAKAN MODAL
  const [showCreateSkopKriteria, setShowCreateSkopKriteria] = useState(false);

  // HANDLE DISPLAY OF CREATE AKTIVITI SEMAKAN MODAL
  const handleShowCreateSkopKriteria = () => setShowCreateSkopKriteria(true);
  const handleCloseCreateSkopKriteria = () => {
    setShowCreateSkopKriteria(false);
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
  const createSkopKriteria = useSkopKriteriaStore(
    (state) => state.createSkopKriteria
  );

  //  HANDLE CREATE A NEW OF AKTIVITI SEMAKAN
  const onSubmit = (data) => {
    createSkopKriteria(data, () => {
      handleCloseCreateSkopKriteria();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateSkopKriteria}>
        Add Noncompliance Scope
      </Button>

      <Modal
        show={showCreateSkopKriteria}
        onHide={handleCloseCreateSkopKriteria}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Noncompliance Scope</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Review Scope</Form.Label>
              <Controller
                id="skopSemakanId"
                name="skopSemakanId"
                control={control}
                rules={{ required: "A review scope is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="skopSemakanSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="">Select a Review Scope</option>
                      {skopSemakanOptions.map((skopSemakan) => (
                        <option
                          key={skopSemakan.value}
                          value={skopSemakan.value}
                        >
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
              <Form.Label>Noncompliance Scope</Form.Label>
              <Controller
                name="namaSkopKriteria"
                id="namaSkopKriteria"
                control={control}
                defaultValue=""
                rules={{ required: "A noncompliance scope is required" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Enter noncompliance scope . . ."
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
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateSkopKriteria;
