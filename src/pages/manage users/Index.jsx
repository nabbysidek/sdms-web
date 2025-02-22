import React, { useEffect, useState, useCallback } from "react";
import { Table, Dropdown, Container } from "react-bootstrap";
import ModalAllowAccessUserRequest from "./ModalAllowAccessUserRequest";
import ModalAllowAccessUserList from "./ModalAllowAccessUserList";
import ModalRejectAccessUserRequest from "./ModalRejectAccessUserRequest";
import ModalTerminateAccessUserList from "./ModalTerminateAccessUserList";
import "../../assets/styles/styles_manage_users.css";
import axiosCustom from "../../axios";
import Swal from "sweetalert2";

function IndexManageUsers() {
  // State management
  const [requestAccess, setRequestAccess] = useState([]);
  const [userList, setUserList] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  // Fetch function for both requestAccess & userList
  const fetchData = async (endpoint, setter) => {
    try {
      const response = await axiosCustom.get(endpoint);
      if (response.status >= 200 && response.status < 300) {
        setter(response.data);
      } else {
        console.log("Error fetching:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchData("manage-users/manage-users/request-access", setRequestAccess);
    fetchData("manage-users/manage-users/users-list", setUserList);
  }, []);

  // Fetch available roles
  const fetchRoles = useCallback(async () => {
    try {
      const response = await axiosCustom.get("/get-role");
      if (Array.isArray(response.data)) {
        setRoleOptions(response.data.map((role) => ({
          value: role.id,
          label: role.nameRole,
        })));
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // Helper function to get role label from roleId
  const getRoleLabel = (roleId) => {
    return roleOptions.find((role) => role.value === roleId)?.label || "Unassigned Role";
  };

  // Handle role change
  const handleChangeRole = async (id_user, roleId) => {
    try {
      const response = await axiosCustom.put(`manage-users/users-list/role/${id_user}`, { roleId });

      if (response.status === 200) {
        setUserList((prevUsers) =>
          prevUsers.map((user) => (user.id === id_user ? { ...user, roleId } : user))
        );
        Swal.fire({ icon: "success", title: "Success", text: response.data.success });
      }
    } catch (error) {
      console.error("Role change error:", error);
      Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.error || "An error occurred" });
    }
  };

  return (
    <>
      <div className="page-title">
        <h2>Manage Users</h2>
        <hr />
        <h3>List of Access Requests</h3>
      </div>

      <Container fluid>
        <hr />
        {/* Access Requests Table */}
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Staff ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestAccess.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <center>No new access requests.</center>
                </td>
              </tr>
            ) : (
              requestAccess.map((req, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{req.id_user}</td>
                  <td>{req.name}</td>
                  <td>{req.email}</td>
                  <td>
                    <ModalAllowAccessUserRequest id_user={req.id} refetchPermohonanAkses={() => fetchData("manage-users/manage-users/request-access", setRequestAccess)} refetchUsersList={() => fetchData("manage-users/manage-users/users-list", setUserList)} />
                    <ModalRejectAccessUserRequest id_user={req.id} refetchPermohonanAkses={() => fetchData("manage-users/manage-users/request-access", setRequestAccess)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {/* Registered Auditors Table */}
        <h4 className="page-title">List of Registered Auditors</h4>
        <hr />
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Staff ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <center>No registered auditors.</center>
                </td>
              </tr>
            ) : (
              userList.map((user, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{user.id_user}</td>
                  <td>{user.name_user}</td>
                  <td>{user.email_user}</td>
                  <td>{user.userStatus}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle className="user-level-btn">
                        {getRoleLabel(user.roleId)}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="user-level-item">
                        {roleOptions.map((roleOption) => (
                          <Dropdown.Item key={roleOption.value} onClick={() => handleChangeRole(user.id, roleOption.value)}>
                            {roleOption.label}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>
                    <ModalAllowAccessUserList disableButtonBenar={user.userStatus === "BENAR"} id_user={user.id} refetchUsersList={() => fetchData("manage-users/manage-users/users-list", setUserList)} />
                    <ModalTerminateAccessUserList disableButtonSekat={user.userStatus === "SEKAT"} id_user={user.id} refetchUsersList={() => fetchData("manage-users/manage-users/users-list", setUserList)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default IndexManageUsers;
