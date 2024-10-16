import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useSkopSemakanStore from "../../../store/skop-semakan-store";

function EditSkopSemakan({ skopSemakan, onUpdateSuccess }) {
  // INITIALIZE EDIT SKOP SEMAKAN MODAL
  const [showEditSkopSemakan, setShowEditSkopSemakan] = useState(false);

  // HANDLE DISPLAY OF EDIT SKOP SEMAKAN MODAL
  const handleCloseEditSkopSemakan = () => setShowEditSkopSemakan(false);
  const handleShowEditSkopSemakan = () => setShowEditSkopSemakan(true);

  // FORM VALIDATION FOR MODAL
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF SKOP SEMAKAN STORE
  const { updateSkopSemakan } = useSkopSemakanStore();

  // HANDLE EDIT OF AN SKOP SEMAKAN
  const onSubmit = (skopSemakanInput) => {
    updateSkopSemakan(
      skopSemakan.id,
      skopSemakanInput,
      handleCloseEditSkopSemakan,
      onUpdateSuccess
    );
  };

  // RESET EDIT FORM DATA WHEN MODAL IS OPENED
  useEffect(() => {
    if (showEditSkopSemakan) {
      reset({
        namaSkopSemakan: skopSemakan.namaSkopSemakan,
      });
    }
  }, [showEditSkopSemakan, skopSemakan, reset]);

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditSkopSemakan}>
        Edit
      </Button>

      <Modal
        show={showEditSkopSemakan}
        onHide={handleCloseEditSkopSemakan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Review Scope</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Review Scope</Form.Label>
              <Controller
                name="namaSkopSemakan"
                id="namaSkopSemakan"
                control={control}
                defaultValue={skopSemakan.namaSkopSemakan}
                rules={{ required: "A review scope is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter a review scope . . ."
                    />
                    {errors?.namaSkopSemakan && (
                      <span className="error-message">
                        {errors.namaSkopSemakan.message}
                      </span>
                    )}
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

export default EditSkopSemakan;
