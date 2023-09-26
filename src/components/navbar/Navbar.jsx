import { useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

import UserIconMenu from "../showmenu/UserIconMenu";

import "./Navbar.css";
import aimLogo from "../../assets/aim-logo.svg";

function NavBar() {
  const navigate = useNavigate();
  const clickAimLogo = () => navigate("/dashboard");
  // const clickUserIcon = () => navigate("/profile");

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
              <Navbar.Text>
                <UserIconMenu />
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
