import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";

function EditSkopKriteria() {
  // ----- FE ---------
  // Handle modal
  const [showEditSkopKriteria, setShowEditSkopKriteria] = useState(false);

  const handleCloseEditSkopKriteria = () => setShowEditSkopKriteria(false);
  const handleShowEditSkopKriteria = () => setShowEditSkopKriteria(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    handleCloseEditSkopKriteria();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditSkopKriteria}>
        Kemaskini
      </Button>

      <Modal
        show={showEditSkopKriteria}
        onHide={handleCloseEditSkopKriteria}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Skop Kriteria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Skop Kriteria</Form.Label>
              <Controller
                name="skopKriteria"
                control={control}
                rules={{ required: "Skop kriteria baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Skop kriteria"
                      {...field}
                    />
                    {errors?.skopKriteria && (
                      <span className="error-message">
                        {errors.skopKriteria.message}
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
            Kemaskini Skop Kriteria
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditSkopKriteria;
