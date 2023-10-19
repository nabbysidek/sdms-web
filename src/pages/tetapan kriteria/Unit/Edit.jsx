import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function EditUnit() {
  const [showEditUnit, setShowEditUnit] = useState(false);

  const handleCloseEditUnit = () => setShowEditUnit(false);
  const handleShowEditUnit = () => setShowEditUnit(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowEditUnit}>
        Kemaskini
      </Button>

      <Modal
        show={showEditUnit}
        onHide={handleCloseEditUnit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Bahagian</Form.Label>
              <Form.Control as="select">
                <option>Pilih Bahagian</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Jabatan</Form.Label>
              <Form.Control as="select">
                <option>Pilih Jabatan</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Unit</Form.Label>
              <FormControl type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseEditUnit}>
            Kemaskini Unit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditUnit;
