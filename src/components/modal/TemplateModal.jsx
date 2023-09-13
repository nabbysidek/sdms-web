import Modal from "react-bootstrap/Modal";
import "./TemplateModal.css";

function TemplateModal(props) {
  const {
    show,
    handleClose,
    title,
    content,
    inputLabel,
    inputValue,
    onInputChange,
    buttons,
  } = props;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {content}
          {inputLabel && (
            <div>
              <label>{inputLabel}</label>
              <input
                type="email"
                className="form-control"
                value={inputValue}
                onChange={onInputChange}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`btn btn-${button.variant}`}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TemplateModal;
