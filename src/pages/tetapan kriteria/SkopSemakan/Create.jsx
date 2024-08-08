import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useSkopSemakanStore from "../../../store/skop-semakan-store";

function CreateSkopSemakan({ onAddSuccess }) {
  // initialize create modal
  const [showCreateSkopSemakan, setShowCreateSkopSemakan] = useState(false);

  // handle create modal
  const handleShowCreateSkopSemakan = () => setShowCreateSkopSemakan(true);
  const handleCloseCreateSkopSemakan = () => {
    setShowCreateSkopSemakan(false);
    reset();
  };

  // form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // initialize store
  const createSkopSemakan = useSkopSemakanStore((state) => state.createSkopSemakan);

  // handle create skop semakan
  const onSubmit = (data) => {
    createSkopSemakan(data, () => {
      handleCloseCreateSkopSemakan();
      // reload the table
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateSkopSemakan}>
        Tambah
      </Button>

      <Modal
        show={showCreateSkopSemakan}
        onHide={handleCloseCreateSkopSemakan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Skop Semakan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Skop Semakan</Form.Label>
              <Controller
                name="namaSkopSemakan"
                id="namaSkopSemakan"
                control={control}
                defaultValue=""
                rules={{ required: "Skop semakan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan skop semakan"
                    autoFocus
                  />
                )}
              />
              {errors.namaSkopSemakan && (
                <span className="error-message">
                  {errors.namaSkopSemakan.message}
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
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateSkopSemakan;
