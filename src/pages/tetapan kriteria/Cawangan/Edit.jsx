import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useCawanganStore from "../../../store/cawangan-store";

function EditCawangan({cawangan, wilayahOptions, onUpdateSuccess}) {
  // INITIALIZE EDIT CAWANGAN MODAL
  const [showEditCawangan, setShowEditCawangan] = useState(false);

  // HANDLE DISPLAY OF EDIT CAWANGAN MODAL
  const handleCloseEditCawangan = () => setShowEditCawangan(false);
  const handleShowEditCawangan = () => setShowEditCawangan(true);

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF CAWANGAN STORE
  const { updateCawangan } = useCawanganStore();
  
  // HANDLE EDIT OF AN CAWANGAN
  const onSubmit = (cawanganInput) => {
    updateCawangan(cawangan.id, cawanganInput, handleCloseEditCawangan, onUpdateSuccess);
  };

  // RESET EDIT FORM DATA WHEN MODAL IS OPENED
  useEffect(() => {
    if (showEditCawangan) {
      reset({
        wilayahId: cawangan.wilayahId,
        namaCawangan: cawangan.namaCawangan,
      });
    }
  }, [showEditCawangan, cawangan, reset]);

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditCawangan}>
        Edit
      </Button>

      <Modal
        show={showEditCawangan}
        onHide={handleCloseEditCawangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Controller
                id="wilayahId"
                name="wilayahId"
                control={control}
                defaultValue={cawangan.wilayahId}
                rules={{ required: "A state is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="wilayahSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Select a State</option>
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
              <Form.Label>Branch</Form.Label>
              <Controller
                name="namaCawangan"
                control={control}
                defaultValue={cawangan.namaCawangan}
                rules={{ required: "A branch is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter branch . . ."
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
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditCawangan;
