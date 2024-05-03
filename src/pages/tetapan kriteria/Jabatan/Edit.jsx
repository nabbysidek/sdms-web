import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axiosCustom from "../../../axios";
import Swal from "sweetalert2";

function EditJabatan({jabatan, bahagianOptions}) {
  // ----------- FE --------
  //  Handle modal
  const [showEditJabatan, setShowEditJabatan] = useState(false);

  const handleCloseEditJabatan = () => setShowEditJabatan(false);
  const handleShowEditJabatan = () => setShowEditJabatan(true);

  // Form validation
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  // ------------ BE -------------
  // Handle update jabatan
  const updateJabatan = async (jabatanInput) => {
    
    try {
      // Log jabatanInput to see the data being sent to the server
      console.log('Data being sent to server:', jabatanInput);

      // Ensure jabatanId is defined and contains the correct value
      console.log('jabatanId:', jabatan.id);

      const response = await axiosCustom.put(
          `http://127.0.0.1:8000/api/tetapan-kriteria/jabatan/${jabatan.id}`,
          jabatanInput
      );

      if (response.status === 200) {
          Swal.fire({
              icon: "success",
              title: "Berjaya",
              text: response.data.success, // Access the message from the backend response
          });
          console.log("Jabatan berjaya dikemaskini");
          handleCloseEditJabatan();
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
      <Button className="edit-tetapan-btn" onClick={handleShowEditJabatan}>
        Kemaskini
      </Button>

      <Modal
        show={showEditJabatan}
        onHide={handleCloseEditJabatan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Jabatan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Bahagian</Form.Label>
              <Controller
                name="bahagianId"
                id="bahagianId"
                control={control}
                defaultValue={jabatan.bahagianId}
                rules={{ required: "Sila pilih bahagian" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="bahagianSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Pilih Bahagian</option>
                      {bahagianOptions.map((bahagian) => (
                        <option key={bahagian.value} value={bahagian.value}>
                          {bahagian.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.bahagian && (
                      <span className="error-message">
                        {errors.bahagian.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Jabatan</Form.Label>
              <Controller
                name="namaJabatan"
                control={control}
                defaultValue={jabatan.namaJabatan}
                rules={{ required: "Nama jabatan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Jabatan"
                    />
                    {errors?.namaJabatan && (
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
          <Button className="edit-modal-btn" onClick={handleSubmit(updateJabatan)}>
            Kemaskini Jabatan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditJabatan;
