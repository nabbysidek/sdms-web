import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import ProfilTabs from "./ProfilTabs";
import "./Profil.css";

function Profile() {
  return (
    <>
      <div className="pageTitle">
        <h2>Tetapan Profil Pengguna</h2>
      </div>
      <hr />

      <div className="profilePageContent">
        <div className="userBasicDetails">
          <BsPersonCircle size={100} />
          <p class="staffEmail">emelkakitangan@aim.gov.my</p>
        </div>

        {/* Tabs section */}
        <ProfilTabs />
      </div>
    </>
  );
}

export default Profile;
