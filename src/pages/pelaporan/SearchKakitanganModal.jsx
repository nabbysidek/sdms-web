// SearchKakitanganModal.jsx
import React from "react";
import { Modal } from "react-bootstrap";
import "../../assets/styles/styles_pelaporan.css";

function SearchKakitanganModal({ showModal, setShowModal, onLinkClick }) {
  const handleLinkClick = () => {
    onLinkClick();
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      backdrop="static"
      keyboard={false}
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Carian Berdasarkan Nama Kakitangan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-staff-container">
          <a className="modal-staff-link" onClick={handleLinkClick}>
            <h6>This is a container for staff name</h6>
          </a>
        </div>
        <div className="modal-staff-container">
          <a className="modal-staff-link" onClick={handleLinkClick}>
            <h6>This is another container for staff name</h6>
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SearchKakitanganModal;
