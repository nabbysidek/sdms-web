import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";

function EditBahagian() {
  // ----------- FE --------
  //  Handle modal
  const [showEditBahagian, setShowEditBahagian] = useState(false);

  const handleCloseEditBahagian = () => setShowEditBahagian(false);
  const handleShowEditBahagian = () => setShowEditBahagian(true);

  // Form validation
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    handleCloseEditBahagianm();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Button className="editBtn" onClick={handleShowEditBahagian}>
        Kemaskini
      </Button>

      <Modal
        show={showEditBahagian}
        onHide={handleCloseEditBahagian}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Bahagian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Bahagian</Form.Label>
              <Controller
                name="bahagian"
                control={control}
                rules={{ required: "Nama bahagian baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Bahagian"
                      {...field}
                    />
                    {errors?.bahagian && (
                      <span className="error-message">
                        {errors.bahagian.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={handleSubmit(onSubmit)}>
            Kemaskini Bahagian
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditBahagian;
