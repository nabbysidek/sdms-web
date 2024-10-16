import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function ModalAllowAccessPermohonanPengguna({
  disableButtonBenar,
  userId,
  refetchPermohonanAkses,
  refetchSenaraiPengguna,
}) {
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
        `tetapan-pengguna/permohonan-akses/benar-akses/${userId}`
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success, // Access the message from the backend response
        });

        // Refetch permohonan akses after success
        if (refetchPermohonanAkses) {
          refetchPermohonanAkses();
        }

        // Refetch permohonan akses after success
        if (refetchSenaraiPengguna) {
          refetchSenaraiPengguna();
        }

        handleCloseModalAllowAccess();
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
        onClick={handleShowModalAllowAccess}
        disabled={disableButtonBenar}
      >
        Grant Access
      </Button>

      <Modal
        show={showModalAllowAccess}
        onHide={handleCloseModalAllowAccess}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Grant Access?</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            Are you sure you want to grant access for this requester?
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-secondary"
              onClick={handleCloseModalAllowAccess}
            >
              Cancel
            </Button>
            <Button
              className="btn-primary"
              onClick={handleSubmit(updateBenarPermohonanAkses)}
            >
              Grant Access
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalAllowAccessPermohonanPengguna;
