import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function ModalAllowAccessSenaraiPengguna({
  disableButtonBenar,
  userId,
  refetchSenaraiPengguna,
}) {
  // -------------------- FE ---------------------------
  const [
    showModalAllowAccessSenaraiPengguna,
    setShowModalAllowAccessSenaraiPengguna,
  ] = useState(false);

  const handleCloseModalAllowAccessSenaraiPengguna = () =>
    setShowModalAllowAccessSenaraiPengguna(false);
  const handleShowModalAllowAccessSenaraiPengguna = () =>
    setShowModalAllowAccessSenaraiPengguna(true);

  // Form validation
  const { handleSubmit, formState } = useForm();
  const { errors } = formState;

  // -------------------- BE ---------------------------
  // Handle update benar permohonan akses
  const updateBenarPermohonanAksesSenaraiPengguna = async () => {
    try {
      const response = await axiosCustom.put(
        `tetapan-pengguna/senarai-pengguna/benar-akses/${userId}`
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

        handleCloseModalAllowAccessSenaraiPengguna();
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
        className="allow-btn"
        onClick={handleShowModalAllowAccessSenaraiPengguna}
        disabled={disableButtonBenar}
      >
        Restore Access
      </Button>

      <Modal
        show={showModalAllowAccessSenaraiPengguna}
        onHide={handleCloseModalAllowAccessSenaraiPengguna}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Restore Access?</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            Are you sure you'd like to restore this auditor's access?
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-secondary"
              onClick={handleCloseModalAllowAccessSenaraiPengguna}
            >
              Cancel
            </Button>
            <Button
              className="btn-primary"
              onClick={handleSubmit(updateBenarPermohonanAksesSenaraiPengguna)}
            >
              Restore Access
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalAllowAccessSenaraiPengguna;
