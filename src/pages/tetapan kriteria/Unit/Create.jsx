import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function CreateUnit() {
  const [showCreateUnit, setShowCreateUnit] = useState(false);

  const handleCloseCreateUnit = () => setShowCreateUnit(false);
  const handleShowCreateUnit = () => setShowCreateUnit(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateUnit}>
        Tambah Unit
      </Button>

      <Modal show={showCreateUnit} onHide={handleCloseCreateUnit}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Unit</Modal.Title>
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
          <Button variant="primary" onClick={handleCloseCreateUnit}>
            Tambah Unit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateUnit;
