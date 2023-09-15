import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "./Modal.css";

function FormModal(props) {
  const {
    show,
    onHide,
    title,
    content,
    onSubmit,
    formFields,
    submitLabel,
    cancelLabel,
    showCancelButton,
  } = props;

  // State to hold form field values
  const [formValues, setFormValues] = useState({});

  // Function to handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
        <form onSubmit={handleFormSubmit}>
          {formFields.map((field, index) => (
            <div className="mb-3" key={index}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                className="form-control"
                id={field.name}
                name={field.name}
                value={formValues[field.name] || ""}
                onChange={handleFieldChange}
                required={field.required}
              />
            </div>
          ))}
          <Modal.Footer>
            {showCancelButton ? (
              <Button variant="secondary" onClick={onHide}>
                {cancelLabel || "Batal"}
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                {submitLabel || "Hantar"}
              </Button>
            )}
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default FormModal;
