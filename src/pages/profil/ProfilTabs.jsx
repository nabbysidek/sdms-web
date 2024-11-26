import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import SetPassword from "./SetPassword";
import UserDetails from "./UserDetails";

function ProfilTabs({ userInfo }) {
  // ----------- FE ------------
  const [key, setKey] = useState("user-details");

  return (
    <>
      <Tabs id="profile-tabs" className="tabs-container" activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="user-details" title="Your information">
          <UserDetails 
            userInfo={userInfo} 
          />
        </Tab>
        <Tab eventKey="change-password" title="Set New Password">
          <SetPassword 
            userInfo={userInfo} 
          />
        </Tab>
      </Tabs>
    </>
  );
}

export default ProfilTabs;
