import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Container, Nav, Navbar, Image } from "react-bootstrap";
import SideBar from "../sidebar/SideBar";
import UserIconMenu from "../navbar user menu/UserIconMenu";
import aimLogo from "../../assets/aim-logo.svg";
import "./Navbar.css";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
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
    setIsMobile(window.innerWidth <= 767);
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
        className="mainNavbar"
        expanded={mobileNavExpanded}
      >
        <Container className="mainNavbarContainer">
          <Navbar.Brand onClick={clickAimLogo}>
            <Image
              src={aimLogo}
              alt="logo-aim"
              height="50"
              className="d-inline-block align-top aimLogo"
            />
            {""}
            <h5 className="titleAim">Jabatan Audit Dalaman</h5>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleMobileNavToggle}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end custom-collapse"
            onSelect={handleNavLinkClick} // Close mobile nav on nav link click
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
