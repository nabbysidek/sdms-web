import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function CreateWilayah() {
  const [showCreateWilayah, setShowCreateWilayah] = useState(false);

  const handleCloseCreateWilayah = () => setShowCreateWilayah(false);
  const handleShowCreateWilayah = () => setShowCreateWilayah(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateWilayah}>
        Tambah Wilayah
      </Button>

      <Modal show={showCreateWilayah} onHide={handleCloseCreateWilayah}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Wilayah</Modal.Title>
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
          <Button variant="primary" onClick={handleCloseCreateWilayah}>
            Tambah Wilayah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateWilayah;
