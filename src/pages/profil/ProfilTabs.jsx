import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import SetPassword from "./SetPassword";
import UserDetails from "./UserDetails";

function ProfilTabs() {
    const [key, setKey] = useState("user-details");

  return (
    <>
        <Tabs id="profile-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab eventKey="user-details" title="Maklumat Pengguna">
            <UserDetails />
          </Tab>
          <Tab eventKey="change-password" title="Set Kata Laluan">
            <SetPassword />
          </Tab>
        </Tabs>
    </>
  )
}

export default ProfilTabs
