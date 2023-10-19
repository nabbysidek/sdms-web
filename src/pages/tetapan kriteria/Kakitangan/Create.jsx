import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function CreateKakitangan() {
  const [showCreateKakitangan, setShowCreateKakitangan] = useState(false);

  const handleCloseCreateKakitangan = () => setShowCreateKakitangan(false);
  const handleShowCreateKakitangan = () => setShowCreateKakitangan(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateKakitangan}>
        Tambah Kakitangan
      </Button>

      <Modal
        show={showCreateKakitangan}
        onHide={handleCloseCreateKakitangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kakitangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>ID Kakitangan</Form.Label>
              <FormControl type="text" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Kakitangan</Form.Label>
              <FormControl type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateKakitangan}>
            Tambah Kakitangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateKakitangan;
