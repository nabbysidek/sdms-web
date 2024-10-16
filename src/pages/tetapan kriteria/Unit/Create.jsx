import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import useUnitStore from "../../../store/unit-store";

function CreateUnit({jabatanOptions, onAddSuccess}) {
  // INITIALIZE CREATE AKTIVITI SEMAKAN MODAL
  const [showCreateUnit, setShowCreateUnit] = useState(false);

  // HANDLE DISPLAY OF CREATE AKTIVITI SEMAKAN MODAL
  const handleShowCreateUnit = () => setShowCreateUnit(true);
  const handleCloseCreateUnit = () => {
    setShowCreateUnit(false);
    reset();
  };

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF AKTIVITI SEMAKAN STORE
  const createUnit = useUnitStore((state) => state.createUnit);

  //  HANDLE CREATE A NEW OF AKTIVITI SEMAKAN
  const onSubmit = (data) => {
    createUnit(data, () => {
      handleCloseCreateUnit();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateUnit}>
        Add Unit
      </Button>

      <Modal
        show={showCreateUnit}
        onHide={handleCloseCreateUnit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Controller
                id="jabatanId"
                name="jabatanId"
                control={control}
                rules={{ required: "A department is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select onChange={onChange} value={value}>
                      <option value="">
                        Select a Department
                      </option>
                      {jabatanOptions.map((jabatan) => (
                        <option key={jabatan.value} value={jabatan.value}>
                          {jabatan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.jabatanId && (
                      <span className="error-message">
                        {errors.jabatanId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Unit</Form.Label>
              <Controller
                id="namaUnit"
                name="namaUnit"
                control={control}
                defaultValue=""
                rules={{ required: "A unit is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <FormControl
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter unit . . ."
                      autoFocus
                    />
                    {errors.namaUnit && (
                      <span className="error-message">
                        {errors.namaUnit.message}
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

export default CreateUnit;
