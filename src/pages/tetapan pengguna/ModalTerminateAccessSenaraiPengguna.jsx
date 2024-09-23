import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function ModalTerminateAccessSenaraiPengguna({ disableButtonSekat, userId }) {
  const [showModalTerminateAccessSenaraiPengguna, setShowModalTerminateAccessSenaraiPengguna] =
    useState(false);

  const handleCloseModalTerminateAccessSenaraiPengguna = () =>
    setShowModalTerminateAccessSenaraiPengguna(false);
  const handleShowModalTerminateAccessSenaraiPengguna = () =>
    setShowModalTerminateAccessSenaraiPengguna(true);

    // Form validation
    const { handleSubmit, formState } = useForm();
    const { errors } = formState;

    // -------------------- BE ---------------------------
    // Handle update tamatkan akses
  const updateTamatkanAkses = async () => {
    try {
      const response = await axiosCustom.put(
        `tetapan-pengguna/senarai-pengguna/sekat-akses/${userId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });

        handleCloseModalTerminateAccessSenaraiPengguna();
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
        className="delete-btn"
        onClick={handleShowModalTerminateAccessSenaraiPengguna}
        disabled={disableButtonSekat}
      >
        Sekat Akses
      </Button>

      <Modal
        show={showModalTerminateAccessSenaraiPengguna}
        onHide={handleCloseModalTerminateAccessSenaraiPengguna}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tamatkan Akses Pengguna?</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            Adakah anda pasti ingin menamatkan akses pengguna ini?
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-secondary"
              onClick={handleCloseModalTerminateAccessSenaraiPengguna}
            >
              Batal
            </Button>
            <Button
              className="btn-primary"
              onClick={handleSubmit(updateTamatkanAkses)}
            >
              Tamatkan Akses
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalTerminateAccessSenaraiPengguna;
