import React from "react";
import { Form, Row, Container } from "react-bootstrap";

function SearchWilayah({ filterValue, onFilterChange }) {
  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar">
          <Row>
            <Form.Group className="col-md-12">
              <Form.Control
                type="text"
                placeholder="Cari wilayah melalui nama wilayah."
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

export default SearchWilayah;
