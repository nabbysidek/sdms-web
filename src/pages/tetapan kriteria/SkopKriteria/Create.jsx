import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateSkopKriteria() {
  // ----------FE----------
  const [showCreateSkopKriteria, setShowCreateSkopKriteria] = useState(false);

  const handleCloseCreateSkopKriteria = () => setShowCreateSkopKriteria(false);
  const handleShowCreateSkopKriteria = () => setShowCreateSkopKriteria(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // Form input
  const [skopKriteriaInput, setSkopKriteriaInput] = useState({
    namaSkopKriteria: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSkopKriteriaInput({
      ...skopKriteriaInput,
      [name]: value,
    });
  };

  // ----------BE----------
  // Create skop kriteria
  const createSkopKriteria = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/skop-kriteria`,
        skopKriteriaInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.message, // Access the message from the backend response
        });
        console.log("Skop kriteria berjaya ditambah");
        handleCloseCreateSkopKriteria();
      }
    } catch (error) {
      console.log("Api respond is not as expected");
    }
  };

  const onSubmit = (data) => {
    handleCloseCreateSkopKriteria();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
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
          <Form>
            <Form.Group>
              <Form.Label>Nama Skop Kriteria</Form.Label>
              <Controller
                name="skopKriteria"
                control={control}
                rules={{ required: "Skop kriteria baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Skop kriteria"
                      {...field}
                    />
                    {errors?.skopKriteria && (
                      <span className="error-message">
                        {errors.skopKriteria.message}
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
            Tambah Skop Kriteria
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateSkopKriteria;
