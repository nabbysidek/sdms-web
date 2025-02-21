import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import SetPassword from "./SetPassword";
import UserDetails from "./UserDetails";

function ProfileTabs({ userInfo }) {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("user-details");

  return (
    <Tabs
      id="profile-tabs"
      className="tabs-container"
      activeKey={activeTab}
      onSelect={(selectedTab) => setActiveTab(selectedTab)}
    >
      {/* User Details Tab */}
      <Tab eventKey="user-details" title="Your Information">
        <UserDetails userInfo={userInfo} />
      </Tab>

      {/* Change Password Tab */}
      <Tab eventKey="change-password" title="Set New Password">
        <SetPassword userInfo={userInfo} />
      </Tab>
    </Tabs>
  );
}

export default ProfileTabs;
