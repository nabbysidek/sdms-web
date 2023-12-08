import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function CreateJenisAudit() {
  // ----------FE----------
  const [showCreateJenisAudit, setShowCreateJenisAudit] = useState(false);

  const handleCloseCreateJenisAudit = () => setShowCreateJenisAudit(false);
  const handleShowCreateJenisAudit = () => setShowCreateJenisAudit(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // Form input
  const [jenisAuditInput, setJenisAuditInput] = useState({
    namaJenisAudit: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJenisAuditInput({
      ...jenisAuditInput,
      [name]: value,
    });
  };

  // ----------BE----------
  // Create jenis audit
  const createJenisAudit = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tetapan-kriteria/jenis-audit`,
        jenisAuditInput
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berjaya",
          text: response.data.message, // Access the message from the backend response
        });
        console.log("Jenis audit berjaya ditambah");
        handleCloseCreateJenisAudit();
      }
    } catch (error) {
      console.log("Api respond is not as expected");
    }
  };

  const onSubmit = (data) => {
    handleCloseCreateJenisAudit();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
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
          <Form>
            <Form.Group>
              <Form.Label>Nama Jenis Audit</Form.Label>
              <Controller
                name="jenisAudit"
                control={control}
                rules={{
                  required: "Nama jenis audit baru diperlukan",
                }}
                render={({ field }) => (
                  <>
                    <FormControl
                      type="text"
                      id="namaJenisAudit"
                      name="namaJenisAudit"
                      onChange={(e) => {
                        handleInputChange(e);
                        field.onChange(e);
                      }}
                      placeholder="Nama Jenis Audit Baharu"
                    />
                    {errors?.jenisAudit && (
                      <span className="error-message">
                        {errors.jenisAudit.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={createJenisAudit}>
            Tambah Jenis Audit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJenisAudit;
