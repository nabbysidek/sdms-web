import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateJenisAudit() {
  // ----------FE----------
  const [showCreateJenisAudit, setShowCreateJenisAudit] = useState(false);

  const handleShowCreateJenisAudit = () => setShowCreateJenisAudit(true);
  const handleCloseCreateJenisAudit = () => {
    setShowCreateJenisAudit(false);
    reset();
  };

  // Form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // ----------BE----------
  // Create jenis audit
  const createJenisAudit = async (jenisAuditInput) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/jenis-audit`,
        jenisAuditInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.success, // Access the message from the backend response
        });
        console.log("Jenis audit berjaya ditambah");
        handleCloseCreateJenisAudit();
      }
    } catch (error) {
      console.log("Jenis audit tidak berjaya ditambah");
    }
  };

  return (
    <div>
      <Button className="tambahBtn" onClick={handleShowCreateJenisAudit}>
        Tambah Jenis Audit
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
          <Form onSubmit={handleSubmit(createJenisAudit)} onReset={reset}>
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
          <Button className="modalBtn" onClick={handleSubmit(createJenisAudit)}>
            Tambah Jenis Audit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJenisAudit;
