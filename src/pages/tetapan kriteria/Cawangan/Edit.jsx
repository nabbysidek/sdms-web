import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import useCawanganStore from "../../../store/cawangan-store";

function EditCawangan({cawangan, wilayahOptions, onUpdateSuccess}) {
  // ----------- FE --------
  //  Handle modal
  const [showEditCawangan, setShowEditCawangan] = useState(false);

  const handleCloseEditCawangan = () => setShowEditCawangan(false);
  const handleShowEditCawangan = () => setShowEditCawangan(true);

  // Form validation
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  // Initialize state management store
  const { updateCawangan } = useCawanganStore();
  
  // ----------- BE ---------------
  // Handle update cawangan

  const onSubmit = (cawanganInput) => {
    updateCawangan(cawangan.id, cawanganInput, handleCloseEditCawangan, onUpdateSuccess);
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditCawangan}>
        Kemaskini
      </Button>

      <Modal
        show={showEditCawangan}
        onHide={handleCloseEditCawangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Cawangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Wilayah</Form.Label>
              <Controller
                id="wilayahId"
                name="wilayahId"
                control={control}
                defaultValue={cawangan.wilayahId}
                rules={{ required: "Sila pilih wilayah" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="wilayahSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Pilih Wilayah</option>
                      {wilayahOptions.map((wilayah) => (
                        <option key={wilayah.value} value={wilayah.value}>
                          {wilayah.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.wilayahId && (
                      <span className="error-message">
                        {errors.wilayahId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Cawangan</Form.Label>
              <Controller
                name="namaCawangan"
                control={control}
                defaultValue={cawangan.namaCawangan}
                rules={{ required: "Nama cawangan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Cawangan"
                    />
                    {errors?.namaCawangan && (
                      <span className="error-message">
                        {errors.namaCawangan.message}
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
            Kemaskini Cawangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditCawangan;
