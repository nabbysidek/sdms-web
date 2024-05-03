import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function CreateSkopSemakan() {
  // ----------FE----------
  const [showCreateSkopSemakan, setShowCreateSkopSemakan] = useState(false);

  const handleShowCreateSkopSemakan = () => setShowCreateSkopSemakan(true);
  const handleCloseCreateSkopSemakan = () => {
    setShowCreateSkopSemakan(false);
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
  // Create skop semakan
  const createSkopSemakan = async (skopSemakanInput) => {
    try {
      const response = await axiosCustom.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/skop-semakan`,
        skopSemakanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Skop Semakan Berjaya ditambah");
        handleCloseCreateSkopSemakan();
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
      <Button className="create-new-btn" onClick={handleShowCreateSkopSemakan}>
        Tambah
      </Button>

      <Modal
        show={showCreateSkopSemakan}
        onHide={handleCloseCreateSkopSemakan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Skop Semakan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Skop Semakan</Form.Label>
              <Controller
                name="namaSkopSemakan"
                id="namaSkopSemakan"
                control={control}
                defaultValue=""
                rules={{ required: "Skop semakan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan skop semakan"
                    autoFocus
                  />
                )}
              />
              {errors.namaSkopSemakan && (
                <span className="error-message">
                  {errors.namaSkopSemakan.message}
                </span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="create-new-modal-btn"
            onClick={handleSubmit(createSkopSemakan)}
          >
            Tambah Skop Semakan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateSkopSemakan;
