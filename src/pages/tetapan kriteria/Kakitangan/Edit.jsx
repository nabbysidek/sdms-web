import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function EditKakitangan() {
  const [showEditKakitangan, setShowEditKakitangan] = useState(false);

  const handleCloseEditKakitangan = () => setShowEditKakitangan(false);
  const handleShowEditKakitangan = () => setShowEditKakitangan(true);

  return (
    <div>
      <Button className="editBtn" onClick={handleShowEditKakitangan}>
        Kemaskini
      </Button>

      <Modal
        show={showEditKakitangan}
        onHide={handleCloseEditKakitangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Kakitangan</Modal.Title>
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
          <Button variant="primary" onClick={handleCloseEditKakitangan}>
            Kemaskini Kakitangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditKakitangan;
