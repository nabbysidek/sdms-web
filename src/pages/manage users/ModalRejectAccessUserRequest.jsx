import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function ModalRejectAccessUserRequest({ id_user, refetchAccessRequests }) {
  // -------------------- State Management ---------------------------
  const [showModal, setShowModal] = useState(false);

  // Handlers for opening and closing the modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Form validation hook (currently unused but can be extended)
  const { handleSubmit } = useForm();

  // -------------------- API Request to Reject Access ---------------------------
  const handleRejectAccess = async () => {
    try {
      const response = await axiosCustom.put(`manage-users/access-requests/reject/${id_user}`);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success, // Success message from backend
        });

        // Refresh request list after rejection
        if (refetchAccessRequests) refetchAccessRequests();

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
        text: error.response?.data?.error || "Failed to reject access.", // Prevents crashing on missing error response
      });
    }
  };

  return (
    <>
      {/* Reject Access Button */}
      <Button className="delete-btn" onClick={handleShowModal}>
        Reject Access
      </Button>

      {/* Reject Access Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Access</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>Are you sure you want to reject this access request?</Modal.Body>
          <Modal.Footer>
            <Button className="btn-secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button className="btn-primary" onClick={handleSubmit(handleRejectAccess)}>
              Reject Access
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalRejectAccessUserRequest;
