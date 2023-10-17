import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function EditCawangan() {
  const [showEditCawangan, setShowEditCawangan] = useState(false);

  const handleCloseEditCawangan = () => setShowEditCawangan(false);
  const handleShowEditCawangan = () => setShowEditCawangan(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowEditCawangan}>
        Kemaskini
      </Button>

      <Modal show={showEditCawangan} onHide={handleCloseEditCawangan}>
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Cawangan</Modal.Title>
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
          <Button variant="primary" onClick={handleCloseEditCawangan}>
            Kemaskini Cawangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditCawangan;
