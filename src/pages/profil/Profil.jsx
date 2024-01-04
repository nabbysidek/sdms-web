import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import ProfilTabs from "./ProfilTabs";
import "./Profil.css";

function Profile() {
  return (
    <>
      {/* Page title section */}
      <div className="pageTitle">
        <h2>Tetapan Profil Pengguna</h2>
      </div>
      <hr />

      {/* Page content section */}
      <div className="profilePageContent">
        {/* Page content: User details */}
        <div className="userBasicDetails">
          <BsPersonCircle size={100} />
          <p class="staffEmail">atiqahgan@aim.gov.my</p>
        </div>

        {/* Tabs section */}
        <ProfilTabs />
      </div>
    </>
  );
}

export default Profile;
