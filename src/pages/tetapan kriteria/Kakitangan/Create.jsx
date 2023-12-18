import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateKakitangan() {
  // ----------FE----------
  const [showCreateKakitangan, setShowCreateKakitangan] = useState(false);

  const handleShowCreateKakitangan = () => setShowCreateKakitangan(true);
  const handleCloseCreateKakitangan = () => {
    setShowCreateKakitangan(false);
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
  // Fetch wilayah
  const [wilayahData, setWilayahData] = useState([]);
  useEffect(() => {
    const fetchwilayahData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/tetapan-kriteria/wilayah/display-wilayah"
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setWilayahData(response.data); // Set all wilayah data
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching Wilayah data:", error);
      }
    };
    fetchwilayahData();
  }, []);

  // Fetch cawangan
  const [cawanganData, setCawanganData] = useState([]);
  useEffect(() => {
    const fetchCawanganData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/tetapan-kriteria/cawangan/display-cawangan"
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setCawanganData(response.data); // Set all wilayah data
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching Cawangan data:", error);
      }
    };
    fetchCawanganData();
  }, []);

  // Fetch bahagian
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
        console.error("Error while fetching Bahagian data:", error);
      }
    };
    fetchBahagianData();
  }, []);

  // Fetch jabatan
  const [jabatanData, setJabatanData] = useState([]);
  useEffect(() => {
    const fetchJabatanData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/tetapan-kriteria/jabatan/display-jabatan"
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setJabatanData(response.data); // Set all jabatan data
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching Jabatan data:", error);
      }
    };
    fetchJabatanData();
  }, []);

  // Fetch unit
  const [unitData, setUnitData] = useState([]);
  useEffect(() => {
    const fetchUnitData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/tetapan-kriteria/unit/display-unit"
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setUnitData(response.data); // Set all unit data
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching Unit data:", error);
      }
    };
    fetchUnitData();
  }, []);

  // Create kakitangan
  const createKakitangan = async (kakitanganInput) => {
    console.log(kakitanganInput);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/kakitangan`,
        kakitanganInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Kakitangan berjaya ditambah");
        handleCloseCreateKakitangan();
      }
    } catch (error) {
      console.log("Api respond is not as expected");
      console.log(error);
    }
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
          <Form onSubmit={handleSubmit(createKakitangan)} onReset={reset}>
            <Form.Group>
              <Form.Label>Wilayah</Form.Label>
              <Controller
                id="wilayahId"
                name="wilayahId"
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
              <Form.Label>Cawangan</Form.Label>
              <Controller
                id="cawanganId"
                name="cawanganId"
                control={control}
                rules={{ required: "Sila pilih cawangan" }}
                render={({ field: { onChange } }) => (
                  <>
                    <Form.Select onChange={onChange} defaultValue="">
                      <option value="" disabled>
                        Pilih Cawangan
                      </option>
                      {cawanganData.map((cawangan) => (
                        <option key={cawangan.id} value={cawangan.id}>
                          {cawangan.namaCawangan}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.cawanganId && (
                      <span className="error-message">
                        {errors.cawanganId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Bahagian</Form.Label>
              <Controller
                id="bahagianId"
                name="bahagianId"
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
              <Form.Label>Unit</Form.Label>
              <Controller
                id="unitId"
                name="unitId"
                control={control}
                rules={{ required: "Sila pilih unit" }}
                render={({ field: { onChange } }) => (
                  <>
                    <Form.Select onChange={onChange} defaultValue="">
                      <option value="" disabled>
                        Pilih Unit
                      </option>
                      {unitData.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.namaUnit}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.unitId && (
                      <span className="error-message">
                        {errors.unitId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Kakitangan</Form.Label>
              <Controller
                id="namaKakitangan"
                name="namaKakitangan"
                control={control}
                defaultValue=""
                rules={{
                  required: "Nama kakitangan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan kakitangan"
                      autoFocus
                    />
                    {errors.namaKakitangan && (
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
                id="idKakitangan"
                name="idKakitangan"
                control={control}
                defaultValue=""
                rules={{
                  required: "ID kakitangan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan ID kakitangan"
                      autoFocus
                    />
                    {errors.idKakitangan && (
                      <span className="error-message">
                        {errors.idKakitangan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Jawatan Kakitangan</Form.Label>
              <Controller
                id="jawatanKakitangan"
                name="jawatanKakitangan"
                control={control}
                defaultValue=""
                rules={{
                  required: "Jawatan kakitangan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan jawatan kakitangan"
                      autoFocus
                    />
                    {errors.jawatanKakitangan && (
                      <span className="error-message">
                        {errors.jawatanKakitangan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={handleSubmit(createKakitangan)}>
            Tambah Kakitangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateKakitangan;
