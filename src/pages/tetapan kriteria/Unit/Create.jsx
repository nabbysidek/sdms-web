import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateUnit() {
  // ----------FE----------
  const [showCreateUnit, setShowCreateUnit] = useState(false);

  const handleShowCreateUnit = () => setShowCreateUnit(true);
  const handleCloseCreateUnit = () => {
    setShowCreateUnit(false);
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
  // const [bahagianData, setBahagianData] = useState([]);
  // const [jabatanData, setJabatanData] = useState([]);
  // const [unitInput, setUnitInput] = useState({
  //   bahagianId: "",
  //   jabatanId: "",
  //   namaUnit: "",
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setUnitInput({
  //     ...unitInput,
  //     [name]: value,
  //   });
  // };

  // ----------BE----------
  // Fetch bahagian data
  const [bahagianData, setBahagianData] = useState([]);
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
  const [jabatanData, setJabatanData] = useState([]);
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
  const createUnit = async (unitInput) => {
    console.log(unitInput);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/unit`,
        unitInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        handleCloseCreateUnit();
      }
    } catch (error) {
      console.log("Unit tidak berjaya ditambah");
    }
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
          <Form onSubmit={handleSubmit(createUnit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Bahagian</Form.Label>
              <Controller
                id="bahagianId"
                name="bahagianId"
                defaultValue=""
                control={control}
                rules={{ required: "Sila pilih bahagian" }}
                render={({ field: { onChange } }) => (
                  <>
                    <Form.Select onChange={onChange} defaultValue="">
                      <option value="" disabled>
                        Pilih Bahagian
                      </option>
                      {bahagianData.map((bahagian) => (
                        <option key={bahagian.id} value={bahagian.id}>
                          {bahagian.namaBahagian}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.bahagianId && (
                      <span className="error-message">
                        {errors.bahagianId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Jabatan</Form.Label>
              <Controller
                id="jabatanId"
                name="jabatanId"
                defaultValue=""
                control={control}
                rules={{ required: "Sila pilih jabatan" }}
                render={({ field: { onChange } }) => (
                  <>
                    <Form.Select onChange={onChange} defaultValue="">
                      <option value="" disabled>
                        Pilih Jabatan
                      </option>
                      {jabatanData.map((jabatan) => (
                        <option key={jabatan.id} value={jabatan.id}>
                          {jabatan.namaJabatan}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.jabatanId && (
                      <span className="error-message">
                        {errors.jabatanId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Unit</Form.Label>
              <Controller
                id="namaUnit"
                name="namaUnit"
                control={control}
                defaultValue=""
                rules={{ required: "Nama unit baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <FormControl
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan unit"
                      autoFocus
                    />
                    {errors.namaUnit && (
                      <span className="error-message">
                        {errors.namaUnit.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={handleSubmit(createUnit)}>
            Tambah Unit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateUnit;
