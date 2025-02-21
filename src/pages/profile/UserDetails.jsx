import React from "react";
import { Row, Col, Form, Container } from "react-bootstrap";

function UserDetails({ userInfo }) {
  return (
    <Container fluid className="tabs-container">
      <Row>
        <Col xs={12}>
          {/* User Name Field */}
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" defaultValue={userInfo?.name_user || "N/A"} disabled />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          {/* User Email Field */}
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" defaultValue={userInfo?.email_user || "N/A"} disabled />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}

export default UserDetails;
