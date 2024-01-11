import React from "react";
import { Row, Col, Form, Container } from "react-bootstrap";

function UserDetails() {
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
    </Container>
  );
}

export default UserDetails;
