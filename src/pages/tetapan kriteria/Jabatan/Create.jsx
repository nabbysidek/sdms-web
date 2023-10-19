import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function CreateJabatan() {
  const [showCreateJabatan, setShowCreateJabatan] = useState(false);

  const handleCloseCreateJabatan = () => setShowCreateJabatan(false);
  const handleShowCreateJabatan = () => setShowCreateJabatan(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateJabatan}>
        Tambah Jabatan
      </Button>

      <Modal
        show={showCreateJabatan}
        onHide={handleCloseCreateJabatan}
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
          <Button variant="primary" onClick={handleCloseCreateJabatan}>
            Tambah Jabatan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJabatan;
