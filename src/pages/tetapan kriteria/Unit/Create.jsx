import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateUnit() {
  // ----------FE----------
  const [showCreateUnit, setShowCreateUnit] = useState(false);

  const handleCloseCreateUnit = () => setShowCreateUnit(false);
  const handleShowCreateUnit = () => setShowCreateUnit(true);

  // Form validation
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  // Form input
  const [bahagianData, setBahagianData] = useState([]);
  const [jabatanData, setJabatanData] = useState([]);
  const [unitInput, setUnitInput] = useState({
    bahagianId: "",
    jabatanId: "",
    namaUnit: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUnitInput({
      ...unitInput,
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

  // Fetch jabatan data
  useEffect(() => {
    const fetchJabatanData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/tetapan-kriteria/jabatan/display-jabatan"
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setJabatanData(response.data); // Set all bahagian data
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching Skop Kriteria data:", error);
      }
    };

    fetchJabatanData();
  }, []);

  // Create unit
  const createUnit = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/unit`,
        unitInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.message, // Access the message from the backend response
        });
        console.log("Unit berjaya ditambah");
        handleCloseCreateUnit();
      }
    } catch (error) {
      console.log("Api respond is not as expected");
    }
  };

  const onSubmit = (data) => {
    handleCloseCreateUnit();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Button className="tambahBtn" onClick={handleShowCreateUnit}>
        Tambah Unit
      </Button>

      <Modal
        show={showCreateUnit}
        onHide={handleCloseCreateUnit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Unit</Modal.Title>
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
                        handleInputChange(e);
                      }}
                      {...field}
                    >
                      <option value="" disabled>
                        Pilih Bahagian
                      </option>
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
              <Form.Label>Jabatan</Form.Label>
              <Controller
                name="jabatan"
                control={control}
                rules={{ required: "Sila pilih jabatan" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="jabatanSelect"
                      onChange={(e) => {
                        setValue("jabatan", e.target.value);
                        handleInputChange(e);
                      }}
                      {...field}
                    >
                      <option value="" disabled>
                        Pilih Jabatan
                      </option>
                      {jabatanData.map((jabatan) => (
                        <option key={jabatan.id} value={jabatan.id}>
                          {jabatan.namaJabatan}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.jabatan && (
                      <span className="error-message">
                        {errors.jabatan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Unit</Form.Label>
              <Controller
                name="unit"
                control={control}
                rules={{ required: "Nama unit baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <FormControl
                      type="text"
                      id="namaUnit"
                      name="namaUnit"
                      onChange={(e) => {
                        setValue("unit", e.target.value);
                        handleInputChange(e);
                      }}
                      placeholder="Nama unit"
                    />
                    {errors?.unit && (
                      <span className="error-message">
                        {errors.unit.message}
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
            Tambah Unit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateUnit;
