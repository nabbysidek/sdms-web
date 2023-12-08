import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateBahagian() {
  // ----------FE----------
  // Manage the visibility of the modal
  const [showCreateBahagian, setShowCreateBahagian] = useState(false);

  const handleCloseCreateBahagian = () => setShowCreateBahagian(false);
  const handleShowCreateBahagian = () => setShowCreateBahagian(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // Form input
  const [bahagianInput, setBahagianInput] = useState({
    namaBahagian: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBahagianInput({
      ...bahagianInput,
      [name]: value,
    });
  };

  // ----------BE----------
  // Create bahagian
  const createBahagian = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/bahagian`,
        bahagianInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.message, // Access the message from the backend response
        });
        console.log("Bahagian berjaya ditambah");
        handleCloseCreateBahagian();
      }
    } catch (error) {
      console.log("Api respond is not as expected");
    }
  };

  const onSubmit = (data) => {
    if (data.bahagian) {
      createBahagian();
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
          <Form>
            <Form.Group>
              <Form.Label>Nama Bahagian</Form.Label>
              <Controller
                name="bahagian"
                control={control}
                rules={{ required: "Nama bahagian baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <FormControl
                      type="text"
                      id="namaBahagian"
                      name="namaBahagian"
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e);
                      }}
                      placeholder="Nama Bahagian Baharu"
                    />
                    {errors?.bahagian && (
                      <span className="error-message">
                        {errors.bahagian.message}
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
            Tambah Bahagian
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateBahagian;
