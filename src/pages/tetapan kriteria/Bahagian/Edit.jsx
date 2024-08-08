import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useBahagianStore from "../../../store/bahagian-store";

function EditBahagian({bahagian, onUpdateSuccess}) {
  // INITIALIZE EDIT BAHAGIAN MODAL
  const [showEditBahagian, setShowEditBahagian] = useState(false);

  // HANDLE DISPLAY OF EDIT BAHAGIAN MODAL
  const handleCloseEditBahagian = () => setShowEditBahagian(false);
  const handleShowEditBahagian = () => setShowEditBahagian(true);

  // FORM VALIDATION FOR MODAL
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  // USE OF BAHAGIAN STORE
  const { updateBahagian } = useBahagianStore();

  // HANDLE EDIT OF AN BAHAGIAN
  const onSubmit = (bahagianInput) => {
    updateBahagian(bahagian.id, bahagianInput, handleCloseEditBahagian, onUpdateSuccess);
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditBahagian}>
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
                name="namaBahagian"
                id="namaBahagian"
                control={control}
                defaultValue={bahagian.namaBahagian}
                rules={{ required: "Nama bahagian baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Bahagian"
                    />
                    {errors?.namaBahagian && (
                      <span className="error-message">
                        {errors.namaBahagian.message}
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
            Kemaskini
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditBahagian;
