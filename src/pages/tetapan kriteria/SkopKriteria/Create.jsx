import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateSkopKriteria() {
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
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/skop-kriteria`,
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
      console.log("Skop kriteria tidak berjaya ditambah");
    }
  };

  return (
    <div>
      <Button className="tambahBtn" onClick={handleShowCreateSkopKriteria}>
        Tambah Skop Kriteria
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
            className="modalBtn"
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
