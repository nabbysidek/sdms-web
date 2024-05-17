import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import axiosCustom from "../../../axios";
import Swal from "sweetalert2";

function EditUnit({unit, jabatanOptions}) {
  // ----------- FE --------
  //  Handle modal
  const [showEditUnit, setShowEditUnit] = useState(false);

  const handleCloseEditUnit = () => setShowEditUnit(false);
  const handleShowEditUnit = () => setShowEditUnit(true);

  // Form validation
  const { control, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

// ------------ BE -------------
  // Handle update unit
  const updateUnit = async (unitInput) => {
    
    try {
      // Log unitInput to see the data being sent to the server
      console.log('Data being sent to server:', unitInput);

      // Ensure unitId is defined and contains the correct value
      console.log('unitId:', unit.id);

      const response = await axiosCustom.put(
          `tetapan-kriteria/unit/${unit.id}`,
          unitInput
      );

      if (response.status === 200) {
          Swal.fire({
              icon: "success",
              title: "Berjaya",
              text: response.data.success, 
          });
          console.log("Unit berjaya dikemaskini");
          handleCloseEditUnit();
      }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: error.response.data.error, 
  });
  }
};

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditUnit}>
        Kemaskini
      </Button>

      <Modal
        show={showEditUnit}
        onHide={handleCloseEditUnit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kemaskini Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Jabatan</Form.Label>
              <Controller
                name="jabatanId"
                id="jabatanId"
                control={control}
                defaultValue={unit.jabatanId}
                rules={{ required: "Sila pilih jabatan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Select
                      aria-label="jabatanSelect"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="" disabled>Pilih Jabatan</option>
                      {jabatanOptions.map((jabatan) => (
                        <option key={jabatan.value} value={jabatan.value}>
                          {jabatan.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors?.jabatanId && (
                      <span className="error-message">
                        {errors.jabatanId.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Unit</Form.Label>
              <Controller
                name="namaUnit"
                id="namaUnit"
                control={control}
                defaultValue={unit.namaUnit}
                rules={{ required: "Unit baru diperlukan" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Unit"
                    />
                    {errors?.Unit && (
                      <span className="error-message">
                        {errors.Unit.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="edit-modal-btn" onClick={handleSubmit(updateUnit)}>
            Kemaskini Unit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditUnit;
