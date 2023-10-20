import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import Swal from 'sweetalert2';

function CreateBahagian() {
  // ----------FE----------
  const [showCreateBahagian, setShowCreateBahagian] = useState(false);

  const handleCloseCreateBahagian = () => setShowCreateBahagian(false);
  const handleShowCreateBahagian = () => setShowCreateBahagian(true);
  
  // Form input
  const [bahagianInput, setBahagianInput] = useState({
    namaBahagian: '',
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setBahagianInput({
      ...bahagianInput,
      [name]: value,
    });
  };

  // ----------BE----------
  // Create bahagian
  const createBahagian = async() => {
    try{
      const response = await axios.post(`http://127.0.0.1:8000/api/tetapan-kriteria/bahagian`, bahagianInput);

      if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Berjaya',
          text: response.data.message, // Access the message from the backend response
        });
        console.log('Bahagian berjaya ditambah');
        handleCloseCreateBahagian();
      }
    }
    catch(error) {
      console.log('Api respond is not as expected');
    }
  };
  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateBahagian}>Tambah Bahagian</Button>

      <Modal show={showCreateBahagian} onHide={handleCloseCreateBahagian}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Bahagian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Bahagian</Form.Label>
              <FormControl 
                type="text"
                id="namaBahagian"
                name="namaBahagian"
                onChange={(e) => handleInputChange(e)}
                placeholder="Nama Bahagian Baharu"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateBahagian}>Tutup</Button>
          <Button variant="primary" onClick={createBahagian}>Tambah Bahagian</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateBahagian;
