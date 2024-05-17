import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function CreateKakitangan() {
  // ----------FE----------
  const [showCreateKakitangan, setShowCreateKakitangan] = useState(false);

  const handleShowCreateKakitangan = () => setShowCreateKakitangan(true);
  const handleCloseCreateKakitangan = () => {
    setShowCreateKakitangan(false);
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
  // Create kakitangan
  const createKakitangan = async (kakitanganInput) => {
    console.log(kakitanganInput);
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/kakitangan`,
        kakitanganInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, 
        });

        handleCloseCreateKakitangan();
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
      <Button className="create-new-btn" onClick={handleShowCreateKakitangan}>
        Tambah
      </Button>

      <Modal
        show={showCreateKakitangan}
        onHide={handleCloseCreateKakitangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kakitangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(createKakitangan)} onReset={reset}>
            <Form.Group>
              <Form.Label>Nama Kakitangan</Form.Label>
              <Controller
                id="namaKakitangan"
                name="namaKakitangan"
                control={control}
                defaultValue=""
                rules={{
                  required: "Nama kakitangan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan kakitangan"
                      autoFocus
                    />
                    {errors.namaKakitangan && (
                      <span className="error-message">
                        {errors.namaKakitangan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>ID Kakitangan</Form.Label>
              <Controller
                id="idKakitangan"
                name="idKakitangan"
                control={control}
                defaultValue=""
                rules={{
                  required: "ID kakitangan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan ID kakitangan"
                      autoFocus
                    />
                    {errors.idKakitangan && (
                      <span className="error-message">
                        {errors.idKakitangan.message}
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
            onClick={handleSubmit(createKakitangan)}
          >
            Tambah Kakitangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateKakitangan;
