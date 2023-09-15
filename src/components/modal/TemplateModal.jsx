import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./Modal.css";

function TemplateModal(props) {
  const { show, handleClose, title, content, buttons } = props;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`btn btn-${button.variant}`}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TemplateModal;
