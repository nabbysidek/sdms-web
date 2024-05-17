import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function CreateSkopKriteria({skopSemakanOptions}) {
  // ----------FE----------
  const [showCreateSkopKriteria, setShowCreateSkopKriteria] = useState(false);

  const handleShowCreateSkopKriteria = () => setShowCreateSkopKriteria(true);
  const handleCloseCreateSkopKriteria = () => {
    setShowCreateSkopKriteria(false);
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
  // Create skop kriteria
  const createSkopKriteria = async (skopKriteriaInput) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/skop-kriteria`,
        skopKriteriaInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Skop kriteria berjaya ditambah");
        handleCloseCreateSkopKriteria();
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
      <Button className="create-new-btn" onClick={handleShowCreateSkopKriteria}>
        Tambah
      </Button>

      <Modal
        show={showCreateSkopKriteria}
        onHide={handleCloseCreateSkopKriteria}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Skop Kriteria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(createSkopKriteria)} onReset={reset}>
            <Form.Group>
              <Form.Label>Skop Semakan</Form.Label>
              <Controller
                id="skopSemakanId"
                name="skopSemakanId"
                control={control}
                rules={{ required: "Sila pilih skop semakan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select aria-label="skopSemakanSelect" onChange={onChange} value={value}>
                      <option value="">
                        Pilih Skop Semakan
                      </option>
                      {skopSemakanOptions.map((skopSemakan) => (
                        <option key={skopSemakan.value} value={skopSemakan.value}>
                          {skopSemakan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.skopSemakanId && (
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
                id="namaSkopKriteria"
                control={control}
                defaultValue=""
                rules={{ required: "Skop kriteria baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan skop kriteria"
                    autoFocus
                  />
                )}
              />
              {errors.namaSkopKriteria && (
                <span className="error-message">
                  {errors.namaSkopKriteria.message}
                </span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="create-new-modal-btn"
            onClick={handleSubmit(createSkopKriteria)}
          >
            Tambah Skop Kriteria
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateSkopKriteria;
