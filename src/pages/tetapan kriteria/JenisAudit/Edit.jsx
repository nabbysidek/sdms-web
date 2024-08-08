import React, { useState } from "react";
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
  const { control, handleSubmit, formState: {errors} } = useForm();

  // USE OF JENIS AUDIT STORE
  const { updateJenisAudit } = useJenisAuditStore();

  // HANDLE EDIT OF AN JENIS AUDIT
  const onSubmit = (jenisAuditInput) => {
    updateJenisAudit(jenisAudit.id, jenisAuditInput, handleCloseEditJenisAudit, onUpdateSuccess);
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditJenisAudit}>
        Kemaskini
      </Button>

      <Modal
        show={showEditJenisAudit}
        onHide={handleCloseEditJenisAudit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Jenis Audit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Nama Jenis Audit</Form.Label>
              <Controller
                name="namaJenisAudit"
                id="namaJenisAudit"
                control={control}
                defaultValue={jenisAudit.namaJenisAudit}
                rules={{ required: "Nama jenis audit baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Jenis audit"
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
            Kemaskini
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditJenisAudit;
