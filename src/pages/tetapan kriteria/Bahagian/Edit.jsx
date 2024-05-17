import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axiosCustom from "../../../axios";
import Swal from "sweetalert2";

function EditBahagian({bahagian}) {
  // ----------- FE --------
  //  Handle modal
  const [showEditBahagian, setShowEditBahagian] = useState(false);

  const handleCloseEditBahagian = () => setShowEditBahagian(false);
  const handleShowEditBahagian = () => setShowEditBahagian(true);

  // Form validation
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  // ------------ BE -------------
  // Update bahagian
  const updateBahagian = async (bahagianInput) => {
    
    try {
      // Log bahagianInput to see the data being sent to the server
      console.log('Data being sent to server:', bahagianInput);

      // Ensure bahagianId is defined and contains the correct value
      console.log('bahagianId:', bahagian.id);

      const response = await axiosCustom.put(
          `tetapan-kriteria/bahagian/${bahagian.id}`,
          bahagianInput
      );

      if (response.status === 200) {
          Swal.fire({
              icon: "success",
              title: "Berjaya",
              text: response.data.success, // Access the message from the backend response
          });
          console.log("Bahagian berjaya dikemaskini");
          handleCloseEditBahagian();
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
      <Button className="edit-tetapan-btn" onClick={handleShowEditBahagian}>
        Kemaskini
      </Button>

      <Modal
        show={showEditBahagian}
        onHide={handleCloseEditBahagian}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Bahagian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Bahagian</Form.Label>
              <Controller
                name="namaBahagian"
                id="namaBahagian"
                control={control}
                defaultValue={bahagian.namaBahagian}
                rules={{ required: "Nama bahagian baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Bahagian"
                    />
                    {errors?.namaBahagian && (
                      <span className="error-message">
                        {errors.namaBahagian.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="edit-modal-btn" onClick={handleSubmit(updateBahagian)}>
            Kemaskini Bahagian
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditBahagian;
