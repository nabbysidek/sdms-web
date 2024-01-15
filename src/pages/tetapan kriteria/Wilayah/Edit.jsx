import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";

function EditWilayah() {
  // ----- FE ---------
  // Handle modal
  const [showEditWilayah, setShowEditWilayah] = useState(false);

  const handleCloseEditWilayah = () => setShowEditWilayah(false);
  const handleShowEditWilayah = () => setShowEditWilayah(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    handleCloseEditWilayah();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditWilayah}>
        Kemaskini
      </Button>

      <Modal
        show={showEditWilayah}
        onHide={handleCloseEditWilayah}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Wilayah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Wilayah</Form.Label>
              <Controller
                name="wilayah"
                control={control}
                rules={{ required: "Wilayah baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Wilayah"
                      {...field}
                    />
                    {errors?.wilayah && (
                      <span className="error-message">
                        {errors.wilayah.message}
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
            Kemaskini Wilayah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditWilayah;
