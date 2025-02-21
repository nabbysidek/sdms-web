import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function ModalAllowAccessUserList({ disableRestoreButton, id_user, refetchUserList }) {
  // -------------------- State Management ---------------------------
  const [showModal, setShowModal] = useState(false);

  // Handlers for opening and closing the modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Form validation hook (currently unused but can be extended)
  const { handleSubmit } = useForm();

  // -------------------- API Request to Restore Access ---------------------------
  const handleRestoreAccess = async () => {
    try {
      const response = await axiosCustom.put(`manage-users/users-list/restore-access/${id_user}`);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success, // Success message from backend
        });

        // Refetch user list after success
        if (refetchUserList) {
          refetchUserList();
        }

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
        text: error.response?.data?.error || "Failed to restore access.", // Prevents crashing on missing error response
      });
    }
  };

  return (
    <>
      {/* Restore Access Button */}
      <Button className="allow-btn" onClick={handleShowModal} disabled={disableRestoreButton}>
        Restore Access
      </Button>

      {/* Restore Access Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Restore Access</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>Are you sure you want to restore this auditor's access?</Modal.Body>
          <Modal.Footer>
            <Button className="btn-secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button className="btn-primary" onClick={handleSubmit(handleRestoreAccess)}>
              Restore Access
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalAllowAccessUserList;
