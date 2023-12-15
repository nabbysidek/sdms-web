import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateCawangan() {
  // ----------FE----------
  const [showCreateCawangan, setShowCreateCawangan] = useState(false);

  const handleShowCreateCawangan = () => setShowCreateCawangan(true);
  const handleCloseCreateCawangan = () => {
    setShowCreateCawangan(false);
    reset();
  };

  // Form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // ----------BE----------
  // Fetch wilayah data
  const [wilayahData, setWilayahData] = useState([]);
  useEffect(() => {
    const fetchWilayahData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/tetapan-kriteria/wilayah/display-wilayah"
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setWilayahData(response.data); // Display all wilayah data
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching wilayah data:", error);
      }
    };

    fetchWilayahData();
  }, []);

  // Create cawangan
  const createCawangan = async (cawanganInput) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/cawangan`,
        cawanganInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.message, // Access the message from the backend response
        });
        console.log("Kriteria ketidakpatuhan berjaya ditambah");
        handleCloseCreateCawangan();
      }
    } catch (error) {
      console.log("Kriteria ketidakpatuhan tidak berjaya ditambah");
    }
  };

  return (
    <div>
      <Button className="tambahBtn" onClick={handleShowCreateCawangan}>
        Tambah Cawangan
      </Button>

      <Modal
        show={showCreateCawangan}
        onHide={handleCloseCreateCawangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Cawangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(createCawangan)} onReset={reset}>
            <Form.Group>
              <Form.Label>Wilayah</Form.Label>
              <Controller
                id="wilayahId"
                name="wilayahId"
                defaultValue=""
                control={control}
                rules={{ required: "Sila pilih wilayah" }}
                render={({ field: { onChange } }) => (
                  <>
                    <Form.Select onChange={onChange} defaultValue="">
                      <option value="" disabled>
                        Pilih Wilayah
                      </option>
                      {wilayahData.map((wilayah) => (
                        <option key={wilayah.id} value={wilayah.id}>
                          {wilayah.namaWilayah}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.wilayahId && (
                      <span className="error-message">
                        {errors.wilayahId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Cawangan</Form.Label>
              <Controller
                id="namaCawangan"
                name="namaCawangan"
                control={control}
                defaultValue=""
                rules={{
                  required: "Nama cawangan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan cawangan"
                      autoFocus
                    />
                    {errors.namaCawangan && (
                      <span className="error-message">
                        {errors.namaCawangan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={handleSubmit(createCawangan)}>
            Tambah Cawangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateCawangan;
