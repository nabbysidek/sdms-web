import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateJabatan() {
  // ----------FE----------
  const [showCreateJabatan, setShowCreateJabatan] = useState(false);

  const handleCloseCreateJabatan = () => setShowCreateJabatan(false);
  const handleShowCreateJabatan = () => setShowCreateJabatan(true);

  // Form validation
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  // Form input
  const [bahagianData, setBahagianData] = useState([]);
  const [jabatanInput, setJabatanInput] = useState({
    bahagianId: "",
    namaJabatan: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJabatanInput({
      ...jabatanInput,
      [name]: value,
    });
  };

  // ----------BE----------
  // Fetch bahagian data
  useEffect(() => {
    const fetchBahagianData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/tetapan-kriteria/bahagian/display-bahagian"
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setBahagianData(response.data); // Set all bahagian data
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching Skop Kriteria data:", error);
      }
    };

    fetchBahagianData();
  }, []);

  // Create jabatan
  const createJabatan = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/jabatan`,
        jabatanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.message, // Access the message from the backend response
        });
        console.log("Jabatan berjaya ditambah");
        handleCloseCreateJabatan();
      }
    } catch (error) {
      console.log("Api respond is not as expected");
    }
  };

  const onSubmit = (data) => {
    if (data.bahagian && data.jabatan) {
      createJabatan();
    }
  };

  return (
    <div>
      <Button className="tambahBtn" onClick={handleShowCreateJabatan}>
        Tambah Jabatan
      </Button>

      <Modal
        show={showCreateJabatan}
        onHide={handleCloseCreateJabatan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Jabatan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Bahagian</Form.Label>
              <Controller
                name="bahagian"
                control={control}
                rules={{ required: "Sila pilih bahagian" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="bahagianSelect"
                      onChange={(e) => {
                        setValue("bahagian", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Bahagian</option>
                      {bahagianData.map((bahagian) => (
                        <option key={bahagian.id} value={bahagian.id}>
                          {bahagian.namaBahagian}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.bahagian && (
                      <span className="error-message">
                        {errors.bahagian.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Jabatan</Form.Label>
              <Controller
                name="jabatan"
                control={control}
                rules={{ required: "Nama jabatan baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Nama jabatan"
                      {...field}
                    />
                    {errors?.jabatan && (
                      <span className="error-message">
                        {errors.jabatan.message}
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
            Tambah Jabatan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJabatan;
