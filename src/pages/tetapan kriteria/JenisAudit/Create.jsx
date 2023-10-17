import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function CreateJenisAudit() {
  const [showCreateJenisAudit, setShowCreateJenisAudit] = useState(false);

  const handleCloseCreateJenisAudit = () => setShowCreateJenisAudit(false);
  const handleShowCreateJenisAudit = () => setShowCreateJenisAudit(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateJenisAudit}>
        Tambah Jenis Audit
      </Button>

      <Modal show={showCreateJenisAudit} onHide={handleCloseCreateJenisAudit}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Jenis Audit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Jenis Audit</Form.Label>
              <FormControl type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateJenisAudit}>
            Tambah Jenis Audit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJenisAudit;
