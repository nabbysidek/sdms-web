import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function EditBahagian() {
  const [showEditBahagian, setShowEditBahagian] = useState(false);

  const handleCloseEditBahagian = () => setShowEditBahagian(false);
  const handleShowEditBahagian = () => setShowEditBahagian(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowEditBahagian}>
        Kemaskini
      </Button>

      <Modal
        show={showEditBahagian}
        onHide={handleCloseEditBahagian}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Bahagian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Bahagian</Form.Label>
              <FormControl type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseEditBahagian}>
            Kemaskini Bahagian
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditBahagian;
