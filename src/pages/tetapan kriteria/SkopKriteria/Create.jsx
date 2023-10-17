import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function CreateSkopKriteria() {
  const [showCreateSkopKriteria, setShowCreateSkopKriteria] = useState(false);

  const handleCloseCreateSkopKriteria = () => setShowCreateSkopKriteria(false);
  const handleShowCreateSkopKriteria = () => setShowCreateSkopKriteria(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateSkopKriteria}>
        Tambah Skop Kriteria
      </Button>

      <Modal
        show={showCreateSkopKriteria}
        onHide={handleCloseCreateSkopKriteria}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Skop Kriteria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Skop Kriteria</Form.Label>
              <FormControl type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateSkopKriteria}>
            Tambah Skop Kriteria
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateSkopKriteria;
