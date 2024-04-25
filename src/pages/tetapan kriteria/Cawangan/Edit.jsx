import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function EditCawangan({cawangan, wilayahOptions}) {
  // ----------- FE --------
  //  Handle modal
  const [showEditCawangan, setShowEditCawangan] = useState(false);

  const handleCloseEditCawangan = () => setShowEditCawangan(false);
  const handleShowEditCawangan = () => setShowEditCawangan(true);

  // Form validation
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  // Set default values when the kemas kini modal is opened
  const updateCawangan = async (cawanganInput) => {
    
    try {
      // Log cawanganInput to see the data being sent to the server
      console.log('Data being sent to server:', cawanganInput);

      // Ensure cawanganId is defined and contains the correct value
      console.log('cawanganId:', cawangan.id);

      const response = await axiosCustom.put(
          `http://127.0.0.1:8000/api/tetapan-kriteria/cawangan/${cawangan.id}`,
          cawanganInput
      );

      if (response.status === 200) {
          Swal.fire({
              icon: "success",
              title: "Berjaya",
              text: response.data.success, // Access the message from the backend response
          });
          console.log("Cawangan berjaya dikemaskini");
          handleCloseEditCawangan();
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
      <Button className="edit-tetapan-btn" onClick={handleShowEditCawangan}>
        Kemaskini
      </Button>

      <Modal
        show={showEditCawangan}
        onHide={handleCloseEditCawangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Cawangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Wilayah</Form.Label>
              <Controller
                id="wilayahId"
                name="wilayahId"
                control={control}
                defaultValue={cawangan.wilayahId}
                rules={{ required: "Sila pilih wilayah" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="wilayahSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Pilih Wilayah</option>
                      {wilayahOptions.map((wilayah) => (
                        <option key={wilayah.value} value={wilayah.value}>
                          {wilayah.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.wilayahId && (
                      <span className="error-message">
                        {errors.wilayahId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Cawangan</Form.Label>
              <Controller
                name="namaCawangan"
                control={control}
                defaultValue={cawangan.namaCawangan}
                rules={{ required: "Nama cawangan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Cawangan"
                    />
                    {errors?.namaCawangan && (
                      <span className="error-message">
                        {errors.namaCawangan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="edit-modal-btn" onClick={handleSubmit(updateCawangan)}>
            Kemaskini Cawangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditCawangan;
