import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";

function EditKakitangan() {
  // ----- FE ---------
  // Handle modal
  const [showEditKakitangan, setShowEditKakitangan] = useState(false);

  const handleCloseEditKakitangan = () => setShowEditKakitangan(false);
  const handleShowEditKakitangan = () => setShowEditKakitangan(true);

  // Form validation
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    handleCloseEditKakitangan();
    // Perform your submit logic here
    console.log("Form submitted with data:", data);
  };

  return (
    <div>
      <Button className="editBtn" onClick={handleShowEditKakitangan}>
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
          <Form>
            <Form.Group>
              <Form.Label>Wilayah</Form.Label>
              <Controller
                name="wilayah"
                control={control}
                rules={{ required: "Sila pilih wilayah" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="wilayahSelect"
                      onChange={(e) => {
                        setValue("wilayah", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Wilayah</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                    {errors?.bahagian && (
                      <span className="error-message">
                        {errors.bahagian.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Cawangan</Form.Label>
              <Controller
                name="cawangan"
                control={control}
                rules={{ required: "Sila pilih cawangan" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="cawanganSelect"
                      onChange={(e) => {
                        setValue("cawangan", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Cawangan</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                    {errors?.cawangan && (
                      <span className="error-message">
                        {errors.cawangan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Bahagian</Form.Label>
              <Controller
                name="bahagian"
                control={control}
                rules={{ required: "Sila pilih bahagian" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="bahagianSelect"
                      onChange={(e) => {
                        setValue("bahagian", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Bahagian</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                    {errors?.bahagian && (
                      <span className="error-message">
                        {errors.bahagian.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Jabatan</Form.Label>
              <Controller
                name="jabatan"
                control={control}
                rules={{ required: "Sila pilih jabatan" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="jabatanSelect"
                      onChange={(e) => {
                        setValue("jabatan", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Jabatan</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                    {errors?.jabatan && (
                      <span className="error-message">
                        {errors.jabatan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Unit</Form.Label>
              <Controller
                name="unit"
                control={control}
                rules={{ required: "Sila pilih unit" }}
                render={({ field }) => (
                  <>
                    <Form.Select
                      aria-label="unitSelect"
                      onChange={(e) => {
                        setValue("unit", e.target.value);
                      }}
                      {...field}
                    >
                      <option value="">Pilih Unit</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                    {errors?.unit && (
                      <span className="error-message">
                        {errors.unit.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Nama Kakitangan</Form.Label>
              <Controller
                name="namaKakitangan"
                control={control}
                rules={{ required: "Nama kakitangan baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Nama Kakitangan"
                      {...field}
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

            <Form.Group>
              <Form.Label>ID Kakitangan</Form.Label>
              <Controller
                name="idKakitangan"
                control={control}
                rules={{ required: "ID kakitangan baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="ID Kakitangan"
                      {...field}
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
              <Form.Label>Jawatan Kakitangan</Form.Label>
              <Controller
                name="jawatanKakitangan"
                control={control}
                rules={{ required: "Jawatan kakitangan baru diperlukan" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Jawatan kakitangan"
                      {...field}
                    />
                    {errors?.jawatanKakitangan && (
                      <span className="error-message">
                        {errors.jawatanKakitangan.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" onClick={handleSubmit(onSubmit)}>
            Kemaskini Kakitangan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditKakitangan;
