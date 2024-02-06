import React, { useEffect } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

function UserDetails() {
  const [records,setRecords] = useState([]);
  useEffect(() => {
    let isMounted = true;
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tetapan-pengguna/senarai-pengguna');
  
        if (isMounted) {
          setRecords(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();

    console.log(records);
  
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container fluid className="tabs-container">
      <Row>
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" defaultValue="" disabled />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Form.Group>
            <Form.Label>ID Kakitangan</Form.Label>
            <Form.Control type="text" defaultValue="" disabled />
          </Form.Group>
        </Col>
      </Row>
      <Row>
  <table>
    <tbody> {/* Add a tbody for better table structure */}
      <tr>
        <td>nama</td>
        <td>no Staff</td>
        <td>status id</td>
      </tr>
      {Array.isArray(records) && records.length > 0 ? (
        records.map((recordsdata, key) => (
          <tr key={key}>
            <td>{recordsdata.namaAuditor}</td>
            <td>{recordsdata.idAuditor}</td>
            <td>{recordsdata.statusAuditor}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="2">No records found</td>
        </tr>
      )}
    </tbody>
  </table>
</Row>
    </Container>
  );
}

export default UserDetails;
