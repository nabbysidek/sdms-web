import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useSkopSemakanStore from "../../../store/skop-semakan-store";

function EditSkopSemakan({skopSemakan, onUpdateSuccess }) {
  // INITIALIZE EDIT SKOP SEMAKAN MODAL
  const [showEditSkopSemakan, setShowEditSkopSemakan] = useState(false);

  // HANDLE DISPLAY OF EDIT SKOP SEMAKAN MODAL
  const handleCloseEditSkopSemakan = () => setShowEditSkopSemakan(false);
  const handleShowEditSkopSemakan = () => setShowEditSkopSemakan(true);

  // FORM VALIDATION FOR MODAL
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // USE OF SKOP SEMAKAN STORE
  const { updateSkopSemakan } = useSkopSemakanStore();

  // HANDLE EDIT OF AN SKOP SEMAKAN
  const onSubmit = (skopSemakanInput) => {
    updateSkopSemakan(skopSemakan.id, skopSemakanInput, handleCloseEditSkopSemakan, onUpdateSuccess);
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
                name="namaSkopSemakan"
                id="namaSkopSemakan"
                control={control}
                defaultValue={skopSemakan.namaSkopSemakan}
                rules={{ required: "Skop semakan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Skop semakan"
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
            Kemaskini
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditSkopSemakan;
