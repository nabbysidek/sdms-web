import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function EditSkopSemakan() {
  const [showEditSkopSemakan, setShowEditSkopSemakan] = useState(false);

  const handleCloseEditSkopSemakan = () => setShowEditSkopSemakan(false);
  const handleShowEditSkopSemakan = () => setShowEditSkopSemakan(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowEditSkopSemakan}>
        Kemaskini
      </Button>

      <Modal show={showEditSkopSemakan} onHide={handleCloseEditSkopSemakan}>
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Skop Semakan</Modal.Title>
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
          <Button variant="primary" onClick={handleCloseEditSkopSemakan}>
            Kemaskini Skop Semakan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditSkopSemakan;
