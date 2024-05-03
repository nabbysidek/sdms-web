import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axiosCustom from "../../../axios";
import Swal from "sweetalert2";

function EditAktivitiSemakan({ aktivitiSemakan, skopKriteriaOptions }) {
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

  // ------------ BE -------------
  // Update aktiviti semakan
  const updateAktivitiSemakan = async (aktivitiSemakanInput) => {
    
    try {
      // Log aktivitiSemakanInput to see the data being sent to the server
      console.log('Data being sent to server:', aktivitiSemakanInput);

      // Ensure aktivitiSemakanId is defined and contains the correct value
      console.log('aktivitiSemakanId:', aktivitiSemakan.id);

      const response = await axiosCustom.put(
          `http://127.0.0.1:8000/api/tetapan-kriteria/aktiviti-semakan/${aktivitiSemakan.id}`,
          aktivitiSemakanInput
      );

      if (response.status === 200) {
          Swal.fire({
              icon: "success",
              title: "Berjaya",
              text: response.data.success,
          });
          console.log("Aktiviti Semakan berjaya dikemaskini");
          handleCloseEditAktivitiSemakan();
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
          <Button className="edit-modal-btn" onClick={handleSubmit(updateAktivitiSemakan)}>
            Kemaskini Aktiviti Semakan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditAktivitiSemakan;
