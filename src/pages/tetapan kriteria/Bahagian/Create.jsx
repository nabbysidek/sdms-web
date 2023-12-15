import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateBahagian() {
  // ----------FE----------
  // Manage the visibility of the modal
  const [showCreateBahagian, setShowCreateBahagian] = useState(false);

  const handleShowCreateBahagian = () => setShowCreateBahagian(true);
  const handleCloseCreateBahagian = () => {
    setShowCreateBahagian(false);
    reset();
  };

  // Form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Form input
  // const [bahagianInput, setBahagianInput] = useState({
  //   namaBahagian: "",
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setBahagianInput({
  //     ...bahagianInput,
  //     [name]: value,
  //   });
  // };

  // ----------BE----------
  // Create bahagian
  const createBahagian = async (bahagianInput) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/bahagian`,
        bahagianInput
      );

      if (response.status === 200) {
        // Swal.fire({
        //   icon: "success",
        //   title: "Berjaya",
        //   text: response.data.message, // Access the message from the backend response
        // });
        console.log("Bahagian berjaya ditambah");
        handleCloseCreateBahagian();
      }
    } catch (error) {
      console.log("Bahagian tidak berjaya ditambah");
    }
  };

  return (
    <div>
      <Button className="tambahBtn" onClick={handleShowCreateBahagian}>
        Tambah Bahagian
      </Button>

      <Modal
        show={showCreateBahagian}
        onHide={handleCloseCreateBahagian}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Bahagian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(createBahagian)} onReset={reset}>
            <Form.Group>
              <Form.Label>Nama Bahagian</Form.Label>
              <Controller
                name="namaBahagian"
                id="namaBahagian"
                control={control}
                defaultValue=""
                rules={{ required: "Bahagian baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan bahagian"
                    autoFocus
                  />
                )}
              />
              {errors.namaBahagian && (
                <span className="error-message">
                  {errors.namaBahagian.message}
                </span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={handleSubmit(createBahagian)}>
            Tambah Bahagian
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateBahagian;
