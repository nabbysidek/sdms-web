import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateWilayah() {
  // ----------FE----------
  const [showCreateWilayah, setShowCreateWilayah] = useState(false);

  const handleCloseCreateWilayah = () => setShowCreateWilayah(false);
  const handleShowCreateWilayah = () => setShowCreateWilayah(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // Form input
  const [wilayahInput, setWilayahInput] = useState({
    namaWilayah: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWilayahInput({
      ...wilayahInput,
      [name]: value,
    });
  };

  // ----------BE----------
  // Create wilayah
  const createWilayah = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/wilayah`,
        wilayahInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.message, // Access the message from the backend response
        });
        console.log("Wilayah berjaya ditambah");
        handleCloseCreateWilayah();
      }
    } catch (error) {
      console.log("Api respond is not as expected");
    }
  };

  const onSubmit = (data) => {
    handleCloseCreateWilayah();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Button className="tambahBtn" onClick={handleShowCreateWilayah}>
        Tambah Wilayah
      </Button>

      <Modal
        show={showCreateWilayah}
        onHide={handleCloseCreateWilayah}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Wilayah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Wilayah</Form.Label>
              <Controller
                name="wilayah"
                control={control}
                rules={{ required: "Wilayah baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Wilayah"
                      {...field}
                    />
                    {errors?.wilayah && (
                      <span className="error-message">
                        {errors.wilayah.message}
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
            Tambah Wilayah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateWilayah;
