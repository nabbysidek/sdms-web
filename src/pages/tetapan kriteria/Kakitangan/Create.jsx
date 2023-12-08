import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateKakitangan() {
  // ----------FE----------
  const [showCreateKakitangan, setShowCreateKakitangan] = useState(false);

  const handleCloseCreateKakitangan = () => setShowCreateKakitangan(false);
  const handleShowCreateKakitangan = () => setShowCreateKakitangan(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // Form input
  const [kakitanganInput, setKakitanganInput] = useState({
    namaKakitangan: "",
    idKakitangan: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKakitanganInput({
      ...kakitanganInput,
      [name]: value,
    });
  };

  // ----------BE----------
  // Create kakitangan
  const createKakitangan = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/kakitangan`,
        kakitanganInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.message, // Access the message from the backend response
        });
        console.log("Kakitangan berjaya ditambah");
        handleCloseCreateKakitangan();
      }
    } catch (error) {
      console.log("Api respond is not as expected");
    }
  };

  const onSubmit = (data) => {
    handleCloseCreateKakitangan();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Button className="tambahBtn" onClick={handleShowCreateKakitangan}>
        Tambah Kakitangan
      </Button>

      <Modal
        show={showCreateKakitangan}
        onHide={handleCloseCreateKakitangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kakitangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Kakitangan</Form.Label>
              <Controller
                name="namaKakitangan"
                control={control}
                rules={{ required: "Nama Kakitangan diperlukan" }}
                render={({ field }) => (
                  <>
                    <FormControl
                      type="text"
                      id="namaKakitangan"
                      name="namaKakitangan"
                      onChange={(e) => {
                        handleInputChange(e);
                        field.onChange(e);
                      }}
                      placeholder="Nama Kakitangan Baharu"
                    />
                    {errors?.namaKakitangan && (
                      <span className="error-message">
                        {errors.namaKakitangan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>ID Kakitangan</Form.Label>
              <Controller
                name="idKakitangan"
                control={control}
                rules={{ required: "ID Kakitangan diperlukan" }}
                render={({ field }) => (
                  <>
                    <FormControl
                      type="text"
                      id="idKakitangan"
                      name="idKakitangan"
                      onChange={(e) => {
                        handleInputChange(e);
                        field.onChange(e);
                      }}
                      placeholder="ID Kakitangan"
                    />
                    {errors?.idKakitangan && (
                      <span className="error-message">
                        {errors.idKakitangan.message}
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
            Tambah Kakitangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateKakitangan;
