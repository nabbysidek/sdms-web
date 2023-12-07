import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import Swal from 'sweetalert2';

function CreateSkopSemakan() {
  // ----------FE----------
  const [showCreateSkopSemakan, setShowCreateSkopSemakan] = useState(false);

  const handleCloseCreateSkopSemakan = () => setShowCreateSkopSemakan(false);
  const handleShowCreateSkopSemakan = () => setShowCreateSkopSemakan(true);

  // Form input
  const [skopSemakanInput, setSkopSemakanInput] = useState({
    namaSkopSemakan: '',
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setSkopSemakanInput({
      ...skopSemakanInput,
      [name]: value,
    });
  };

  // ----------BE----------
  // Create skop semakan
  const createSkopSemakan = async() => {
    try{
      const response = await axios.post(`http://127.0.0.1:8000/api/tetapan-kriteria/skop-semakan`, skopSemakanInput);

      if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Berjaya',
          text: response.data.message, // Access the message from the backend response
        });
        console.log('Skop Semakan Berjaya ditambah');
        handleCloseCreateSkopSemakan();
      }
    }
    catch(error) {
      console.log('Api respond is not as expected');
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateSkopSemakan}>Tambah Skop Semakan</Button>

      <Modal
        show={showCreateSkopSemakan}
        onHide={handleCloseCreateSkopSemakan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Skop Semakan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Skop Semakan</Form.Label>
              <FormControl 
                type="text"
                id="namaSkopSemakan"
                name="namaSkopSemakan"
                onChange={(e) => handleInputChange(e)}
                placeholder="Nama Skop Semakan Baharu"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateSkopSemakan}>Tutup</Button>
          <Button variant="primary" onClick={createSkopSemakan}>Tambah Skop Semakan</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateSkopSemakan;
