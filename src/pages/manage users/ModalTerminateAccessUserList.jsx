import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function ModalTerminateAccessUserList({ disableBlockButton, userId, refetchUserList }) {
  // -------------------- State Management ---------------------------
  const [showModal, setShowModal] = useState(false);

  // Handlers for opening and closing the modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Form validation hook (currently unused but can be extended)
  const { handleSubmit } = useForm();

  // -------------------- API Request to Block Access ---------------------------
  const handleBlockAccess = async () => {
    try {
      const response = await axiosCustom.put(`manage-users/user-list/block-access/${userId}`);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success, // Success message from backend
        });

        // Refresh user list after blocking access
        if (refetchUserList) refetchUserList();

        handleCloseModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.error || "An error occurred.", // Handles missing messages
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Failed to block access.", // Prevents crashing on missing error response
      });
    }
  };

  return (
    <>
      {/* Block Access Button */}
      <Button className="delete-btn" onClick={handleShowModal} disabled={disableBlockButton}>
        Block Access
      </Button>

      {/* Block Access Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Block Access</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>Are you sure you want to block this auditor's access?</Modal.Body>
          <Modal.Footer>
            <Button className="btn-secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button className="btn-primary" onClick={handleSubmit(handleBlockAccess)}>
              Block Access
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalTerminateAccessUserList;
