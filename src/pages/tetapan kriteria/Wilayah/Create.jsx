import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateWilayah() {
  // ----------FE----------
  const [showCreateWilayah, setShowCreateWilayah] = useState(false);

  const handleShowCreateWilayah = () => setShowCreateWilayah(true);
  const handleCloseCreateWilayah = () => {
    setShowCreateWilayah(false);
    reset();
  };

  // Form validation
  // Form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Form input
  // const [wilayahInput, setWilayahInput] = useState({
  //   namaWilayah: "",
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setWilayahInput({
  //     ...wilayahInput,
  //     [name]: value,
  //   });
  // };

  // ----------BE----------
  // Create wilayah
  const createWilayah = async (wilayahInput) => {
    // console.log(wilayahInput);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/wilayah`,
        wilayahInput
      );

      if (response.status === 200) {
        // Swal.fire({
        //   icon: "success",
        //   title: "Berjaya",
        //   text: response.data.message, // Access the message from the backend response
        // });
        console.log("Wilayah berjaya ditambah");
        handleCloseCreateWilayah();
      }
    } catch (error) {
      console.log("Wilayah tidak berjaya ditambah");
      // console.log(error);
    }
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
          <Form onSubmit={handleSubmit(createWilayah)} onReset={reset}>
            <Form.Group>
              <Form.Label>Nama Wilayah</Form.Label>
              <Controller
                name="namaWilayah"
                id="namaWilayah"
                control={control}
                defaultValue=""
                rules={{ required: "Wilayah baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan wilayah"
                    autoFocus
                  />
                )}
              />
              {errors?.wilayah && (
                <span className="error-message">{errors.wilayah.message}</span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={handleSubmit(createWilayah)}>
            Tambah Wilayah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateWilayah;
