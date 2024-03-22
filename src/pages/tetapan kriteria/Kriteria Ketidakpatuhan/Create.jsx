import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function CreateKriteriaKetidakpatuhan() {
  // ----------FE----------
  // Manage the visibility of the modal
  const [showCreateKriteria, setShowCreateKriteria] = useState(false);

  const handleShowCreateKriteria = () => setShowCreateKriteria(true);
  const handleCloseCreateKriteria = () => {
    setShowCreateKriteria(false);
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
  // Fetch skop kriteria data
  const [skopKriteriaData, setSkopKriteriaData] = useState([]);
  useEffect(() => {
    const fetchSkopKriteriaData = async () => {
      try {
        const response = await axiosCustom.get(
          "http://127.0.0.1:8000/api/tetapan-kriteria/skop-kriteria/display-skop-kriteria"
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setSkopKriteriaData(response.data); // Set all skop kriteria data
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching Skop Kriteria data:", error);
      }
    };

    fetchSkopKriteriaData();
  }, []);

  // Create kriteria ketidakpatuhan
  const createKriteriaKetidakpatuhan = async (kriteriaKetidakpatuhanInput) => {
    console.log(kriteriaKetidakpatuhanInput);
    try {
      const response = await axiosCustom.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/kriteria-ketidakpatuhan`,
        kriteriaKetidakpatuhanInput
      );
      console.log(kriteriaKetidakpatuhanInput);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Kriteria ketidakpatuhan berjaya ditambah");
        handleCloseCreateKriteria();
      }
    } catch (error) {
      console.log("Kriteria ketidakpatuhan tidak berjaya ditambah");
    }
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateKriteria}>
        Tambah Kesalahan
      </Button>

      <Modal
        show={showCreateKriteria}
        onHide={handleCloseCreateKriteria}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kriteria Ketidakpatuhan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit(createKriteriaKetidakpatuhan)}
            onReset={reset}
          >
            <Form.Group>
              <Form.Label>Skop Kriteria</Form.Label>
              <Controller
                id="skopKriteriaId"
                name="skopKriteriaId"
                defaultValue=""
                control={control}
                rules={{ required: "Sila pilih skop kriteria" }}
                render={({ field: { onChange } }) => (
                  <>
                    <Form.Select onChange={onChange} defaultValue="">
                      <option value="" disabled>
                        Pilih Skop Kriteria
                      </option>
                      {skopKriteriaData.map((skopKriteria) => (
                        <option key={skopKriteria.id} value={skopKriteria.id}>
                          {skopKriteria.namaSkopKriteria}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.skopKriteriaId && (
                      <span className="error-message">
                        {errors.skopKriteriaId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Kod Kriteria Ketidakpatuhan</Form.Label>
              <Controller
                id="kodKriteriaKetidakpatuhan"
                name="kodKriteriaKetidakpatuhan"
                control={control}
                rules={{
                  required: "Kod kriteria ketidakpatuhan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan kod kriteria ketidakpatuhan"
                      autoFocus
                    />
                    {errors.kodKriteriaKetidakpatuhan && (
                      <span className="error-message">
                        {errors.kodKriteriaKetidakpatuhan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Kriteria Ketidakpatuhan</Form.Label>
              <Controller
                id="namaKriteriaKetidakpatuhan"
                name="namaKriteriaKetidakpatuhan"
                control={control}
                defaultValue=""
                rules={{
                  required: "Nama kriteria ketidakpatuhan baru diperlukan",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Masukkan kriteria ketidakpatuhan"
                      autoFocus
                    />
                    {errors.namaKriteriaKetidakpatuhan && (
                      <span className="error-message">
                        {errors.namaKriteriaKetidakpatuhan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="create-new-modal-btn"
            onClick={handleSubmit(createKriteriaKetidakpatuhan)}
          >
            Tambah Kriteria Ketidakpatuhan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateKriteriaKetidakpatuhan;
