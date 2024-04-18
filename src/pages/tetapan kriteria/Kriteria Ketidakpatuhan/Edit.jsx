import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";

function EditKriteriaKetidakpatuhan({kriteriaKetidakpatuhan}) {
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
      <Button className="edit-tetapan-btn" onClick={handleShowEditKriteria}>
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
              <Form.Label>Skop Semakan</Form.Label>
              <Controller
                name="namaSkopSemakan"
                control={control}
                rules={{ required: "Sila pilih skop semakan" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="skopSemakanSelect"
                      onChange={(e) => {
                        setValue("namaSkopSemakan", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Skop Semakan</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                    {errors?.namaSkopSemakan && (
                      <span className="error-message">
                        {errors.namaSkopSemakan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Skop Kriteria</Form.Label>
              <Controller
                name="namaSkopKriteria"
                control={control}
                rules={{ required: "Sila pilih skop kriteria" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="skopKriteriaSelect"
                      onChange={(e) => {
                        setValue("namaSkopKriteria", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Skop Kriteria</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                    {errors?.namaSkopKriteria && (
                      <span className="error-message">
                        {errors.namaSkopKriteria.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Aktiviti Semakan</Form.Label>
              <Controller
                name="namaAktivitiSemakan"
                control={control}
                rules={{ required: "Sila pilih aktiviti semakan" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="aktivitiSemakanSelect"
                      onChange={(e) => {
                        setValue("namaAktivitiSemakan", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Aktiviti Semakan</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                    {errors?.namaAktivitiSemakan && (
                      <span className="error-message">
                        {errors.namaAktivitiSemakan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Kriteria Ketidakpatuhan</Form.Label>
              <Controller
                name="namaKriteriaKetidakpatuhan"
                control={control}
                defaultValue={kriteriaKetidakpatuhan.namaKriteriaKetidakpatuhan}
                rules={{ required: "Nama kriteria baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Nama kriteria ketidakpatuhan"
                    />
                    {errors?.namaKriteriaKetidakpatuhan && (
                      <span className="error-message">
                        {errors.namaKriteriaKetidakpatuhan.message}
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
            Kemaskini Kriteria Ketidakpatuhan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditKriteriaKetidakpatuhan;
