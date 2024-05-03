import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function CreateUnit({jabatanOptions}) {
  // ----------FE----------
  const [showCreateUnit, setShowCreateUnit] = useState(false);

  const handleShowCreateUnit = () => setShowCreateUnit(true);
  const handleCloseCreateUnit = () => {
    setShowCreateUnit(false);
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
  // Create unit
  const createUnit = async (unitInput) => {
    try {
      const response = await axiosCustom.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/unit`,
        unitInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, 
        });
        handleCloseCreateUnit();
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
      <Button className="create-new-btn" onClick={handleShowCreateUnit}>
        Tambah
      </Button>

      <Modal
        show={showCreateUnit}
        onHide={handleCloseCreateUnit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(createUnit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Jabatan</Form.Label>
              <Controller
                id="jabatanId"
                name="jabatanId"
                control={control}
                rules={{ required: "Sila pilih jabatan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select onChange={onChange} value={value}>
                      <option value="">
                        Pilih Jabatan
                      </option>
                      {jabatanOptions.map((jabatan) => (
                        <option key={jabatan.value} value={jabatan.value}>
                          {jabatan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.jabatanId && (
                      <span className="error-message">
                        {errors.jabatanId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Unit</Form.Label>
              <Controller
                id="namaUnit"
                name="namaUnit"
                control={control}
                defaultValue=""
                rules={{ required: "Nama unit baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <FormControl
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan unit"
                      autoFocus
                    />
                    {errors.namaUnit && (
                      <span className="error-message">
                        {errors.namaUnit.message}
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
            onClick={handleSubmit(createUnit)}
          >
            Tambah Unit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateUnit;
