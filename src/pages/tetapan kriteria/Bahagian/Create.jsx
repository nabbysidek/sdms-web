import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useBahagianStore from "../../../store/bahagian-store";

function CreateBahagian({ onAddSuccess }) {
  // INITIALIZE CREATE BAHAGIAN MODAL
  const [showCreateBahagian, setShowCreateBahagian] = useState(false);

  // HANDLE DISPLAY OF CREATE BAHAGIAN MODAL
  const handleShowCreateBahagian = () => setShowCreateBahagian(true);
  const handleCloseCreateBahagian = () => {
    setShowCreateBahagian(false);
    reset();
  };

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF BAHAGIAN STORE
  const createBahagian = useBahagianStore((state) => state.createBahagian);

  //  HANDLE CREATE A NEW OF BAHAGIAN
  const onSubmit = (data) => {
    createBahagian(data, () => {
      handleCloseCreateBahagian();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateBahagian}>
        Add Division
      </Button>

      <Modal
        show={showCreateBahagian}
        onHide={handleCloseCreateBahagian}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Division</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Division</Form.Label>
              <Controller
                name="namaBahagian"
                id="namaBahagian"
                control={control}
                defaultValue=""
                rules={{ required: "A division is required" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Enter division . . ."
                    autoFocus
                  />
                )}
              />
              {errors.namaBahagian && (
                <span className="error-message">
                  {errors.namaBahagian.message}
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

export default CreateBahagian;
