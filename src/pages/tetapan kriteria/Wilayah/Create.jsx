import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function CreateWilayah() {
  // ----------FE----------
  const [showCreateWilayah, setShowCreateWilayah] = useState(false);

  const handleShowCreateWilayah = () => setShowCreateWilayah(true);
  const handleCloseCreateWilayah = () => {
    setShowCreateWilayah(false);
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
  // Create wilayah
  const createWilayah = async (wilayahInput) => {
    try {
      const response = await axiosCustom.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/wilayah`,
        wilayahInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Wilayah berjaya ditambah");
        handleCloseCreateWilayah();
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
      <Button className="create-new-btn" onClick={handleShowCreateWilayah}>
        Tambah
      </Button>

      <Modal
        show={showCreateWilayah}
        onHide={handleCloseCreateWilayah}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Wilayah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(createWilayah)} onReset={reset}>
            <Form.Group>
              <Form.Label>Nama Wilayah</Form.Label>
              <Controller
                name="namaWilayah"
                id="namaWilayah"
                control={control}
                defaultValue=""
                rules={{ required: "Wilayah baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan wilayah"
                    autoFocus
                  />
                )}
              />
              {errors.namaWilayah && (
                <span className="error-message">
                  {errors.namaWilayah.message}
                </span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="create-new-modal-btn"
            onClick={handleSubmit(createWilayah)}
          >
            Tambah Wilayah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateWilayah;
