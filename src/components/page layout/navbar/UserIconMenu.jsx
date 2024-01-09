import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/styles/styles_layout.css";

const UserIconMenu = ({ closeMobileNav }) => {
  // ----------- FE ------------
  // For the visibility of the profile menu
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    if (!isMobileView) {
      setShowMenu(!showMenu);
    }
  };

  // For mobile viewing
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const handleUserIconClick = () => {
    if (isMobileView) {
      navigate("/profile");
      closeMobileNav();
    } else {
      toggleMenu();
    }
  };

  // For path navigations
  const navigate = useNavigate();

  const ProfilePageButton = ({ children, onClick }) => (
    <Link to="/profile">
      <button
        className="btn-update-profile"
        onClick={(e) => {
          onClick(e);
          setShowMenu(false);
        }}
      >
        {children}
      </button>
    </Link>
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div>
        <div onClick={handleUserIconClick} className="user-icon-container">
          <FaUserCircle
            className="navbar-user-icon"
            alt="user-icon"
            size={30}
          />
          {isMobileView && <span className="navbar-user">Profil Pengguna</span>}
        </div>
      </div>

      {isMobileView ? null : (
        <Dropdown.Menu
          show={showMenu}
          align="right"
          style={{
            display: showMenu ? "block" : "none",
          }}
        >
          <div className="mini-menu">
            <Dropdown.ItemText>
              <h6>Nama Kakitangan JAD</h6>
            </Dropdown.ItemText>
            <Dropdown.ItemText className="mini-menu-content">
              <p>emelkakitangan@aim.gov.my</p>
            </Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Toggle
              as={ProfilePageButton}
              className="btn-update-profile"
              eventKey="updateProfile"
            >
              Kemaskini Profil
            </Dropdown.Toggle>
          </div>
        </Dropdown.Menu>
      )}
    </div>
  );
};

export default UserIconMenu;
