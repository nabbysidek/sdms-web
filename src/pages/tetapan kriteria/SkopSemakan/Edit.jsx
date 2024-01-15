import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";

function EditSkopSemakan() {
  // ----- FE ---------
  // Handle modal
  const [showEditSkopSemakan, setShowEditSkopSemakan] = useState(false);

  const handleCloseEditSkopSemakan = () => setShowEditSkopSemakan(false);
  const handleShowEditSkopSemakan = () => setShowEditSkopSemakan(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    handleCloseEditSkopSemakan();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditSkopSemakan}>
        Kemaskini
      </Button>

      <Modal
        show={showEditSkopSemakan}
        onHide={handleCloseEditSkopSemakan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Skop Semakan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Skop Semakan</Form.Label>
              <Controller
                name="skopSemakan"
                control={control}
                rules={{ required: "Skop semakan baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Skop semakan"
                      {...field}
                    />
                    {errors?.skopSemakan && (
                      <span className="error-message">
                        {errors.skopSemakan.message}
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
            Kemaskini Skop Semakan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditSkopSemakan;
