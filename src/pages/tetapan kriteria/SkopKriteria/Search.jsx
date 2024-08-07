import React from "react";
import { Form, Row, Container } from "react-bootstrap";

function SearchSkopKriteria({ filterValue, onFilterChange }) {
  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar">
          <Row>
            <Form.Group className="col-md-12">
              <Form.Control
                type="text"
                placeholder="Cari skop kriteria melalui nama skop kriteria ketidakpatuhan atau skop semakan."
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

export default SearchSkopKriteria;
