import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateSkopSemakan() {
  // ----------FE----------
  const [showCreateSkopSemakan, setShowCreateSkopSemakan] = useState(false);

  const handleCloseCreateSkopSemakan = () => setShowCreateSkopSemakan(false);
  const handleShowCreateSkopSemakan = () => setShowCreateSkopSemakan(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // Form input
  const [skopSemakanInput, setSkopSemakanInput] = useState({
    namaSkopSemakan: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSkopSemakanInput({
      ...skopSemakanInput,
      [name]: value,
    });
  };

  // ----------BE----------
  // Create skop semakan
  const createSkopSemakan = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/skop-semakan`,
        skopSemakanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.message, // Access the message from the backend response
        });
        console.log("Skop Semakan Berjaya ditambah");
        handleCloseCreateSkopSemakan();
      }
    } catch (error) {
      console.log("Api respond is not as expected");
    }
  };

  const onSubmit = (data) => {
    handleCloseCreateSkopSemakan();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Button className="tambahBtn" onClick={handleShowCreateSkopSemakan}>
        Tambah Skop Semakan
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
                name="skopSemakan"
                control={control}
                rules={{ required: "Skop semakan baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <FormControl
                      type="text"
                      id="namaSkopSemakan"
                      name="namaSkopSemakan"
                      onChange={(e) => {
                        handleInputChange(e);
                        field.onChange(e);
                      }}
                      placeholder="Skop semakan"
                    />
                    {errors?.skopSemakan && (
                      <span className="error-message">
                        {errors.skopSemakan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={handleSubmit(onSubmit)}>
            Tambah Skop Semakan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateSkopSemakan;
