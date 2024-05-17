import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function ModalAllowAccessSenaraiPengguna({ disableButtonBenar, userId }) {
  // -------------------- FE ---------------------------
  const [showModalAllowAccessSenaraiPengguna, setShowModalAllowAccessSenaraiPengguna] = useState(false);

  const handleCloseModalAllowAccessSenaraiPengguna = () => setShowModalAllowAccessSenaraiPengguna(false);
  const handleShowModalAllowAccessSenaraiPengguna = () => setShowModalAllowAccessSenaraiPengguna(true);

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
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });

        handleCloseModalAllowAccessSenaraiPengguna();
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
        onClick={handleShowModalAllowAccessSenaraiPengguna}
        disabled={disableButtonBenar}
      >
        Benar Akses
      </Button>

      <Modal
        show={showModalAllowAccessSenaraiPengguna}
        onHide={handleCloseModalAllowAccessSenaraiPengguna}
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
              onClick={handleCloseModalAllowAccessSenaraiPengguna}
            >
              Tutup
            </Button>
            <Button
              className="btn-primary"
              onClick={handleSubmit(updateBenarPermohonanAksesSenaraiPengguna)}
            >
              Benar Akses
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalAllowAccessSenaraiPengguna;
