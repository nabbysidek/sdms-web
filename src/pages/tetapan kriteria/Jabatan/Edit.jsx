import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useJabatanStore from "../../../store/jabatan-store";

function EditJabatan({jabatan, bahagianOptions, onUpdateSuccess}) {
  // INITIALIZE EDIT JABATAN MODAL
  const [showEditJabatan, setShowEditJabatan] = useState(false);

  // HANDLE DISPLAY OF EDIT JABATAN MODAL
  const handleCloseEditJabatan = () => setShowEditJabatan(false);
  const handleShowEditJabatan = () => setShowEditJabatan(true);

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF JABATAN STORE
  const { updateJabatan } = useJabatanStore();
  
  // HANDLE EDIT OF AN JABATAN
  const onSubmit = (jabatanInput) => {
    updateJabatan(jabatan.id, jabatanInput, handleCloseEditJabatan, onUpdateSuccess);
  };

  // RESET EDIT FORM DATA WHEN MODAL IS OPENED
  useEffect(() => {
    if (showEditJabatan) {
      reset({
        bahagianId: jabatan.bahagianId,
        namaJabatan: jabatan.namaJabatan,
      });
    }
  }, [showEditJabatan, jabatan, reset]);

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditJabatan}>
        Edit
      </Button>

      <Modal
        show={showEditJabatan}
        onHide={handleCloseEditJabatan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Division</Form.Label>
              <Controller
                name="bahagianId"
                id="bahagianId"
                control={control}
                defaultValue={jabatan.bahagianId}
                rules={{ required: "A division is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="bahagianSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Select a Division</option>
                      {bahagianOptions.map((bahagian) => (
                        <option key={bahagian.value} value={bahagian.value}>
                          {bahagian.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.bahagian && (
                      <span className="error-message">
                        {errors.bahagian.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Controller
                name="namaJabatan"
                control={control}
                defaultValue={jabatan.namaJabatan}
                rules={{ required: "A department is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter department . . ."
                    />
                    {errors?.namaJabatan && (
                      <span className="error-message">
                        {errors.namaJabatan.message}
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

export default EditJabatan;
