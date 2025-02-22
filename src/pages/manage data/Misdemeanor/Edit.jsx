import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useMisdemeanorStore from "../../../store/misdemeanor-store";

function EditMisdemeanor({ misdemeanor, misdemeanorCategoryOptions, onUpdateSuccess }) {
  // INITIALIZE EDIT MISDEMEANOR MODAL
  const [showEditMisdemeanor, setShowEditMisdemeanor] = useState(false);

  // HANDLE DISPLAY OF EDIT MISDEMEANOR MODAL
  const handleCloseEditMisdemeanor = () => setShowEditMisdemeanor(false);
  const handleShowEditMisdemeanor = () => setShowEditMisdemeanor(true);

  // FORM VALIDATION FOR MODAL
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF MISDEMEANOR STORE
  const { updateMisdemeanor } = useMisdemeanorStore();

  // HANDLE EDIT OF A MISDEMEANOR
  const onSubmit = (misdemeanorInput) => {
    updateMisdemeanor(misdemeanor.id, misdemeanorInput, handleCloseEditMisdemeanor, onUpdateSuccess);
  };

  // RESET EDIT FORM DATA WHEN MODAL IS OPENED
  useEffect(() => {
    if (showEditMisdemeanor) {
      reset({
        misdemeanorCategoryId: misdemeanor.misdemeanorCategoryId,
        name: misdemeanor.name,
      });
    }
  }, [showEditMisdemeanor, misdemeanor, reset]);

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditMisdemeanor}>
        Edit
      </Button>

      <Modal show={showEditMisdemeanor} onHide={handleCloseEditMisdemeanor} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Misdemeanor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Misdemeanor Category</Form.Label>
              <Controller
                id="misdemeanorCategoryId"
                name="misdemeanorCategoryId"
                control={control}
                defaultValue={misdemeanor.misdemeanorCategoryId}
                rules={{ required: "A misdemeanor category is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select aria-label="misdemeanorCategorySelect" onChange={onChange} value={value}>
                      <option value="" disabled>Select a Misdemeanor Category</option>
                      {misdemeanorCategoryOptions.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.misdemeanorCategoryId && (
                      <span className="error-message">{errors.misdemeanorCategoryId.message}</span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Misdemeanor</Form.Label>
              <Controller
                name="name"
                control={control}
                defaultValue={misdemeanor.name}
                rules={{ required: "A misdemeanor is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control type="text" onChange={onChange} value={value} placeholder="Enter misdemeanor . . ." />
                    {errors?.name && <span className="error-message">{errors.name.message}</span>}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="edit-modal-btn" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditMisdemeanor;
