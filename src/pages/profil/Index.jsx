import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import ProfilTabs from "./ProfilTabs";
import "../../assets/styles/styles_profile.css";

function Profile() {
  return (
    <>
      <div className="page-title">
        <h2>Tetapan Profil Pengguna</h2>
      </div>
      <hr />

      <div className="profile-content">
        <div className="user-details-container">
          <BsPersonCircle size={100} />
          <p class="profile-user-email">emelkakitangan@aim.gov.my</p>
        </div>

        {/* Tabs section */}
        <ProfilTabs />
      </div>
    </>
  );
}

export default Profile;
