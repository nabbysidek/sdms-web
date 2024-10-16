import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useJenisAuditStore from "../../../store/jenis-audit-store";

function EditJenisAudit({jenisAudit, onUpdateSuccess }) {
  // INITIALIZE EDIT JENIS AUDIT MODAL
  const [showEditJenisAudit, setShowEditJenisAudit] = useState(false);

  // HANDLE DISPLAY OF EDIT JENIS AUDIT MODAL
  const handleCloseEditJenisAudit = () => setShowEditJenisAudit(false);
  const handleShowEditJenisAudit = () => setShowEditJenisAudit(true);

  // FORM VALIDATION FOR MODAL
  const { control, handleSubmit, reset, formState: {errors} } = useForm();

  // USE OF JENIS AUDIT STORE
  const { updateJenisAudit } = useJenisAuditStore();

  // HANDLE EDIT OF AN JENIS AUDIT
  const onSubmit = (jenisAuditInput) => {
    updateJenisAudit(jenisAudit.id, jenisAuditInput, handleCloseEditJenisAudit, onUpdateSuccess);
  };

  // RESET EDIT FORM DATA WHEN MODAL IS OPENED
  useEffect(() => {
    if (showEditJenisAudit) {
      reset({
        namaJenisAudit: jenisAudit.namaJenisAudit,
      });
    }
  }, [showEditJenisAudit, jenisAudit, reset]);

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditJenisAudit}>
        Edit
      </Button>

      <Modal
        show={showEditJenisAudit}
        onHide={handleCloseEditJenisAudit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Type of Audit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Type of Audit</Form.Label>
              <Controller
                name="namaJenisAudit"
                id="namaJenisAudit"
                control={control}
                defaultValue={jenisAudit.namaJenisAudit}
                rules={{ required: "A type of audit is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter type of audit . . ."
                    />
                    {errors?.namaJenisAudit && (
                      <span className="error-message">
                        {errors.namaJenisAudit.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="edit-modal-btn" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditJenisAudit;
