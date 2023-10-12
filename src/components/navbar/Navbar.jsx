import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

import SideBar from "../sidebar/SideBar";
import UserIconMenu from "../showmenu/UserIconMenu";

import "./Navbar.css";
import aimLogo from "../../assets/aim-logo.svg";

function NavBar() {
  const navigate = useNavigate();
  const clickAimLogo = () => navigate("/dashboard");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  // To check when the viewport is in mobile view
  const checkMobileView = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  useEffect(() => {
    // Listener to check for viewport changes
    window.addEventListener("resize", checkMobileView);

    // Clean up after the listener
    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  // Function to toggle the SubSideBar visibility
  const toggleSubSideBar = () => {
    setSubSideBarVisible(!subSideBarVisible);
  };

  return (
    <>
      <Navbar variant="dark" expand="lg" className="mainNavbar">
        <Container className="mainNavbarContainer">
          <Navbar.Brand onClick={clickAimLogo}>
            <Image
              src={aimLogo}
              alt="logo-aim"
              height="50"
              className="d-inline-block align-top"
            />
            {""}
            <h5 className="titleAim">Jabatan Audit Dalaman</h5>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end custom-collapse"
          >
            <Nav>
              <Navbar.Text className="hamburger-nav">
                <UserIconMenu />
                {/* Render the Sidebar component only on mobile view */}
                {isMobile && (
                  <Navbar.Text>
                    <SideBar isMobile={isMobile} />
                  </Navbar.Text>
                )}
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
