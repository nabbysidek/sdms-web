import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Container, Nav, Navbar } from "react-bootstrap";
import SideBar from "../sidebar/SideBar";
import UserIconMenu from "./UserIconMenu";
import "../../../assets/styles/styles_layout.css";

function NavBar() {
  // State to determine if the viewport is mobile-sized
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // State to manage mobile navigation menu expansion
  const [mobileNavExpanded, setMobileNavExpanded] = useState(false);

  /**
   * Toggles the mobile navigation menu open/close state.
   */
  const handleMobileNavToggle = () => {
    setMobileNavExpanded((prev) => !prev);
  };

  /**
   * Closes the mobile navigation menu after a navigation link is clicked.
   */
  const handleNavLinkClick = () => {
    setMobileNavExpanded(false);
  };

  /**
   * Updates `isMobile` state when the window is resized.
   */
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  return (
    <Navbar
      variant="dark"
      expand="lg"
      className="main-navbar"
      expanded={mobileNavExpanded}
    >
      <Container fluid>
        {/* Logo that redirects to the dashboard */}
        <Link to="/dashboard" className="navbar-title">
          SDMS
        </Link>

        {/* Mobile navigation toggle button */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleMobileNavToggle}
        />

        {/* Collapsible navigation menu */}
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end custom-collapse"
          onSelect={handleNavLinkClick}
        >
          <Nav>
            <Navbar.Text className="hamburger-nav">
              {/* User icon dropdown menu */}
              <UserIconMenu closeMobileNav={handleMobileNavToggle} />

              {/* Sidebar for mobile navigation */}
              {isMobile && (
                <SideBar isMobile={isMobile} onNavLinkClick={handleNavLinkClick} />
              )}
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
