import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Container, Nav, Navbar, Image } from "react-bootstrap";
import SideBar from "../sidebar/SideBar";
import UserIconMenu from "./UserIconMenu";
import aimLogo from "../../../assets/images/aim-logo.svg";
import "../../../assets/styles/styles_layout.css";

function NavBar() {
  // ---------- FE -----------
  // Path navigations
  const navigate = useNavigate();

  const clickAimLogo = () => {
    navigate("/dashboard");
    if (isMobile) {
      setMobileNavExpanded(false);
    }
  };

  // For mobile viewing
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileNavExpanded, setMobileNavExpanded] = useState(false);

  const handleMobileNavToggle = () => {
    setMobileNavExpanded(!mobileNavExpanded);
  };

  const handleNavLinkClick = () => {
    if (isMobile) {
      setMobileNavExpanded(false);
    }
  };

  const checkMobileView = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  return (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        className="main-navbar"
        expanded={mobileNavExpanded}
      >
        <Container fluid>
          <Link to="/dashboard" className="navbar-title">
            auditee
          </Link>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleMobileNavToggle}
          />
          {/* Handle navbar collapse on mobile viewport */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end custom-collapse"
            onSelect={handleNavLinkClick}
          >
            <Nav>
              <Navbar.Text className="hamburger-nav">
                <UserIconMenu closeMobileNav={handleMobileNavToggle} />
                {isMobile && (
                  <Navbar.Text>
                    <SideBar
                      isMobile={isMobile}
                      onNavLinkClick={handleNavLinkClick}
                    />
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
