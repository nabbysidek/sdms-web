import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function EditWilayah() {
  const [showEditWilayah, setShowEditWilayah] = useState(false);

  const handleCloseEditWilayah = () => setShowEditWilayah(false);
  const handleShowEditWilayah = () => setShowEditWilayah(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowEditWilayah}>
        Kemaskini
      </Button>

      <Modal show={showEditWilayah} onHide={handleCloseEditWilayah}>
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Wilayah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Wilayah</Form.Label>
              <FormControl type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseEditWilayah}>
            Kemaskini Wilayah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditWilayah;
