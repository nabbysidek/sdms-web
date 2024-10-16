import React, { useState, useCallback, useEffect } from "react";
import { BsPersonCircle } from "react-icons/bs";
import ProfilTabs from "./ProfilTabs";
import "../../assets/styles/styles_profile.css";
import axiosCustom from "../../axios";

function Profile() {
  // ----------- BE ------------
  // Show current user info
  const [userInfo, setUserInfo] = useState();

  const showUserInfo = useCallback(async () => {
    try {
      const response = await axiosCustom.get('user');

      if (response.status >= 200 && response.status < 300) {
        setUserInfo(response.data);
      }
      else {
        console.log(response);
      }
    }
    catch {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    showUserInfo();
  }, [showUserInfo]);

  return (
    <>
      <div className="page-title">
        <h2>View Profile</h2>
      </div>
      <hr />

      <div className="profile-content">
        <div className="user-details-container">
          <BsPersonCircle size={100} />
          {userInfo && (
            <p className="profile-user-email">{userInfo.emelAuditor}</p>
          )}
        </div>

        {/* Tabs section */}
        <ProfilTabs
          userInfo={userInfo} // Pass response data as props
        />
      </div>
    </>
  );
}

export default Profile;
