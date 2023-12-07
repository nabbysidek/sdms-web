import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import Swal from 'sweetalert2';

function CreateWilayah() {
  // ----------FE----------
  const [showCreateWilayah, setShowCreateWilayah] = useState(false);

  const handleCloseCreateWilayah = () => setShowCreateWilayah(false);
  const handleShowCreateWilayah = () => setShowCreateWilayah(true);

  // Form input
  const [wilayahInput, setWilayahInput] = useState({
    namaWilayah: '',
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setWilayahInput({
      ...wilayahInput,
      [name]: value,
    });
  };

    // ----------BE----------
  // Create wilayah
  const createWilayah = async() => {
    try{
      const response = await axios.post(`http://127.0.0.1:8000/api/tetapan-kriteria/wilayah`, wilayahInput);

      if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Berjaya',
          text: response.data.message, // Access the message from the backend response
        });
        console.log('Wilayah berjaya ditambah');
        handleCloseCreateWilayah();
      }
    }
    catch(error) {
      console.log('Api respond is not as expected');
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateWilayah}>Tambah Wilayah</Button>

      <Modal
        show={showCreateWilayah}
        onHide={handleCloseCreateWilayah}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Wilayah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Wilayah</Form.Label>
              <FormControl 
                type="text"
                id="namaWilayah"
                name="namaWilayah"
                onChange={(e) => handleInputChange(e)}
                placeholder="Nama WIlayah Baharu"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateWilayah}>Tutup</Button>
          <Button variant="primary" onClick={createWilayah}>Tambah Wilayah</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateWilayah;
