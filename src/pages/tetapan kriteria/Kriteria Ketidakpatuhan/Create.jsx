import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function CreateKriteriaKetidakpatuhan({aktivitiSemakanOptions}) {
  // ----------FE----------
  // Manage the visibility of the modal
  const [showCreateKriteria, setShowCreateKriteria] = useState(false);

  const handleShowCreateKriteria = () => setShowCreateKriteria(true);
  const handleCloseCreateKriteria = () => {
    setShowCreateKriteria(false);
    reset();
  };

  // Form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // ----------BE----------
  // Create kriteria ketidakpatuhan
  const createKriteriaKetidakpatuhan = async (kriteriaKetidakpatuhanInput) => {
    try {
      const response = await axiosCustom.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/kriteria-ketidakpatuhan`,
        kriteriaKetidakpatuhanInput
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Kriteria ketidakpatuhan berjaya ditambah");
        handleCloseCreateKriteria();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error, // Access the message from the backend response
    });
    }
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateKriteria}>
        Tambah
      </Button>

      <Modal
        show={showCreateKriteria}
        onHide={handleCloseCreateKriteria}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kriteria Ketidakpatuhan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit(createKriteriaKetidakpatuhan)}
            onReset={reset}
          >
            <Form.Group>
              <Form.Label>Aktiviti Semakan</Form.Label>
              <Controller
                id="aktivitiSemakanId"
                name="aktivitiSemakanId"
                control={control}
                rules={{ required: "Sila pilih aktiviti semakan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select aria-label="aktivitiSemakanSelect" onChange={onChange} value={value}>
                      <option value="">
                        Pilih Skop Semakan
                      </option>
                      {aktivitiSemakanOptions.map((aktivitiSemakan) => (
                        <option key={aktivitiSemakan.value} value={aktivitiSemakan.value}>
                          {aktivitiSemakan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.aktivitiSemakanId && (
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
                id="namaKriteriaKetidakpatuhan"
                name="namaKriteriaKetidakpatuhan"
                defaultValue=""
                control={control}
                rules={{
                  required: "Nama kriteria ketidakpatuhan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan kriteria ketidakpatuhan"
                      autoFocus
                    />
                    {errors.namaKriteriaKetidakpatuhan && (
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
          <Button
            className="create-new-modal-btn"
            onClick={handleSubmit(createKriteriaKetidakpatuhan)}
          >
            Tambah Kriteria Ketidakpatuhan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateKriteriaKetidakpatuhan;
