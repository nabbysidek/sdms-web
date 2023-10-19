import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function EditJabatan() {
  const [showEditJabatan, setShowEditJabatan] = useState(false);

  const handleCloseEditJabatan = () => setShowEditJabatan(false);
  const handleShowEditJabatan = () => setShowEditJabatan(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowEditJabatan}>
        Kemaskini
      </Button>

      <Modal
        show={showEditJabatan}
        onHide={handleCloseEditJabatan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Jabatan</Modal.Title>
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
              <Form.Label>Nama Jabatan</Form.Label>
              <FormControl type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseEditJabatan}>
            Kemaskini Jabatan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditJabatan;
