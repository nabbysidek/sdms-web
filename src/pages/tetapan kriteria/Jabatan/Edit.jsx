import React, { useState } from "react";
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
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  // USE OF JABATAN STORE
  const { updateJabatan } = useJabatanStore();
  
  // HANDLE EDIT OF AN JABATAN
  const onSubmit = (jabatanInput) => {
    updateJabatan(jabatan.id, jabatanInput, handleCloseEditJabatan, onUpdateSuccess);
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditJabatan}>
        Kemaskini
      </Button>

      <Modal
        show={showEditJabatan}
        onHide={handleCloseEditJabatan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Jabatan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Bahagian</Form.Label>
              <Controller
                name="bahagianId"
                id="bahagianId"
                control={control}
                defaultValue={jabatan.bahagianId}
                rules={{ required: "Sila pilih bahagian" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="bahagianSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Pilih Bahagian</option>
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
              <Form.Label>Nama Jabatan</Form.Label>
              <Controller
                name="namaJabatan"
                control={control}
                defaultValue={jabatan.namaJabatan}
                rules={{ required: "Nama jabatan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Jabatan"
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
            Kemaskini
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditJabatan;
