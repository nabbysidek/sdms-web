import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import axiosCustom from "./../../../axios";
import Swal from "sweetalert2";

function CreateAktivitiSemakan({skopKriteriaOptions}) {
  // ----------------- FE -----------------
  // Manage modal visibility
  const [showCreateAktivitiSemakan, setShowCreateAktivitiSemakan] =
    useState(false);

  const handleShowCreateAktivitiSemakan = () => setShowCreateAktivitiSemakan(true);
  const handleCloseCreateAktivitiSemakan = () => {
    setShowCreateAktivitiSemakan(false);
    reset();
  };

  // Form submission and validation
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
          `tetapan-kriteria/skop-kriteria/display-skop-kriteria`
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setSkopKriteriaData(response.data);
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching Skop Kriteria data:", error);
      }
    };

    fetchSkopKriteriaData();
  }, []);

  // Create new aktiviti semakan
  const CreateAktivitiSemakan = async (aktivitiSemakanInput) => {
    try {
      const response = await axiosCustom.post(
        `tetapan-kriteria/aktiviti-semakan`,
        aktivitiSemakanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Aktiviti semakan berjaya ditambah");
        handleCloseCreateAktivitiSemakan();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.error, // Access the message from the backend response
    });
    }
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateAktivitiSemakan}>
        Tambah
      </Button>

      <Modal
        show={showCreateAktivitiSemakan}
        onHide={handleCloseCreateAktivitiSemakan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Aktiviti Semakan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(CreateAktivitiSemakan)} onReset={reset}>
            <Form.Group>
              <Form.Label>Skop Kriteria</Form.Label>
              <Controller
                id="skopKriteriaId"
                name="skopKriteriaId"
                control={control}
                rules={{ required: "Sila pilih skop kriteria" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select onChange={onChange} value={value}>
                      <option value="">
                        Pilih Skop Kriteria
                      </option>
                      {skopKriteriaOptions.map((skopKriteria) => (
                        <option key={skopKriteria.value} value={skopKriteria.value}>
                          {skopKriteria.label}
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
              <Form.Label>Nama Aktiviti Semakan</Form.Label>
              <Controller
                id="namaAktivitiSemakan"
                name="namaAktivitiSemakan"
                control={control}
                defaultValue=""
                rules={{ required: "Aktiviti semakan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan aktiviti semakan"
                    autoFocus
                  />
                )}
              />
              {errors.namaAktivitiSemakan && (
                <span className="error-message">
                  {errors.namaAktivitiSemakan.message}
                </span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="create-new-modal-btn"
            onClick={handleSubmit(CreateAktivitiSemakan)}
          >
            Tambah Aktiviti Semakan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateAktivitiSemakan;
