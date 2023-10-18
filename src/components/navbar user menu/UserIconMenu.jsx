import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import "./UserIconMenu.css";

const UserIconMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
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
      <button className="btnUpdateProfile">{children}</button>
    </Link>
  ));

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767);
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
          }}
          onClick={handleUserIconClick}
          className="user-icon-container"
        >
          <FaUserCircle
            className="userIcon"
            alt="user-icon"
            size={30}
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
            left: "83%",
          }}
        >
          <Dropdown.ItemText className="userMenu">
            <h6>Aina Binti Abdul</h6>
          </Dropdown.ItemText>
          <Dropdown.ItemText className="userMenu userMenuContent">
            <p>ainaabdul@aim.gov.my</p>
          </Dropdown.ItemText>
          <Dropdown.Divider />
          <Dropdown.Toggle
            as={ProfilePageButton}
            className="userMenuLink"
            eventKey="updateProfile"
          >
            Kemaskini Profil
          </Dropdown.Toggle>
        </Dropdown.Menu>
      )}
    </div>
  );
};

export default UserIconMenu;
