import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function CreateBahagian() {
  const [showCreateBahagian, setShowCreateBahagian] = useState(false);

  const handleCloseCreateBahagian = () => setShowCreateBahagian(false);
  const handleShowCreateBahagian = () => setShowCreateBahagian(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateBahagian}>
        Tambah Bahagian
      </Button>

      <Modal
        show={showCreateBahagian}
        onHide={handleCloseCreateBahagian}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Bahagian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Bahagian</Form.Label>
              <FormControl type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateBahagian}>
            Tambah Bahagian
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateBahagian;
