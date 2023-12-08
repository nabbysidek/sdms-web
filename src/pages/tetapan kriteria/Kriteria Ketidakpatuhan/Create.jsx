import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
// import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import Swal from "sweetalert2";

function CreateKriteriaKetidakpatuhan() {
  // ----------FE----------
  // Manage the visibility of the modal
  const [showCreateKriteria, setShowCreateKriteria] = useState(false);

  const handleCloseCreateKriteria = () => setShowCreateKriteria(false);
  const handleShowCreateKriteria = () => setShowCreateKriteria(true);

  // Form validation
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  // Form input
  const [skopKriteriaData, setSkopKriteriaData] = useState([]);
  const [kriteriaKetidakpatuhanInput, setkriteriaKetidakpatuhanInput] =
    useState({
      skopKriteriaId: "",
      kodKriteriaKetidakpatuhan: "",
      namaKriteriaKetidakpatuhan: "",
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setkriteriaKetidakpatuhanInput({
      ...kriteriaKetidakpatuhanInput,
      [name]: value,
    });
  };

  // const [skopKriteriaData, setSkopKriteriaData] = useState([]);
  // const [kriteriaKetidakpatuhanInput, setkriteriaKetidakpatuhanInput] =
  //   useState({
  //     skopKriteriaId: "",
  //     kodKriteriaKetidakpatuhan: "",
  //     namaKriteriaKetidakpatuhan: "",
  //   });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setkriteriaKetidakpatuhanInput({
  //     ...kriteriaKetidakpatuhanInput,
  //     [name]: value,
  //   });
  // };

  // ----------BE----------
  // Fetch skop kriteria data
  useEffect(() => {
    const fetchSkopKriteriaData = async () => {
      try {
        const response = await axios.get(
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

  // useEffect(() => {
  //   const fetchSkopKriteriaData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://127.0.0.1:8000/api/tetapan-kriteria/skop-kriteria/display-skop-kriteria"
  //       );
  //       if (Array.isArray(response.data) && response.data.length > 0) {
  //         setSkopKriteriaData(response.data); // Set all skop kriteria data
  //       } else {
  //         console.error("Response data is not as expected:", response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error while fetching Skop Kriteria data:", error);
  //     }
  //   };

  //   fetchSkopKriteriaData();
  // }, []);

  // Create kriteria ketidakpatuhan
  const createKriteriaKetidakpatuhan = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/kriteria-ketidakpatuhan`,
        kriteriaKetidakpatuhanInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.message, // Access the message from the backend response
        });
        console.log("Kriteria ketidakpatuhan berjaya ditambah");
        handleCloseCreateKriteria();
      }
    } catch (error) {
      console.log("Api respond is not as expected");
    }
  };

  const onSubmit = (data) => {
    if (
      data.skopKriteriaId &&
      data.kodKriteriaKetidakpatuhan &&
      data.namaKriteriaKetidakpatuhan
    ) {
      createKriteriaKetidakpatuhan();
    }
  };

  // const createKriteriaKetidakpatuhan = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://127.0.0.1:8000/api/tetapan-kriteria/kriteria-ketidakpatuhan`,
  //       kriteriaKetidakpatuhanInput
  //     );

  //     if (response.status === 200) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Berjaya",
  //         text: response.data.message, // Access the message from the backend response
  //       });
  //       console.log("Kriteria ketidakpatuhan berjaya ditambah");
  //       handleCloseCreateKriteria();
  //     }
  //   } catch (error) {
  //     console.log("Api respond is not as expected");
  //   }
  // };

  return (
    <div>
      <Button className="tambahBtn" onClick={handleShowCreateKriteria}>
        Tambah Kriteria Ketidakpatuhan
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
          <Form>
            <Form.Group>
              <Form.Label>Skop Kriteria</Form.Label>
              <Controller
                name="skopKriteriaId"
                control={control}
                rules={{ required: "Sila pilih skop kriteria" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="skopKriteriaSelect"
                      onChange={(e) => {
                        setValue("skopKriteria", e.target.value);
                        handleInputChange(e);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Skop Kriteria</option>
                      {skopKriteriaData.map((skopKriteria) => (
                        <option key={skopKriteria.id} value={skopKriteria.id}>
                          {skopKriteria.namaSkopKriteria}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.skopKriteria && (
                      <span className="error-message">
                        {errors.skopKriteria.message}
                      </span>
                    )}
                  </>
                )}
              />
              {/* <Form.Select
                name="skopKriteriaId"
                value={kriteriaKetidakpatuhanInput.skopKriteriaId}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled>
                  Pilih Skop Kriteria
                </option>
                {skopKriteriaData.map((skopKriteria) => (
                  <option key={skopKriteria.id} value={skopKriteria.id}>
                    {skopKriteria.namaSkopKriteria}
                  </option>
                ))}
              </Form.Select> */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Kod Kriteria Ketidakpatuhan</Form.Label>
              <Controller
                name="kodKriteriaKetidakpatuhan"
                control={control}
                rules={{
                  required: "Kod kriteria ketidakpatuhan baru diperlukan",
                }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Kod kriteria ketidakpatuhan"
                      {...field}
                      onChange={(e) => handleInputChange(e)}
                    />
                    {errors?.kodKriteriaKetidakpatuhan && (
                      <span className="error-message">
                        {errors.kodKriteriaKetidakpatuhan.message}
                      </span>
                    )}
                  </>
                )}
              />
              {/* <FormControl
                type="text"
                id="kodKriteriaKetidakpatuhan"
                name="kodKriteriaKetidakpatuhan"
                onChange={(e) => handleInputChange(e)}
                placeholder="Kod Kriteria Ketidakpatuhan Baharu"
              /> */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Kriteria Ketidakpatuhan</Form.Label>
              <Controller
                name="namaKriteriaKetidakpatuhan"
                control={control}
                rules={{
                  required: "Nama kriteria ketidakpatuhan baru diperlukan",
                }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Nama kriteria ketidakpatuhan"
                      {...field}
                      onChange={(e) => handleInputChange(e)}
                    />
                    {errors?.namaKriteriaKetidakpatuhan && (
                      <span className="error-message">
                        {errors.namaKriteriaKetidakpatuhan.message}
                      </span>
                    )}
                  </>
                )}
              />
              {/* <FormControl
                type="text"
                id="namaKriteriaKetidakpatuhan"
                name="namaKriteriaKetidakpatuhan"
                onChange={(e) => handleInputChange(e)}
                placeholder="Nama Kriteria Ketidakpatuhan"
              /> */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={handleSubmit(onSubmit)}>
            Tambah Kriteria Ketidakpatuhan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateKriteriaKetidakpatuhan;
