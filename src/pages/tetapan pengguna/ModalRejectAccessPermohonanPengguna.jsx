import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function ModalRejectAccessPermohonanPengguna({ userId }) {
  // -------------------- FE ---------------------------
  const [showModalRejectAccess, setShowModalRejectAccess] = useState(false);

  const handleCloseModalRejectAccess = () => setShowModalRejectAccess(false);
  const handleShowModalRejectAccess = () => setShowModalRejectAccess(true);

  // Form validation
  const { handleSubmit, formState } = useForm();
  const { errors } = formState;

  // -------------------- BE ---------------------------
  // Handle update tolak permohonan akses
  const updateTolakPermohonanAkses = async () => {
    try {
      const response = await axiosCustom.put(
        `tetapan-pengguna/permohonan-akses/tolak-akses/${userId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });

        handleCloseModalRejectAccess();
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
      <Button className="delete-btn" onClick={handleShowModalRejectAccess}>
        Tolak Akses
      </Button>

      <Modal
        show={showModalRejectAccess}
        onHide={handleCloseModalRejectAccess}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tolak Permintaan Akses?</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            Adakah anda pasti ingin menolak permintaan akses pengguna ini?
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-secondary"
              onClick={handleCloseModalRejectAccess}
            >
              Batal
            </Button>
            <Button
              className="btn-primary"
              onClick={handleSubmit(updateTolakPermohonanAkses)}
            >
              Tolak Akses
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalRejectAccessPermohonanPengguna;
