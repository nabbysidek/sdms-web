import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import useMisdemeanorCategoryStore from "../../../store/misdemeanor-category-store";

function CreateMisdemeanorCategory({ onAddSuccess }) {
  const [showCreateMisdemeanorCategory, setShowCreateMisdemeanorCategory] = useState(false);

  const handleShowCreateMisdemeanorCategory = () => setShowCreateMisdemeanorCategory(true);
  const handleCloseCreateMisdemeanorCategory = () => {
    setShowCreateMisdemeanorCategory(false);
    reset();
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const createMisdemeanorCategory = useMisdemeanorCategoryStore(
    (state) => state.createMisdemeanorCategory
  );

  const onSubmit = (data) => {
    createMisdemeanorCategory(data, () => {
      handleCloseCreateMisdemeanorCategory();
      if (onAddSuccess) onAddSuccess();
    });
  };

  return (
    <div>
      <Button className="create-new-btn" onClick={handleShowCreateMisdemeanorCategory}>
        Add Misdemeanor Category
      </Button>

      <Modal
        show={showCreateMisdemeanorCategory}
        onHide={handleCloseCreateMisdemeanorCategory}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Misdemeanor Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Misdemeanor Category</Form.Label>
              <Controller
                name="namaMisdemeanorCategory"
                id="namaMisdemeanorCategory"
                control={control}
                defaultValue=""
                rules={{ required: "A misdemeanor category is required" }}
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    value={value}
                    placeholder="Enter a misdemeanor category . . ."
                    autoFocus
                  />
                )}
              />
              {errors.namaMisdemeanorCategory && (
                <span className="error-message">
                  {errors.namaMisdemeanorCategory.message}
                </span>
              )}
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

export default CreateMisdemeanorCategory;
