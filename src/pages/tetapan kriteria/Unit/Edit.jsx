import React, { useState, useEffect } from "react";
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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF UNIT STORE
  const { updateUnit } = useUnitStore();

  // HANDLE EDIT OF AN UNIT
  const onSubmit = (unitInput) => {
    updateUnit(unit.id, unitInput, handleCloseEditUnit, onUpdateSuccess);
  };

  // RESET EDIT FORM DATA WHEN MODAL IS OPENED
  useEffect(() => {
    if (showEditUnit) {
      reset({
        jabatanId: unit.jabatanId,
        namaUnit: unit.namaUnit,
      });
    }
  }, [showEditUnit, unit, reset]);

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditUnit}>
        Edit
      </Button>

      <Modal
        show={showEditUnit}
        onHide={handleCloseEditUnit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Controller
                name="jabatanId"
                id="jabatanId"
                control={control}
                defaultValue={unit.jabatanId}
                rules={{ required: "A department is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="jabatanSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Select a Department</option>
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
              <Form.Label>Unit</Form.Label>
              <Controller
                name="namaUnit"
                id="namaUnit"
                control={control}
                defaultValue={unit.namaUnit}
                rules={{ required: "A unit is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter unit . . ."
                    />
                    {errors?.namaUnit && (
                      <span className="error-message">
                        {errors.namaUnit.message}
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
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditUnit;
