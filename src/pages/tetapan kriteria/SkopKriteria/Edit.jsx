import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function EditSkopKriteria() {
  const [showEditSkopKriteria, setShowEditSkopKriteria] = useState(false);

  const handleCloseEditSkopKriteria = () => setShowEditSkopKriteria(false);
  const handleShowEditSkopKriteria = () => setShowEditSkopKriteria(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowEditSkopKriteria}>
        Kemaskini
      </Button>

      <Modal
        show={showEditSkopKriteria}
        onHide={handleCloseEditSkopKriteria}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Skop Kriteria</Modal.Title>
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
          <Button variant="primary" onClick={handleCloseEditSkopKriteria}>
            Kemaskini Skop Kriteria
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditSkopKriteria;
