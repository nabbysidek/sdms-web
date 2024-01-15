import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";

function EditUnit() {
  // ----------- FE --------
  //  Handle modal
  const [showEditUnit, setShowEditUnit] = useState(false);

  const handleCloseEditUnit = () => setShowEditUnit(false);
  const handleShowEditUnit = () => setShowEditUnit(true);

  // Form validation
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    handleCloseEditUnit();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
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
              <Form.Label>Jabatan</Form.Label>
              <Controller
                name="jabatan"
                control={control}
                rules={{ required: "Sila pilih jabatan" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="jabatanSelect"
                      onChange={(e) => {
                        setValue("jabatan", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Jabatan</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                    {errors?.jabatan && (
                      <span className="error-message">
                        {errors.jabatan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Unit</Form.Label>
              <Controller
                name="unit"
                control={control}
                rules={{ required: "Unit baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control type="text" placeholder="Unit" {...field} />
                    {errors?.unit && (
                      <span className="error-message">
                        {errors.unit.message}
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
            Kemaskini Unit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditUnit;
