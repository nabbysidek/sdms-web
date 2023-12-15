import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";

function EditKriteriaKetidakpatuhan() {
  // ----------- FE --------
  //  Handle modal
  const [showEditKriteria, setShowEditKriteria] = useState(false);

  const handleCloseEditKriteria = () => setShowEditKriteria(false);
  const handleShowEditKriteria = () => setShowEditKriteria(true);

  // Form validation
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    handleCloseEditKriteria();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Button className="editBtn" onClick={handleShowEditKriteria}>
        Kemaskini
      </Button>

      <Modal
        show={showEditKriteria}
        onHide={handleCloseEditKriteria}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Kriteria Ketidakpatuhan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Skop Kriteria</Form.Label>
              <Controller
                name="skopKriteria"
                control={control}
                rules={{ required: "Sila pilih skop kriteria" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="skopKriteriaSelect"
                      onChange={(e) => {
                        setValue("skopKriteria", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Skop Kriteria</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                    {errors?.skopKriteria && (
                      <span className="error-message">
                        {errors.skopKriteria.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Kod Kriteria Ketidakpatuhan</Form.Label>
              <Controller
                name="kodKriteria"
                control={control}
                rules={{ required: "Kod kriteria baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Kod kriteria"
                      {...field}
                    />
                    {errors?.kodKriteria && (
                      <span className="error-message">
                        {errors.kodKriteria.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Kriteria Ketidakpatuhan</Form.Label>
              <Controller
                name="namaKriteria"
                control={control}
                rules={{ required: "Nama kriteria baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Nama kriteria"
                      {...field}
                    />
                    {errors?.namaKriteria && (
                      <span className="error-message">
                        {errors.namaKriteria.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={handleSubmit(onSubmit)}>
            Kemaskini Kriteria Ketidakpatuhan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditKriteriaKetidakpatuhan;
