import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useMisdemeanorCategoryStore from "../../../store/misdemeanor-category-store";

function EditMisdemeanorCategory({ misdemeanorCategory, onUpdateSuccess }) {
  const [showEditMisdemeanorCategory, setShowEditMisdemeanorCategory] = useState(false);

  const handleCloseEditMisdemeanorCategory = () => setShowEditMisdemeanorCategory(false);
  const handleShowEditMisdemeanorCategory = () => setShowEditMisdemeanorCategory(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { updateMisdemeanorCategory } = useMisdemeanorCategoryStore();

  const onSubmit = (misdemeanorCategoryInput) => {
    updateMisdemeanorCategory(
      misdemeanorCategory.id,
      misdemeanorCategoryInput,
      handleCloseEditMisdemeanorCategory,
      onUpdateSuccess
    );
  };

  useEffect(() => {
    if (showEditMisdemeanorCategory) {
      reset({
        namaMisdemeanorCategory: misdemeanorCategory.namaMisdemeanorCategory,
      });
    }
  }, [showEditMisdemeanorCategory, misdemeanorCategory, reset]);

  return (
    <div>
      <Button className="edit-tetapan-btn" onClick={handleShowEditMisdemeanorCategory}>
        Edit
      </Button>

      <Modal
        show={showEditMisdemeanorCategory}
        onHide={handleCloseEditMisdemeanorCategory}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Misdemeanor Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Misdemeanor Category</Form.Label>
              <Controller
                name="namaMisdemeanorCategory"
                id="namaMisdemeanorCategory"
                control={control}
                defaultValue={misdemeanorCategory.namaMisdemeanorCategory}
                rules={{ required: "A misdemeanor category is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Enter a misdemeanor category . . ."
                    />
                    {errors?.namaMisdemeanorCategory && (
                      <span className="error-message">
                        {errors.namaMisdemeanorCategory.message}
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
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditMisdemeanorCategory;
