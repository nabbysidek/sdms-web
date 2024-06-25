import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useKakitanganStore from "../../../store/kakitangan-store";

function EditKakitangan({kakitangan, onUpdateSuccess}) {
  // initialize edit modal
  const [showEditKakitangan, setShowEditKakitangan] = useState(false);

  // handle edit modal
  const handleCloseEditKakitangan = () => setShowEditKakitangan(false);
  const handleShowEditKakitangan = () => setShowEditKakitangan(true);

  // form validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();


  // initialize store
  const { updateKakitangan } = useKakitanganStore();

  // handle update kakitangan
  const onSubmit = (kakitanganInput) => {
    updateKakitangan(kakitangan.id, kakitanganInput, handleCloseEditKakitangan, onUpdateSuccess);
  };

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditKakitangan}>
        Kemaskini
      </Button>

      <Modal
        show={showEditKakitangan}
        onHide={handleCloseEditKakitangan}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Kakitangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <Form.Group>
              <Form.Label>ID Kakitangan</Form.Label>
              <Controller
                id="idKakitangan"
                name="idKakitangan"
                control={control}
                defaultValue={kakitangan.idKakitangan}
                rules={{ required: "ID kakitangan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="ID Kakitangan"
                    />
                    {errors?.idKakitangan && (
                      <span className="error-message">
                        {errors.idKakitangan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nama Kakitangan</Form.Label>
              <Controller
                id="namaKakitangan"
                name="namaKakitangan"
                control={control}
                defaultValue={kakitangan.namaKakitangan}
                rules={{ required: "Nama kakitangan baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Nama Kakitangan"
                    />
                    {errors?.namaKakitangan && (
                      <span className="error-message">
                        {errors.namaKakitangan.message}
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
            Kemaskini Kakitangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditKakitangan;
