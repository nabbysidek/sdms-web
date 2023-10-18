import React, { useState, useEffect } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import SetPassword from "./SetPassword";
import UserDetails from "./UserDetails";

function Profile() {
  const [key, setKey] = useState("user-details");

  return (
    <>
      {/* Page title section */}
      <h3 className="pageTitle">Tetapan Profil Pengguna</h3>
      <hr />

      {/* Page content section */}
      <Container>
        {/* Page content: User details */}
        <div className="userBasicDetails">
          <BsPersonCircle />
          <p>atiqahgan@aim.gov.my</p>
        </div>

        <div className="userFunctions">
          <Tabs id="profile-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey="user-details" title="User Details">
              <UserDetails />
            </Tab>
            <Tab eventKey="change-password" title="Change Password">
              <SetPassword />
            </Tab>
          </Tabs>
        </div>
      </Container>
    </>
  );
}

export default Profile;
