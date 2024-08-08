import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useUnitStore from "../../../store/unit-store";

function EditUnit({unit, jabatanOptions, onUpdateSuccess}) {
  // INITIALIZE EDIT UNIT MODAL
  const [showEditUnit, setShowEditUnit] = useState(false);

  // HANDLE DISPLAY OF EDIT UNIT MODAL
  const handleCloseEditUnit = () => setShowEditUnit(false);
  const handleShowEditUnit = () => setShowEditUnit(true);

  // FORM VALIDATION FOR MODAL
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  // USE OF UNIT STORE
  const { updateUnit } = useUnitStore();

  // HANDLE EDIT OF AN UNIT
  const onSubmit = (unitInput) => {
    updateUnit(unit.id, unitInput, handleCloseEditUnit, onUpdateSuccess);
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditUnit}>
        Kemaskini
      </Button>

      <Modal
        show={showEditUnit}
        onHide={handleCloseEditUnit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Jabatan</Form.Label>
              <Controller
                name="jabatanId"
                id="jabatanId"
                control={control}
                defaultValue={unit.jabatanId}
                rules={{ required: "Sila pilih jabatan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="jabatanSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Pilih Jabatan</option>
                      {jabatanOptions.map((jabatan) => (
                        <option key={jabatan.value} value={jabatan.value}>
                          {jabatan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.jabatanId && (
                      <span className="error-message">
                        {errors.jabatanId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Unit</Form.Label>
              <Controller
                name="namaUnit"
                id="namaUnit"
                control={control}
                defaultValue={unit.namaUnit}
                rules={{ required: "Unit baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Unit"
                    />
                    {errors?.Unit && (
                      <span className="error-message">
                        {errors.Unit.message}
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

export default EditUnit;
