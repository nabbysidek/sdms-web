import React, { useState, useCallback, useEffect } from "react";
import { BsPersonCircle } from "react-icons/bs";
import ProfileTabs from "./ProfileTabs";
import "../../assets/styles/styles_profile.css";
import axiosCustom from "../../axios";

function Profile() {
  // State to store the current user info
  const [userInfo, setUserInfo] = useState(null);

  // Fetch user information from the API
  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await axiosCustom.get("user");

      if (response.status >= 200 && response.status < 300) {
        setUserInfo(response.data);
      } else {
        console.warn("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, []);

  // Fetch user info on component mount
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <>
      <div className="page-title">
        <h2>View Profile</h2>
      </div>
      <hr />

      <div className="profile-content">
        <div className="user-details-container">
          {/* User Avatar Icon */}
          <BsPersonCircle size={100} />

          {/* Display user email if available */}
          {userInfo?.email_user && <p className="profile-user-email">{userInfo.email_user}</p>}
        </div>

        {/* Profile Tabs Section */}
        <ProfileTabs userInfo={userInfo} />
      </div>
    </>
  );
}

export default Profile;
