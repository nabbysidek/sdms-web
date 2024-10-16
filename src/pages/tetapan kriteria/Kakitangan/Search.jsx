import React from "react";
import { Form, Row, Container } from "react-bootstrap";

function SearchKakitangan({ filterValue, onFilterChange }) {

  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar">
          <Row>
            <Form.Group className="col-md-12">
              <Form.Control
                type="text"
                placeholder="Search audited staff using their staff ID or name . . ."
                value={filterValue}
                onChange={(e) => onFilterChange(e.target.value)}
              />
            </Form.Group>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default SearchKakitangan;
