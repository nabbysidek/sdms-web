import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function CreateSkopSemakan() {
  const [showCreateSkopSemakan, setShowCreateSkopSemakan] = useState(false);

  const handleCloseCreateSkopSemakan = () => setShowCreateSkopSemakan(false);
  const handleShowCreateSkopSemakan = () => setShowCreateSkopSemakan(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateSkopSemakan}>
        Tambah Skop Semakan
      </Button>

      <Modal show={showCreateSkopSemakan} onHide={handleCloseCreateSkopSemakan}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Skop Semakan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Skop Semakan</Form.Label>
              <FormControl type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateSkopSemakan}>
            Tambah Skop Semakan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateSkopSemakan;
