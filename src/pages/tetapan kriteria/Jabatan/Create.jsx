import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function CreateJabatan({bahagianOptions}) {
  // ----------FE----------
  const [showCreateJabatan, setShowCreateJabatan] = useState(false);

  const handleShowCreateJabatan = () => setShowCreateJabatan(true);
  const handleCloseCreateJabatan = () => {
    setShowCreateJabatan(false);
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
  // Create jabatan
  const createJabatan = async (jabatanInput) => {
    try {
      const response = await axiosCustom.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/jabatan`,
        jabatanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success,
        });
        handleCloseCreateJabatan();
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
      <Button className="create-new-btn" onClick={handleShowCreateJabatan}>
        Tambah Jabatan
      </Button>

      <Modal
        show={showCreateJabatan}
        onHide={handleCloseCreateJabatan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Jabatan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(createJabatan)} onReset={reset}>
            <Form.Group>
              <Form.Label>Bahagian</Form.Label>
              <Controller
                id="bahagianId"
                name="bahagianId"
                control={control}
                rules={{ required: "Sila pilih bahagian" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select onChange={onChange} value={value}>
                      <option value="">
                        Pilih Bahagian
                      </option>
                      {bahagianOptions.map((bahagian) => (
                        <option key={bahagian.value} value={bahagian.value}>
                          {bahagian.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.bahagianId && (
                      <span className="error-message">
                        {errors.bahagianId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Jabatan</Form.Label>
              <Controller
                id="namaJabatan"
                name="namaJabatan"
                control={control}
                defaultValue=""
                rules={{
                  required: "Nama jabatan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan jabatan"
                      autoFocus
                    />
                    {errors.namaJabatan && (
                      <span className="error-message">
                        {errors.namaJabatan.message}
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
            onClick={handleSubmit(createJabatan)}
          >
            Tambah Jabatan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJabatan;
