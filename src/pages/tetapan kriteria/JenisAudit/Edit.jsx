import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function EditJenisAudit() {
  const [showEditJenisAudit, setShowEditJenisAudit] = useState(false);

  const handleCloseEditJenisAudit = () => setShowEditJenisAudit(false);
  const handleShowEditJenisAudit = () => setShowEditJenisAudit(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowEditJenisAudit}>
        Kemaskini
      </Button>

      <Modal show={showEditJenisAudit} onHide={handleCloseEditJenisAudit}>
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
          <Button variant="primary" onClick={handleCloseEditJenisAudit}>
            Kemaskini Jenis Audit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditJenisAudit;
