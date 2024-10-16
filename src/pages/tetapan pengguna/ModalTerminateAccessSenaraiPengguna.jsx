import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function ModalTerminateAccessSenaraiPengguna({
  disableButtonSekat,
  userId,
  refetchSenaraiPengguna,
}) {
  const [
    showModalTerminateAccessSenaraiPengguna,
    setShowModalTerminateAccessSenaraiPengguna,
  ] = useState(false);

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
          title: "Success",
          text: response.data.success, // Access the message from the backend response
        });

        // Refetch permohonan akses after success
        if (refetchSenaraiPengguna) {
          refetchSenaraiPengguna();
        }

        handleCloseModalTerminateAccessSenaraiPengguna();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.error, // Access the message from the backend response
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
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
        Block Access
      </Button>

      <Modal
        show={showModalTerminateAccessSenaraiPengguna}
        onHide={handleCloseModalTerminateAccessSenaraiPengguna}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Block Access?</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            Are you sure you want to block this auditor's access?
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-secondary"
              onClick={handleCloseModalTerminateAccessSenaraiPengguna}
            >
              Cancel
            </Button>
            <Button
              className="btn-primary"
              onClick={handleSubmit(updateTamatkanAkses)}
            >
              Block Access
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalTerminateAccessSenaraiPengguna;
