import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useAktivitiSemakanStore from "../../../store/aktiviti-semakan-store";

function EditAktivitiSemakan({ aktivitiSemakan, skopKriteriaOptions, onUpdateSuccess }) {
  // initialize edit modal
  const [showEditAktivitiSemakan, setShowEditAktivitiSemakan] = useState(false);

  // handle edit modal
  const handleCloseEditAktivitiSemakan = () =>
    setShowEditAktivitiSemakan(false);
  const handleShowEditAktivitiSemakan = () => setShowEditAktivitiSemakan(true);

  // form validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // initialize state management store
  const { updateAktivitiSemakan } = useAktivitiSemakanStore();

  // handle update aktiviti semakan
  const onSubmit = (aktivitiSemakanInput) => {
    updateAktivitiSemakan(aktivitiSemakan.id, aktivitiSemakanInput, handleCloseEditAktivitiSemakan, onUpdateSuccess);
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
          <Form>
            <Form.Group>
              <Form.Label>Skop Kriteria Ketidakpatuhan</Form.Label>
              <Controller
                id="skopKriteriaId"
                name="skopKriteriaId"
                control={control}
                defaultValue={aktivitiSemakan.skopKriteriaId}
                rules={{ required: "Sila pilih skop kriteria ketidakpatuhan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="skopKriteriaSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Pilih Skop Kriteria Ketidakpatuhan</option>
                      {skopKriteriaOptions.map((skopKriteria) => (
                        <option key={skopKriteria.value} value={skopKriteria.value}>
                          {skopKriteria.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.skopKriteriaId && (
                      <span className="error-message">
                        {errors.skopKriteriaId.message}
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
