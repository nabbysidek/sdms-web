import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axiosCustom from "../../../axios";
import Swal from "sweetalert2";

function EditKriteriaKetidakpatuhan({kriteriaKetidakpatuhan, aktivitiSemakanOptions}) {
  // ----------- FE --------
  //  Handle modal
  const [showEditKriteria, setShowEditKriteria] = useState(false);

  const handleCloseEditKriteria = () => setShowEditKriteria(false);
  const handleShowEditKriteria = () => setShowEditKriteria(true);

  // Form validation
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  // ------------ BE -------------
  // Handle update kriteria ketidakpatuhan
  const updateKriteriaKetidakpatuhan = async (kriteriaKetidakpatuhanInput) => {
    
    try {
      // Log kriteriaKetidakpatuhanInput to see the data being sent to the server
      console.log('Data being sent to server:', kriteriaKetidakpatuhanInput);

      // Ensure kriteriaKetidakpatuhanId is defined and contains the correct value
      console.log('kriteriaKetidakpatuhanId:', kriteriaKetidakpatuhan.id);

      const response = await axiosCustom.put(
          `http://127.0.0.1:8000/api/tetapan-kriteria/kriteria-ketidakpatuhan/${kriteriaKetidakpatuhan.id}`,
          kriteriaKetidakpatuhanInput
      );

      if (response.status === 200) {
          Swal.fire({
              icon: "success",
              title: "Berjaya",
              text: response.data.success, 
          });
          handleCloseEditKriteria();
      }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: error.response.data.error, 
  });
  }
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
          <Button className="edit-modal-btn" onClick={handleSubmit(updateKriteriaKetidakpatuhan)}>
            Kemaskini Kriteria Ketidakpatuhan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditKriteriaKetidakpatuhan;
