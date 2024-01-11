import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ModalRejectAccess() {
  const [showModalRejectAccess, setShowModalRejectAccess] = useState(false);

  const handleCloseModalRejectAccess = () => setShowModalRejectAccess(false);
  const handleShowModalRejectAccess = () => setShowModalRejectAccess(true);

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
        <Modal.Body>
          Adakah anda pasti ingin menolak permintaan akses pengguna ini?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-secondary"
            onClick={handleCloseModalRejectAccess}
          >
            Tutup
          </Button>
          <Button className="btn-primary">Tolak Akses</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalRejectAccess;
