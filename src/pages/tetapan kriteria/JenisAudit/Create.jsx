import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useJenisAuditStore from "../../../store/jenis-audit-store";

function CreateJenisAudit({ onAddSuccess }) {
  // INITIALIZE CREATE JENIS AUDIT MODAL
  const [showCreateJenisAudit, setShowCreateJenisAudit] = useState(false);

  // HANDLE DISPLAY OF CREATE JENIS AUDIT MODAL
  const handleShowCreateJenisAudit = () => setShowCreateJenisAudit(true);
  const handleCloseCreateJenisAudit = () => {
    setShowCreateJenisAudit(false);
    reset();
  };

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF JENIS AUDIT STORE
  const createJenisAudit = useJenisAuditStore((state) => state.createJenisAudit);

  //  HANDLE CREATE A NEW OF JENIS AUDIT
  const onSubmit = (data) => {
    createJenisAudit(data, () => {
      handleCloseCreateJenisAudit();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateJenisAudit}>
        Tambah jenis audit
      </Button>

      <Modal
        show={showCreateJenisAudit}
        onHide={handleCloseCreateJenisAudit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Jenis Audit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Nama Jenis Audit</Form.Label>
              <Controller
                name="namaJenisAudit"
                id="namaJenisAudit"
                control={control}
                defaultValue=""
                rules={{ required: "Jenis audit baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Masukkan jenis audit baru"
                    autoFocus
                  />
                )}
              />
              {errors.namaJenisAudit && (
                <span className="error-message">
                  {errors.namaJenisAudit.message}
                </span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="create-new-modal-btn"
            onClick={handleSubmit(onSubmit)}
          >
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJenisAudit;
