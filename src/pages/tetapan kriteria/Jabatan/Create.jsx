import React, { useState, useEffect }  from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import Swal from 'sweetalert2';

function CreateJabatan() {
  // ----------FE----------
  const [showCreateJabatan, setShowCreateJabatan] = useState(false);

  const handleCloseCreateJabatan = () => setShowCreateJabatan(false);
  const handleShowCreateJabatan = () => setShowCreateJabatan(true);
  
  // Form input
  const [bahagianData, setBahagianData] = useState([]);
  const [jabatanInput, setJabatanInput] = useState({
    bahagianId: '',
    namaJabatan: '',
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setJabatanInput({
      ...jabatanInput,
      [name]: value,
    });
  };

  // ----------BE----------
  // Fetch bahagian data
  useEffect(() => {
    const fetchBahagianData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tetapan-kriteria/bahagian/display-bahagian");
        if (Array.isArray(response.data) && response.data.length > 0) {
          setBahagianData(response.data); // Set all bahagian data
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching Skop Kriteria data:", error);
      }
    };
  
    fetchBahagianData();
  }, []);

  // Create jabatan
  const createJabatan = async() => {
    try{
      const response = await axios.post(`http://127.0.0.1:8000/api/tetapan-kriteria/jabatan`, jabatanInput);

      if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Berjaya',
          text: response.data.message, // Access the message from the backend response
        });
        console.log('Jabatan berjaya ditambah');
        handleCloseCreateJabatan();
      }
    }
    catch(error) {
      console.log('Api respond is not as expected');
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateJabatan}>Tambah Jabatan</Button>

      <Modal show={showCreateJabatan} onHide={handleCloseCreateJabatan}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Jabatan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Bahagian</Form.Label>
              <Form.Select name="bahagianId" value={jabatanInput.bahagianId} onChange={(e) => handleInputChange(e)}>
                <option value="" disabled>Pilih Bahagian</option>
                {bahagianData.map((bahagian) => (
                  <option key={bahagian.id} value={bahagian.id}>
                    {bahagian.namaBahagian}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Jabatan</Form.Label>
              <FormControl 
                type="text" 
                id="namaJabatan"
                name="namaJabatan"
                onChange={(e) => handleInputChange(e)}
                placeholder="Nama Jabatan Baharu"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateJabatan}>Tutup</Button>
          <Button variant="primary" onClick={createJabatan}>Tambah Jabatan</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJabatan;
