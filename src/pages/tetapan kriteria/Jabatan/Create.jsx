import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";
import useJabatanStore from "../../../store/jabatan-store";

function CreateJabatan({bahagianOptions, onAddSuccess}) {
  // INITIALIZE CREATE JABATAN MODAL
  const [showCreateJabatan, setShowCreateJabatan] = useState(false);

  // HANDLE DISPLAY OF CREATE JABATAN MODAL
  const handleShowCreateJabatan = () => setShowCreateJabatan(true);
  const handleCloseCreateJabatan = () => {
    setShowCreateJabatan(false);
    reset();
  };

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF JABATAN STORE
  const createJabatan = useJabatanStore((state) => state.createJabatan);

  //  HANDLE CREATE A NEW OF JABATAN
  const onSubmit = (data) => {
    createJabatan(data, () => {
      handleCloseCreateJabatan();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateJabatan}>
        Add Department
      </Button>

      <Modal
        show={showCreateJabatan}
        onHide={handleCloseCreateJabatan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Division</Form.Label>
              <Controller
                id="bahagianId"
                name="bahagianId"
                control={control}
                rules={{ required: "A division is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select onChange={onChange} value={value}>
                      <option value="">
                        Select a Division
                      </option>
                      {bahagianOptions.map((bahagian) => (
                        <option key={bahagian.value} value={bahagian.value}>
                          {bahagian.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.bahagianId && (
                      <span className="error-message">
                        {errors.bahagianId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Controller
                id="namaJabatan"
                name="namaJabatan"
                control={control}
                defaultValue=""
                rules={{
                  required: "A department is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter department . . ."
                      autoFocus
                    />
                    {errors.namaJabatan && (
                      <span className="error-message">
                        {errors.namaJabatan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="create-new-modal-btn"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJabatan;
