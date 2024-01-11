import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ModalAllowAccess() {
  const [showModalAllowAccess, setShowModalAllowAccess] = useState(false);

  const handleCloseModalAllowAccess = () => setShowModalAllowAccess(false);
  const handleShowModalAllowAccess = () => setShowModalAllowAccess(true);

  return (
    <>
      <Button className="allow-btn" onClick={handleShowModalAllowAccess}>
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
          <Button className="btn-primary">Benar Akses</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAllowAccess;
