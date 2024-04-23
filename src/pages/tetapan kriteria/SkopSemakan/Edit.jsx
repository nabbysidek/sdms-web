import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axiosCustom from "../../../axios";
import Swal from "sweetalert2";

function EditSkopSemakan({skopSemakan}) {
  // ----- FE ---------
  // Handle modal
  const [showEditSkopSemakan, setShowEditSkopSemakan] = useState(false);

  const handleCloseEditSkopSemakan = () => setShowEditSkopSemakan(false);
  const handleShowEditSkopSemakan = () => setShowEditSkopSemakan(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // ------------ BE -------------
  // Set default values when the kemas kini modal is opened
  const updateSkopSemakan = async (skopSemakanInput) => {
    
    try {
      // Log skopSemakanInput to see the data being sent to the server
      console.log('Data being sent to server:', skopSemakanInput);

      // Ensure skopSemakanId is defined and contains the correct value
      console.log('jskopSemakanId:', skopSemakan.id);

      const response = await axiosCustom.put(
          `http://127.0.0.1:8000/api/tetapan-kriteria/skop-semakan/${skopSemakan.id}`,
          skopSemakanInput
      );

      if (response.status === 200) {
          Swal.fire({
              icon: "success",
              title: "Berjaya",
              text: response.data.success, // Access the message from the backend response
          });
          console.log("Skop Semakan berjaya dikemaskini");
          handleCloseEditSkopSemakan();
      }
  } catch (error) {
      console.log("Skop Semakan tidak berjaya dikemaskini", error);
  }
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditSkopSemakan}>
        Kemaskini
      </Button>

      <Modal
        show={showEditSkopSemakan}
        onHide={handleCloseEditSkopSemakan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Skop Semakan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Skop Semakan</Form.Label>
              <Controller
                name="namaSkopSemakan"
                id="namaSkopSemakan"
                control={control}
                defaultValue={skopSemakan.namaSkopSemakan}
                rules={{ required: "Skop semakan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Skop semakan"
                    />
                    {errors?.namaSkopSemakan && (
                      <span className="error-message">
                        {errors.namaSkopSemakan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="edit-modal-btn" onClick={handleSubmit(updateSkopSemakan)}>
            Kemaskini Skop Semakan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditSkopSemakan;
