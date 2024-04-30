import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function CreateBahagian() {
  // ----------FE----------
  // Manage the visibility of the modal
  const [showCreateBahagian, setShowCreateBahagian] = useState(false);

  const handleShowCreateBahagian = () => setShowCreateBahagian(true);
  const handleCloseCreateBahagian = () => {
    setShowCreateBahagian(false);
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
  // Create bahagian
  const createBahagian = async (bahagianInput) => {
    try {
      const response = await axiosCustom.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/bahagian`,
        bahagianInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Bahagian berjaya ditambah");
        handleCloseCreateBahagian();
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
      <Button className="create-new-btn" onClick={handleShowCreateBahagian}>
        Tambah
      </Button>

      <Modal
        show={showCreateBahagian}
        onHide={handleCloseCreateBahagian}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Bahagian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(createBahagian)} onReset={reset}>
            <Form.Group>
              <Form.Label>Nama Bahagian</Form.Label>
              <Controller
                name="namaBahagian"
                id="namaBahagian"
                control={control}
                defaultValue=""
                rules={{ required: "Bahagian baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan bahagian"
                    autoFocus
                  />
                )}
              />
              {errors.namaBahagian && (
                <span className="error-message">
                  {errors.namaBahagian.message}
                </span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="create-new-modal-btn"
            onClick={handleSubmit(createBahagian)}
          >
            Tambah Bahagian
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateBahagian;
