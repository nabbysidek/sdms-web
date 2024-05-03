import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function ModalAllowAccess({ disableButtonBenar, userId }) {
  // -------------------- FE ---------------------------
  const [showModalAllowAccess, setShowModalAllowAccess] = useState(false);

  const handleCloseModalAllowAccess = () => setShowModalAllowAccess(false);
  const handleShowModalAllowAccess = () => setShowModalAllowAccess(true);

  // Form validation
  const { handleSubmit, formState } = useForm();
  const { errors } = formState;

  // -------------------- BE ---------------------------
  // Handle update benar permohonan akses
  const updateBenarPermohonanAkses = async () => {
    try {
      const response = await axiosCustom.put(
        `http://127.0.0.1:8000/api/tetapan-pengguna/permohonan-akses/benar-akses/${userId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });

        handleCloseModalAllowAccess();
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: response.data.error, // Access the message from the backend response
        });
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
    <>
      <Button
        className="allow-btn"
        onClick={handleShowModalAllowAccess}
        disabled={disableButtonBenar}
      >
        Benar Akses
      </Button>

      <Modal
        show={showModalAllowAccess}
        onHide={handleCloseModalAllowAccess}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Benarkan Akses?</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            Adakah anda pasti ingin memberi akses kepada pengguna ini?
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-secondary"
              onClick={handleCloseModalAllowAccess}
            >
              Tutup
            </Button>
            <Button
              className="btn-primary"
              onClick={handleSubmit(updateBenarPermohonanAkses)}
            >
              Benar Akses
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalAllowAccess;
