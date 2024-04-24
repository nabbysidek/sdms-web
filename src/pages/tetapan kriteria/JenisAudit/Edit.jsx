import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axiosCustom from "../../../axios";
import Swal from "sweetalert2";

function EditJenisAudit({jenisAudit}) {
  // ----------- FE --------
  //  Handle modal
  const [showEditJenisAudit, setShowEditJenisAudit] = useState(false);

  const handleCloseEditJenisAudit = () => setShowEditJenisAudit(false);
  const handleShowEditJenisAudit = () => setShowEditJenisAudit(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // ------------ BE -------------
  // Set default values when the kemas kini modal is opened
  const updateJenisAudit = async (jenisAuditInput) => {
    
    try {
      // Log jenisAuditInput to see the data being sent to the server
      console.log('Data being sent to server:', jenisAuditInput);

      // Ensure jenisAuditId is defined and contains the correct value
      console.log('jenisAuditId:', jenisAudit.id);

      const response = await axiosCustom.put(
          `http://127.0.0.1:8000/api/tetapan-kriteria/jenis-audit/${jenisAudit.id}`,
          jenisAuditInput
      );

      if (response.status === 200) {
          Swal.fire({
              icon: "success",
              title: "Berjaya",
              text: response.data.success, // Access the message from the backend response
          });
          console.log("Jenis audit berjaya dikemaskini");
          handleCloseEditJenisAudit();
      }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: error.response.data.error, // Access the message from the backend response
    });
  }
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
          <Form onSubmit={handleSubmit(updateJenisAudit)}>
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
          <Button className="edit-modal-btn" onClick={handleSubmit(updateJenisAudit)}>
            Kemaskini Jenis Audit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditJenisAudit;
