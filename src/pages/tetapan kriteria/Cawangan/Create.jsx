import React, { useState, useEffect }  from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import Swal from 'sweetalert2';

function CreateCawangan() {
  // ----------FE----------
  const [showCreateCawangan, setShowCreateCawangan] = useState(false);

  const handleCloseCreateCawangan = () => setShowCreateCawangan(false);
  const handleShowCreateCawangan = () => setShowCreateCawangan(true);

  // Form input
  const [wilayahData, setWilayahData] = useState([]);
  const [cawanganInput, setCawanganInput] = useState({
    wilayahId: '',
    namaCawangan: '',
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setCawanganInput({
      ...cawanganInput,
      [name]: value,
    });
  };

  // ----------BE----------
  // Fetch wilayah data
  useEffect(() => {
    const fetchWilayahData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tetapan-kriteria/wilayah/display-wilayah");
        if (Array.isArray(response.data) && response.data.length > 0) {
          setWilayahData(response.data); // Display all wilayah data
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching wilayah data:", error);
      }
    };
  
    fetchWilayahData();
  }, []);

  // Create cawangan
  const createCawangan = async() => {
    try{
      const response = await axios.post(`http://127.0.0.1:8000/api/tetapan-kriteria/cawangan`, cawanganInput);

      if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Berjaya',
          text: response.data.message, // Access the message from the backend response
        });
        console.log('Kriteria ketidakpatuhan berjaya ditambah');
        handleCloseCreateCawangan();
      }
    }
    catch(error) {
      console.log('Api respond is not as expected');
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateCawangan}>Tambah Cawangan</Button>

      <Modal show={showCreateCawangan} onHide={handleCloseCreateCawangan}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Cawangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Wilayah</Form.Label>
              <Form.Select name="wilayahId" value={cawanganInput.wilayahId} onChange={(e) => handleInputChange(e)}>
                <option value="" disabled>Pilih Wilayah</option>
                {wilayahData.map((wilayah) => (
                  <option key={wilayah.id} value={wilayah.id}>
                    {wilayah.namaWilayah}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Cawangan</Form.Label>
              <FormControl 
                type="text"
                id="namaCawangan"
                name="namaCawangan"
                onChange={(e) => handleInputChange(e)}
                placeholder="Nama Cawangan Baharu"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateCawangan}>Tutup</Button>
          <Button variant="primary" onClick={createCawangan}>Tambah Cawangan</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateCawangan;
