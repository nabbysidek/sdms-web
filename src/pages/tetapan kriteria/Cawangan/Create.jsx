import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function CreateCawangan() {
  const [showCreateCawangan, setShowCreateCawangan] = useState(false);

  const handleCloseCreateCawangan = () => setShowCreateCawangan(false);
  const handleShowCreateCawangan = () => setShowCreateCawangan(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateCawangan}>
        Tambah Cawangan
      </Button>

      <Modal show={showCreateCawangan} onHide={handleCloseCreateCawangan}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Cawangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Wilayah</Form.Label>
              <Form.Control as="select">
                <option>Pilih Wilayah</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Cawangan</Form.Label>
              <FormControl type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateCawangan}>
            Tambah Cawangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateCawangan;
