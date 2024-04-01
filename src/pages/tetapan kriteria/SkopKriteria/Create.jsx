import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function CreateSkopKriteria() {
  // ----------FE----------
  const [showCreateSkopKriteria, setShowCreateSkopKriteria] = useState(false);

  const handleShowCreateSkopKriteria = () => setShowCreateSkopKriteria(true);
  const handleCloseCreateSkopKriteria = () => {
    setShowCreateSkopKriteria(false);
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
  // Fetch skop semakan data
  const [skopSemakanData, setSkopSemakanData] = useState([]);

  useEffect(() => {
    const fetchSkopSemakanData = async () => {
      try {
        const response = await axiosCustom.get(
          "http://127.0.0.1:8000/api/tetapan-kriteria/skop-semakan/display-skop-semakan"
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setSkopSemakanData(response.data);
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching skop semakan data:", error);
      }
    };

    fetchSkopSemakanData();
  }, []);

  // Create skop kriteria
  const createSkopKriteria = async (skopKriteriaInput) => {
    try {
      const response = await axiosCustom.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/skop-kriteria`,
        skopKriteriaInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Skop kriteria berjaya ditambah");
        handleCloseCreateSkopKriteria();
      }
    } catch (error) {
      console.log("Skop kriteria tidak berjaya ditambah");
    }
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateSkopKriteria}>
        Tambah Skop Kriteria Ketidakpatuhan
      </Button>

      <Modal
        show={showCreateSkopKriteria}
        onHide={handleCloseCreateSkopKriteria}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Skop Kriteria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(createSkopKriteria)} onReset={reset}>
          <Form.Group>
              <Form.Label>Skop Semakan</Form.Label>
              <Controller
                id="skopSemakanId"
                name="skopSemakanId"
                defaultValue=""
                control={control}
                rules={{ required: "Sila pilih skop semakan" }}
                render={({ field: { onChange } }) => (
                  <>
                    <Form.Select onChange={onChange} defaultValue="">
                      <option value="" disabled>
                        Pilih Skop Semakan
                      </option>
                      {skopSemakanData.map((skopSemakan) => (
                        <option key={skopSemakan.id} value={skopSemakan.id}>
                          {skopSemakan.namaSkopSemakan}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.skopSemakanId && (
                      <span className="error-message">
                        {errors.skopSemakanId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nama Skop Kriteria</Form.Label>
              <Controller
                name="namaSkopKriteria"
                id="namaSkopKriteria"
                control={control}
                defaultValue=""
                rules={{ required: "Skop kriteria baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan skop kriteria"
                    autoFocus
                  />
                )}
              />
              {errors.namaSkopKriteria && (
                <span className="error-message">
                  {errors.namaSkopKriteria.message}
                </span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="create-new-modal-btn"
            onClick={handleSubmit(createSkopKriteria)}
          >
            Tambah Skop Kriteria
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateSkopKriteria;
