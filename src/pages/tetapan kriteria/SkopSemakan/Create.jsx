import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useSkopSemakanStore from "../../../store/skop-semakan-store";

function CreateSkopSemakan({ onAddSuccess }) {
  // INITIALIZE CREATE SKOP SEMAKAN MODAL
  const [showCreateSkopSemakan, setShowCreateSkopSemakan] = useState(false);

  // HANDLE DISPLAY OF CREATE SKOP SEMAKAN MODAL
  const handleShowCreateSkopSemakan = () => setShowCreateSkopSemakan(true);
  const handleCloseCreateSkopSemakan = () => {
    setShowCreateSkopSemakan(false);
    reset();
  };

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF SKOP SEMAKAN STORE
  const createSkopSemakan = useSkopSemakanStore(
    (state) => state.createSkopSemakan
  );

  //  HANDLE CREATE A NEW OF SKOP SEMAKAN
  const onSubmit = (data) => {
    createSkopSemakan(data, () => {
      handleCloseCreateSkopSemakan();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateSkopSemakan}>
        Add Review Scope
      </Button>

      <Modal
        show={showCreateSkopSemakan}
        onHide={handleCloseCreateSkopSemakan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Review Scope</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Review Scope</Form.Label>
              <Controller
                name="namaSkopSemakan"
                id="namaSkopSemakan"
                control={control}
                defaultValue=""
                rules={{ required: "A review scope is required" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Enter a review scope . . ."
                    autoFocus
                  />
                )}
              />
              {errors.namaSkopSemakan && (
                <span className="error-message">
                  {errors.namaSkopSemakan.message}
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

export default CreateSkopSemakan;
