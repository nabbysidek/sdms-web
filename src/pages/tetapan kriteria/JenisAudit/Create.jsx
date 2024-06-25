import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useJenisAuditStore from "../../../store/jenis-audit-store";

function CreateJenisAudit({ onAddSuccess }) {
  // initialize create modal
  const [showCreateJenisAudit, setShowCreateJenisAudit] = useState(false);

  // handle create modal
  const handleShowCreateJenisAudit = () => setShowCreateJenisAudit(true);
  const handleCloseCreateJenisAudit = () => {
    setShowCreateJenisAudit(false);
    reset();
  };

  // form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // initialize store
  const createJenisAudit = useJenisAuditStore((state) => state.createJenisAudit);

  // handle create
  const onSubmit = (data) => {
    createJenisAudit(data, () => {
      handleCloseCreateJenisAudit();
      // reload the table
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateJenisAudit}>
        Tambah
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
                    placeholder="Masukkan jenis audit"
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
            Tambah Jenis Audit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJenisAudit;
