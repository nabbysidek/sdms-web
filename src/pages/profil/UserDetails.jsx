import React from "react";
import { Row, Col, Form } from "react-bootstrap";

function UserDetails() {
  // Fetch user details and display them here

  return (
    <div className="container tabsContent">
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
    </div>
  );
}

export default UserDetails;
