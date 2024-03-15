import React from "react";
import { Row, Col, Form, Container } from "react-bootstrap";

function UserDetails({ userInfo }) {
  return (
    <Container fluid className="tabs-container">
      <Row>
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" defaultValue={userInfo?.namaAuditor} disabled />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Form.Group>
            <Form.Label>ID Kakitangan</Form.Label>
            <Form.Control type="text" defaultValue={userInfo?.emelAuditor} disabled />
          </Form.Group>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
}

export default UserDetails;
