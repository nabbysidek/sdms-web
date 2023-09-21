import { useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { FaUser } from "react-icons/fa";

import "./Navbar.css";
import aimLogo from "../../assets/aim-logo.svg";

function NavBar() {
  const navigate = useNavigate();
  const clickAimLogo = () => navigate("/dashboard");
  const clickUserIcon = () => navigate("/profile");

  return (
    <>
      <Navbar bg="light shadow" expand="lg">
        <Container>
          <Navbar.Brand onClick={clickAimLogo}>
            <Image
              src={aimLogo}
              alt="logo-aim"
              height="50"
              className="d-inline-block align-top"
            />
            {""}
            <h3 className="titleAim">JABATAN AUDIT DALAMAN</h3>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text onClick={clickUserIcon}>
              <FaUser className="user-icon" size={20} />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
