import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ModalTerminateAccess() {
  const [showModalTerminateAccess, setShowModalTerminateAccess] =
    useState(false);

  const handleCloseModalTerminateAccess = () =>
    setShowModalTerminateAccess(false);
  const handleShowModalTerminateAccess = () =>
    setShowModalTerminateAccess(true);

  return (
    <>
      <Button className="delBtn" onClick={handleShowModalTerminateAccess}>
        Tamatkan Akses
      </Button>

      <Modal
        show={showModalTerminateAccess}
        onHide={handleCloseModalTerminateAccess}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tamatkan Akses Pengguna?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Adakah anda pasti ingin menamatkan akses pengguna ini?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="buttonSecondary"
            variant="secondary"
            onClick={handleCloseModalTerminateAccess}
          >
            Tutup
          </Button>
          <Button className="buttonPrimary" variant="primary">
            Tamatkan Akses
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalTerminateAccess;
