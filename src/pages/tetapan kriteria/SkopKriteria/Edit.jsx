import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axiosCustom from "../../../axios";
import Swal from "sweetalert2";

function EditSkopKriteria({skopKriteria, skopSemakanOptions}) {
  // ----- FE ---------
  // Handle modal
  const [showEditSkopKriteria, setShowEditSkopKriteria] = useState(false);

  const handleCloseEditSkopKriteria = () => setShowEditSkopKriteria(false);
  const handleShowEditSkopKriteria = () => setShowEditSkopKriteria(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // ------------ BE -------------
  // Handle update for skop kriteria
  const updateSkopKriteria = async (skopKriteriaInput) => {
    
    try {
      // Log skopKriteriaInput to see the data being sent to the server
      console.log('Data being sent to server:', skopKriteriaInput);

      // Ensure skopKriteriaId is defined and contains the correct value
      console.log('skopKriteriaId:', skopKriteria.id);

      const response = await axiosCustom.put(
          `http://127.0.0.1:8000/api/tetapan-kriteria/skop-kriteria/${skopKriteria.id}`,
          skopKriteriaInput
      );

      if (response.status === 200) {
          Swal.fire({
              icon: "success",
              title: "Berjaya",
              text: response.data.success, 
          });
          console.log("Skop Kriteria berjaya dikemaskini");
          handleCloseEditSkopKriteria();
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
                id="skopSemakanId"
                name="skopSemakanId"
                control={control}
                defaultValue={skopKriteria.skopSemakanId}
                rules={{ required: "Sila pilih skop semakan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="skopSemakanSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Pilih Skop Semakan</option>
                      {skopSemakanOptions.map((skopSemakan) => (
                        <option key={skopSemakan.value} value={skopSemakan.value}>
                          {skopSemakan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.skopSemakanId && (
                      <span className="error-message">
                        {errors.skopSemakanId.message}
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
          <Button className="edit-modal-btn" onClick={handleSubmit(updateSkopKriteria)}>
            Kemaskini Skop Kriteria
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditSkopKriteria;
