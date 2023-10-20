import React, { useState, useEffect }  from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import Swal from 'sweetalert2';

function CreateUnit() {
  // ----------FE----------
  const [showCreateUnit, setShowCreateUnit] = useState(false);

  const handleCloseCreateUnit = () => setShowCreateUnit(false);
  const handleShowCreateUnit = () => setShowCreateUnit(true);

  // Form input
  const [bahagianData, setBahagianData] = useState([]);
  const [jabatanData, setJabatanData] = useState([]);
  const [unitInput, setUnitInput] = useState({
    bahagianId: '',
    jabatanId: '',
    namaUnit: '',
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUnitInput({
      ...unitInput,
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

  // Fetch jabatan data
  useEffect(() => {
    const fetchJabatanData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tetapan-kriteria/jabatan/display-jabatan");
        if (Array.isArray(response.data) && response.data.length > 0) {
          setJabatanData(response.data); // Set all bahagian data
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching Skop Kriteria data:", error);
      }
    };
  
    fetchJabatanData();
  }, []);

  // Create unit
  const createUnit = async() => {
    try{
      const response = await axios.post(`http://127.0.0.1:8000/api/tetapan-kriteria/unit`, unitInput);

      if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Berjaya',
          text: response.data.message, // Access the message from the backend response
        });
        console.log('Unit berjaya ditambah');
        handleCloseCreateUnit();
      }
    }
    catch(error) {
      console.log('Api respond is not as expected');
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowCreateUnit}>Tambah Unit</Button>

      <Modal show={showCreateUnit} onHide={handleCloseCreateUnit}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Bahagian</Form.Label>
              <Form.Select name="bahagianId" value={unitInput.bahagianId} onChange={(e) => handleInputChange(e)}>
                <option value="" disabled>Pilih Bahagian</option>
                {bahagianData.map((bahagian) => (
                  <option key={bahagian.id} value={bahagian.id}>
                    {bahagian.namaBahagian}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Jabatan</Form.Label>
              <Form.Select name="jabatanId" value={unitInput.jabatanId} onChange={(e) => handleInputChange(e)}>
                <option value="" disabled>Pilih Jabatan</option>
                {jabatanData.map((jabatan) => (
                  <option key={jabatan.id} value={jabatan.id}>
                    {jabatan.namaJabatan}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Unit</Form.Label>
              <FormControl 
                type="text"
                id="namaUnit"
                name="namaUnit"
                onChange={(e) => handleInputChange(e)}
                placeholder="Nama Unit"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateUnit}>Tutup</Button>
          <Button variant="primary" onClick={createUnit}>Tambah Unit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateUnit;
