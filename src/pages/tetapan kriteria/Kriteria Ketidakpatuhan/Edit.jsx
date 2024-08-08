import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import useKriteriaKetidakpatuhanStore from "../../../store/kriteria-ketidakpatuhan-store";

function EditKriteriaKetidakpatuhan({kriteriaKetidakpatuhan, aktivitiSemakanOptions, onUpdateSuccess}) {
  // initialize edit modal
  const [showEditKriteriaKetidakpatuhan, setShowEditKriteriaKetidakpatuhan] = useState(false);

  // handle edit modal
  const handleCloseEditKriteriaKetidakpatuhan = () => setShowEditKriteriaKetidakpatuhan(false);
  const handleShowEditKriteriaKetidakpatuhan = () => setShowEditKriteriaKetidakpatuhan(true);

  // form validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // initialize state management store
  const { updateKriteriaKetidakpatuhan } = useKriteriaKetidakpatuhanStore();

  // handle update aktiviti semakan
  const onSubmit = (kriteriaKetidakpatuhanInput) => {
    updateKriteriaKetidakpatuhan(kriteriaKetidakpatuhan.id, kriteriaKetidakpatuhanInput, handleCloseEditKriteriaKetidakpatuhan, onUpdateSuccess);
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditKriteriaKetidakpatuhan}>
        Kemaskini
      </Button>

      <Modal
        show={showEditKriteriaKetidakpatuhan}
        onHide={handleCloseEditKriteriaKetidakpatuhan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Kriteria Ketidakpatuhan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Aktiviti Semakan</Form.Label>
              <Controller
                name="aktivitiSemakanId"
                id="aktivitiSemakanId"
                control={control}
                defaultValue={kriteriaKetidakpatuhan.aktivitiSemakanId}
                rules={{ required: "Sila pilih aktiviti semakan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="aktivitiSemakanSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Pilih Aktiviti Semakan</option>
                      {aktivitiSemakanOptions.map((aktivitiSemakan) => (
                        <option key={aktivitiSemakan.value} value={aktivitiSemakan.value}>
                          {aktivitiSemakan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.aktivitiSemakanId && (
                      <span className="error-message">
                        {errors.aktivitiSemakanId.message}
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
                rules={{ required: "Nama kriteria ketidakpatuhan baru diperlukan" }}
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
            Kemaskini
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditKriteriaKetidakpatuhan;
