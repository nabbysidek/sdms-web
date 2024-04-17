import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axiosCustom from "../../../axios";
import Swal from "sweetalert2";

function EditWilayah({wilayah}) {
  // ----- FE ---------
  // Handle modal
  const [showEditWilayah, setShowEditWilayah] = useState(false);

  const handleCloseEditWilayah = () => setShowEditWilayah(false);
  const handleShowEditWilayah = () => setShowEditWilayah(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // ------------ BE -------------
  // Set default values when the kemas kini modal is opened
  const updateWilayah = async (wilayahInput) => {
    
    try {
      // Log wilayahInput to see the data being sent to the server
      console.log('Data being sent to server:', wilayahInput);

      // Ensure wilayahId is defined and contains the correct value
      console.log('wilayahId:', wilayah.id);

      const response = await axiosCustom.put(
          `http://127.0.0.1:8000/api/tetapan-kriteria/wilayah/${wilayah.id}`,
          wilayahInput
      );

      if (response.status === 200) {
          Swal.fire({
              icon: "success",
              title: "Berjaya",
              text: response.data.success, // Access the message from the backend response
          });
          console.log("Wilayah berjaya dikemaskini");
          handleCloseEditWilayah();
      }
  } catch (error) {
      console.log("Wilayah tidak berjaya dikemaskini", error);
  }
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditWilayah}>
        Kemaskini
      </Button>

      <Modal
        show={showEditWilayah}
        onHide={handleCloseEditWilayah}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Wilayah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Wilayah</Form.Label>
              <Controller
                name="namaWilayah"
                id="namaWilayah"
                control={control}
                rules={{ required: "Wilayah baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Wilayah"
                    />
                    {errors?.namaWilayah && (
                      <span className="error-message">
                        {errors.namaWilayah.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="edit-modal-btn" onClick={handleSubmit(updateWilayah)}>
            Kemaskini Wilayah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditWilayah;
