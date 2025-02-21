import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function ModalAllowAccessUserRequest({ 
  disableGrantButton, 
  id_user, 
  refetchAccessRequests, 
  refetchUserList 
}) {
  // -------------------- State Management ---------------------------
  const [showModal, setShowModal] = useState(false);

  // Handlers for opening and closing the modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Form validation hook (currently unused but can be extended)
  const { handleSubmit } = useForm();

  // -------------------- API Request to Grant Access ---------------------------
  const handleGrantAccess = async () => {
    try {
      const response = await axiosCustom.put(`manage-users/access-requests/approve/${id_user}`);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success, // Success message from backend
        });

        // Refresh request list and user list after success
        if (refetchAccessRequests) refetchAccessRequests();
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
        text: error.response?.data?.error || "Failed to grant access.", // Prevents crashing on missing error response
      });
    }
  };

  return (
    <>
      {/* Grant Access Button */}
      <Button className="allow-btn" onClick={handleShowModal} disabled={disableGrantButton}>
        Grant Access
      </Button>

      {/* Grant Access Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Grant Access</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>Are you sure you want to grant access to this requester?</Modal.Body>
          <Modal.Footer>
            <Button className="btn-secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button className="btn-primary" onClick={handleSubmit(handleGrantAccess)}>
              Grant Access
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalAllowAccessUserRequest;
