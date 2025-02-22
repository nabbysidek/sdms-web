import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useMisdemeanorStore from "../../../store/misdemeanor-store";

function CreateMisdemeanor({ misdemeanorCategoryOptions, onAddSuccess }) {
  // INITIALIZE CREATE MISDEMEANOR MODAL
  const [showCreateMisdemeanor, setShowCreateMisdemeanor] = useState(false);

  // HANDLE DISPLAY OF CREATE MISDEMEANOR MODAL
  const handleShowCreateMisdemeanor = () => setShowCreateMisdemeanor(true);
  const handleCloseCreateMisdemeanor = () => {
    setShowCreateMisdemeanor(false);
    reset();
  };

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF MISDEMEANOR STORE
  const createMisdemeanor = useMisdemeanorStore((state) => state.createMisdemeanor);

  // HANDLE CREATE A NEW MISDEMEANOR
  const onSubmit = (data) => {
    createMisdemeanor(data, () => {
      handleCloseCreateMisdemeanor();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateMisdemeanor}>
        Add Misdemeanor
      </Button>

      <Modal show={showCreateMisdemeanor} onHide={handleCloseCreateMisdemeanor}>
        <Modal.Header closeButton>
          <Modal.Title>Add Misdemeanor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Misdemeanor Category</Form.Label>
              <Controller
                id="misdemeanorCategoryId"
                name="misdemeanorCategoryId"
                control={control}
                rules={{ required: "A misdemeanor category is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="misdemeanorCategorySelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="">Select a Misdemeanor Category</option>
                      {misdemeanorCategoryOptions.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.misdemeanorCategoryId && (
                      <span className="error-message">
                        {errors.misdemeanorCategoryId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Misdemeanor</Form.Label>
              <Controller
                name="name"
                id="name"
                control={control}
                defaultValue=""
                rules={{ required: "A misdemeanor is required" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Enter misdemeanor . . ."
                    autoFocus
                  />
                )}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="create-new-modal-btn" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateMisdemeanor;
