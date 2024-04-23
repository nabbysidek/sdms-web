import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";

function EditSkopKriteria({skopKriteria}) {
  // ----- FE ---------
  // Handle modal
  const [showEditSkopKriteria, setShowEditSkopKriteria] = useState(false);

  const handleCloseEditSkopKriteria = () => setShowEditSkopKriteria(false);
  const handleShowEditSkopKriteria = () => setShowEditSkopKriteria(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    handleCloseEditSkopKriteria();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditSkopKriteria}>
        Kemaskini
      </Button>

      <Modal
        show={showEditSkopKriteria}
        onHide={handleCloseEditSkopKriteria}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Skop Kriteria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Skop Semakan</Form.Label>
              <Controller
                name="skopSemakan"
                control={control}
                rules={{ required: "Sila pilih skop semakan" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="skopSemakanSelect"
                      onChange={(e) => {
                        setValue("skopSemakan", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Skop Semakan</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                    {errors?.skopSemakan && (
                      <span className="error-message">
                        {errors.skopSemakan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Skop Kriteria</Form.Label>
              <Controller
                name="namaSkopKriteria"
                control={control}
                defaultValue={skopKriteria.namaSkopKriteria}
                rules={{ required: "Skop kriteria baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Skop kriteria"
                    />
                    {errors?.namaSkopKriteria && (
                      <span className="error-message">
                        {errors.namaSkopKriteria.message}
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
            Kemaskini Skop Kriteria
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditSkopKriteria;
