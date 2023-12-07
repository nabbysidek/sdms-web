import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import Swal from 'sweetalert2';

function CreateKakitangan() {
  // ----------FE----------
  const [showCreateKakitangan, setShowCreateKakitangan] = useState(false);

  const handleCloseCreateKakitangan = () => setShowCreateKakitangan(false);
  const handleShowCreateKakitangan = () => setShowCreateKakitangan(true);

  // Form input
  const [kakitanganInput, setKakitanganInput] = useState({
    namaKakitangan: '',
    idKakitangan: '',
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setKakitanganInput({
      ...kakitanganInput,
      [name]: value,
    });
  };

  // ----------BE----------
  // Create kakitangan
  const createKakitangan = async() => {
    try{
      const response = await axios.post(`http://127.0.0.1:8000/api/tetapan-kriteria/kakitangan`, kakitanganInput);

      if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Berjaya',
          text: response.data.message, // Access the message from the backend response
        });
        console.log('Kakitangan berjaya ditambah');
        handleCloseCreateKakitangan();
      }
    }
    catch(error) {
      console.log('Api respond is not as expected');
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateKakitangan}>Tambah Kakitangan</Button>

      <Modal
        show={showCreateKakitangan}
        onHide={handleCloseCreateKakitangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kakitangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Kakitangan</Form.Label>
              <FormControl 
                type="text"
                id="namaKakitangan"
                name="namaKakitangan"
                onChange={(e) => handleInputChange(e)}
                placeholder="Nama Kakitangan Baharu"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>ID Kakitangan</Form.Label>
              <FormControl 
                type="text"
                id="idKakitangan"
                name="idKakitangan"
                onChange={(e) => handleInputChange(e)}
                placeholder="Id Kakitangan"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateKakitangan}>Tutup</Button>
          <Button variant="primary" onClick={createKakitangan}>Tambah Kakitangan</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateKakitangan;
