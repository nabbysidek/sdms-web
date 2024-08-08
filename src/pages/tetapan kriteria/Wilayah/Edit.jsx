import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useWilayahStore from "../../../store/wilayah-store";

function EditWilayah({wilayah, onUpdateSuccess}) {
  // INITIALIZE EDIT WILAYAH MODAL
  const [showEditWilayah, setShowEditWilayah] = useState(false);

  // HANDLE DISPLAY OF EDIT WILAYAH MODAL
  const handleCloseEditWilayah = () => setShowEditWilayah(false);
  const handleShowEditWilayah = () => setShowEditWilayah(true);

  // FORM VALIDATION FOR MODAL
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // USE OF WILAYAH STORE
  const { updateWilayah } = useWilayahStore();
  
  // HANDLE EDIT OF AN WILAYAH
  const onSubmit = (wilayahInput) => {
    updateWilayah(wilayah.id, wilayahInput, handleCloseEditWilayah, onUpdateSuccess);
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
                name="namaWilayah"
                id="namaWilayah"
                control={control}
                defaultValue={wilayah.namaWilayah}
                rules={{ required: "Wilayah baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Wilayah"
                    />
                    {errors?.namaWilayah && (
                      <span className="error-message">
                        {errors.namaWilayah.message}
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

export default EditWilayah;
