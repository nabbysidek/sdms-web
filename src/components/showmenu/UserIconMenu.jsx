import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import "./UserIconMenu.css";

const UserIconMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const toggleMenu = () => {
    if (!isMobileView) {
      setShowMenu(!showMenu);
    }
  };

  const handleUserIconClick = () => {
    if (isMobileView) {
      navigate("/profile");
    } else {
      toggleMenu(); // Toggle the menu in desktop view
    }
  };

  const ProfilePageButton = React.forwardRef(({ children, onClick }, ref) => (
    <Link to="/profile">
      <button
        className="btn btn-outline-dark"
        style={{
          marginLeft: "10px",
          marginTop: "0",
        }}
      >
        {children}
      </button>
    </Link>
  ));

  const handleLogoutClick = () => {
    window.location.href = "/";
  };

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            // spacing between "profil pengguna" and the other nav-items in the navbar on mobile
            marginTop: "10px",
            marginBottom: "10px",
          }}
          onClick={handleUserIconClick}
          className="user-icon-container"
        >
          <FaUserCircle
            className="user-icon"
            alt="user-icon"
            size={25}
            style={{ marginLeft: "7px" }}
          />
          {isMobileView && (
            <span className="mainNavbar-user" style={{ marginLeft: "10px" }}>
              Profil Pengguna
            </span>
          )}
        </div>
      </div>

      {isMobileView ? null : (
        <Dropdown.Menu
          show={showMenu}
          align="right"
          className="user-click-display"
          style={{
            display: showMenu ? "block" : "none",
            position: "absolute",
            top: "80%",
            left: "87%",
            maxWidth: "150px",
          }}
        >
          <Dropdown.ItemText>
            <h6>Aina Binti Abdul</h6>
          </Dropdown.ItemText>
          <Dropdown.ItemText
            style={{
              color: "darkgray",
              paddingTop: "0",
              paddingBottom: "0",
            }}
          >
            <p>ainaabdul@aim.gov.my</p>
          </Dropdown.ItemText>
          <Dropdown.Toggle as={ProfilePageButton} eventKey="updateProfile">
            Kemaskini Profil
          </Dropdown.Toggle>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogoutClick}>Log Keluar</Dropdown.Item>
        </Dropdown.Menu>
      )}
    </div>
  );
};

export default UserIconMenu;
