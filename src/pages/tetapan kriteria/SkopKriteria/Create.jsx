import React, { useState }  from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import Swal from 'sweetalert2';

function CreateSkopKriteria() {
  // ----------FE----------
  const [showCreateSkopKriteria, setShowCreateSkopKriteria] = useState(false);

  const handleCloseCreateSkopKriteria = () => setShowCreateSkopKriteria(false);
  const handleShowCreateSkopKriteria = () => setShowCreateSkopKriteria(true);

  // Form input
  const [skopKriteriaInput, setSkopKriteriaInput] = useState({
    namaSkopKriteria: '',
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setSkopKriteriaInput({
      ...skopKriteriaInput,
      [name]: value,
    });
  };

  // ----------BE----------
  // Create skop kriteria
  const createSkopKriteria = async() => {
    try{
      const response = await axios.post(`http://127.0.0.1:8000/api/tetapan-kriteria/skop-kriteria`, skopKriteriaInput);

      if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Berjaya',
          text: response.data.message, // Access the message from the backend response
        });
        console.log('Skop kriteria berjaya ditambah');
        handleCloseCreateSkopKriteria();
      }
    }
    catch(error) {
      console.log('Api respond is not as expected');
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateSkopKriteria}>Tambah Skop Kriteria</Button>

      <Modal show={showCreateSkopKriteria} onHide={handleCloseCreateSkopKriteria}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Skop Kriteria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Skop Kriteria</Form.Label>
              <FormControl 
                type="text"
                id="namaSkopKriteria"
                name="namaSkopKriteria"
                onChange={(e) => handleInputChange(e)}
                placeholder="Nama Skop Kriteria Baharu"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateSkopKriteria}>Tutup</Button>
          <Button variant="primary" onClick={createSkopKriteria}>Tambah Skop Kriteria</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateSkopKriteria;
