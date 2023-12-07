import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import Swal from 'sweetalert2';

function CreateJenisAudit() {
  // ----------FE----------
  const [showCreateJenisAudit, setShowCreateJenisAudit] = useState(false);

  const handleCloseCreateJenisAudit = () => setShowCreateJenisAudit(false);
  const handleShowCreateJenisAudit = () => setShowCreateJenisAudit(true);

  // Form input
  const [jenisAuditInput, setJenisAuditInput] = useState({
    namaJenisAudit:'',
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setJenisAuditInput({
      ...jenisAuditInput,
      [name]: value,
    });
  };

    // ----------BE----------
  // Create jenis audit
  const createJenisAudit = async() => {
    try{
      const response = await axios.post(`http://127.0.0.1:8000/api/tetapan-kriteria/jenis-audit`, jenisAuditInput);

      if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Berjaya',
          text: response.data.message, // Access the message from the backend response
        });
        console.log('Jenis audit berjaya ditambah');
        handleCloseCreateJenisAudit();
      }
    }
    catch(error) {
      console.log('Api respond is not as expected');
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateJenisAudit}>Tambah Jenis Audit</Button>

      <Modal
        show={showCreateJenisAudit}
        onHide={handleCloseCreateJenisAudit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Jenis Audit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Jenis Audit</Form.Label>
              <FormControl 
                type="text"
                id="namaJenisAudit"
                name="namaJenisAudit"
                onChange={(e) => handleInputChange(e)}
                placeholder="Nama Jenis Audit Baharu"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateJenisAudit}>Tutup</Button>
          <Button variant="primary" onClick={createJenisAudit}>Tambah Jenis Audit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJenisAudit;
