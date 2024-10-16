import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useKriteriaKetidakpatuhanStore from "../../../store/kriteria-ketidakpatuhan-store";

function CreateKriteriaKetidakpatuhan({aktivitiSemakanOptions, onAddSuccess}) {
  // INITIALIZE CREATE KRITERIA KETIDAKPATUHAN MODAL
  const [showCreateKriteriaKetidakpatuhan, setShowCreateKriteriaKetidakpatuhan] = useState(false);

  // HANDLE DISPLAY OF CREATE KRITERIA KETIDAKPATUHAN MODAL
  const handleShowCreateKriteriaKetidakpatuhan = () => setShowCreateKriteriaKetidakpatuhan(true);
  const handleCloseCreateKriteriaKetidakpatuhan = () => {
    setShowCreateKriteriaKetidakpatuhan(false);
    reset();
  };

  // FORM VALIDATION FOR MODAL
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // USE OF KRITERIA KETIDAKPATUHAN STORE
  const createKriteriaKetidakpatuhan = useKriteriaKetidakpatuhanStore((state) => state.createKriteriaKetidakpatuhan);

  //  HANDLE CREATE A NEW OF KRITERIA KETIDAKPATUHAN
  const onSubmit = (data) => {
    createKriteriaKetidakpatuhan(data, () => {
      handleCloseCreateKriteriaKetidakpatuhan();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateKriteriaKetidakpatuhan}>
        Add Noncompliance
      </Button> 

      <Modal
        show={showCreateKriteriaKetidakpatuhan}
        onHide={handleCloseCreateKriteriaKetidakpatuhan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Noncompliance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            onReset={reset}
          >
            <Form.Group>
              <Form.Label>Activitiy Review</Form.Label>
              <Controller
                id="aktivitiSemakanId"
                name="aktivitiSemakanId"
                control={control}
                rules={{ required: "An activity review is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select aria-label="aktivitiSemakanSelect" onChange={onChange} value={value}>
                      <option value="">
                        Select an Activity Review
                      </option>
                      {aktivitiSemakanOptions.map((aktivitiSemakan) => (
                        <option key={aktivitiSemakan.value} value={aktivitiSemakan.value}>
                          {aktivitiSemakan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.aktivitiSemakanId && (
                      <span className="error-message">
                        {errors.aktivitiSemakanId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Noncompliance</Form.Label>
              <Controller
                id="namaKriteriaKetidakpatuhan"
                name="namaKriteriaKetidakpatuhan"
                defaultValue=""
                control={control}
                rules={{
                  required: "A noncompliance is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter noncompliance . . ."
                      autoFocus
                    />
                    {errors.namaKriteriaKetidakpatuhan && (
                      <span className="error-message">
                        {errors.namaKriteriaKetidakpatuhan.message}
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

export default CreateKriteriaKetidakpatuhan;
