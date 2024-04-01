import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Modal, Form } from "react-bootstrap";

function EditAktivitiSemakan() {
    // ----------------- FE -----------------
    // Manage modal visibility
    const [ showEditAktivitiSemakan, setShowEditAktivitiSemakan ] = useState(false);

    const handleCloseEditAktivitiSemakan = () => setShowEditAktivitiSemakan(false);
    const handleShowEditAktivitiSemakan = () => setShowEditAktivitiSemakan(true);

    // Form submission and validation
    const {
        control,
        handleSubmit, 
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        handleCloseEditBahagianm();
        console.log("Form submitted with data:", data);
      };

  return (
    <div>
        <Button className='edit-tetapan-btn'>Kemaskini</Button>

        <Modal show={showEditAktivitiSemakan} onHide={handleCloseEditAktivitiSemakan} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Kemaskini Aktiviti Semakan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>Nama Aktiviti Semakan</Form.Label>
                        <Controller name="namaAktivitiSemakan" control={control} rules={{required: "Nama aktiviti semakan baru diperlukan"}} render={({ field }) => (
                            <>
                                <Form.Control type="text" placeholder="Aktiviti Semakan" {...field}/>
                                {errors?.aktivitiSemakan && (
                                    <span className='error-message'>
                                        {errors.aktivitiSemakan.message}
                                    </span>
                                )}
                            </>
                        )} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='edit-modal-btn' onClick={handleSubmit(onSubmit)}>
                    Kemaskini Aktiviti Semakan
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default EditAktivitiSemakan;
