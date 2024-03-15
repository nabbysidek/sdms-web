import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import SetPassword from "./SetPassword";
import UserDetails from "./UserDetails";

function ProfilTabs({ userInfo }) {
  // ----------- FE ------------
  const [key, setKey] = useState("user-details");

  return (
    <>
      <Tabs id="profile-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="user-details" title="Maklumat Pengguna">
          <UserDetails 
            userInfo={userInfo} 
          />
        </Tab>
        <Tab eventKey="change-password" title="Set Kata Laluan">
          <SetPassword 
            userInfo={userInfo} 
          />
        </Tab>
      </Tabs>
    </>
  );
}

export default ProfilTabs;
