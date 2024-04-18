import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";

function EditJabatan({jabatan}) {
  // ----------- FE --------
  //  Handle modal
  const [showEditJabatan, setShowEditJabatan] = useState(false);

  const handleCloseEditJabatan = () => setShowEditJabatan(false);
  const handleShowEditJabatan = () => setShowEditJabatan(true);

  // Form validation
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    handleCloseEditJabatan();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
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
                name="bahagian"
                control={control}
                rules={{ required: "Sila pilih bahagian" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="bahagianSelect"
                      onChange={(e) => {
                        setValue("bahagian", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Bahagian</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
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
            Kemaskini Jabatan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditJabatan;
