import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

function EditKriteriaKetidakpatuhan() {
  const [showEditKriteria, setShowEditKriteria] = useState(false);

  const handleCloseEditKriteria = () => setShowEditKriteria(false);
  const handleShowEditKriteria = () => setShowEditKriteria(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShowEditKriteria}>
        Kemaskini
      </Button>

      <Modal
        show={showEditKriteria}
        onHide={handleCloseEditKriteria}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Kriteria Ketidakpatuhan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Skop Kriteria</Form.Label>
              <Form.Control as="select">
                <option>Pilih Skop Kriteria</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Kod Kriteria Ketidakpatuhan</Form.Label>
              <FormControl type="text" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Kriteria Ketidakpatuhan</Form.Label>
              <FormControl type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseEditKriteria}>
            Kemaskini Kriteria Ketidakpatuhan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditKriteriaKetidakpatuhan;
