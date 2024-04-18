import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";

function EditAktivitiSemakan({ aktivitiSemakan }) {
  // ----------------- FE -----------------
  // Manage modal visibility
  const [showEditAktivitiSemakan, setShowEditAktivitiSemakan] = useState(false);

  const handleCloseEditAktivitiSemakan = () =>
    setShowEditAktivitiSemakan(false);
  const handleShowEditAktivitiSemakan = () => setShowEditAktivitiSemakan(true);

  // Form submission and validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleCloseEditAktivitiSemakan();
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Button
        className="edit-tetapan-btn"
        onClick={handleShowEditAktivitiSemakan}
      >
        Kemaskini
      </Button>

      <Modal
        show={showEditAktivitiSemakan}
        onHide={handleCloseEditAktivitiSemakan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Aktiviti Semakan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
              <Form.Label>Skop Kriteria Ketidakpatuhan</Form.Label>
              <Controller
                name="namaSkopKriteriaKetidakpatuhan"
                control={control}
                rules={{ required: "Sila pilih kriteria ketidakpatuhan" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="skopKriteriaKetidakpatuhanSelect"
                      onChange={(e) => {
                        setValue("namaSkopKriteriaKetidakpatuhan", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Skop Kriteria Ketidakpatuhan</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                    {errors?.namaSkopKriteriaKetidakpatuhan && (
                      <span className="error-message">
                        {errors.namaSkopKriteriaKetidakpatuhan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nama Aktiviti Semakan</Form.Label>
              <Controller
                name="namaAktivitiSemakan"
                id="namaAktivitiSemakan"
                control={control}
                defaultValue={aktivitiSemakan.namaAktivitiSemakan}
                rules={{ required: "Nama aktiviti semakan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Aktiviti Semakan"
                    />
                    {errors?.aktivitiSemakan && (
                      <span className="error-message">
                        {errors.aktivitiSemakan.message}
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
            Kemaskini Aktiviti Semakan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditAktivitiSemakan;
