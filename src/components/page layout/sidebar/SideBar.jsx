import React, { useState, useEffect } from "react";
import { NavDropdown, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SideBarMenu from "./SideBarMenu";
import SubSideBar from "./SubSideBar";
import "../../../assets/styles/styles_layout.css";

function SideBar({ onNavLinkClick }) {
  // ----------- FE ------------
  // To handle the toggle of the opening and closing of the sidebar
  const [isSideBarOpen, setSideBarOpen] = useState(true);

  const toggleSideBar = () => {
    setSideBarOpen(!isSideBarOpen);
  };

  // To handle the display of the sub-sidebar
  const [isTetapanKriteriaHovered, setIsTetapanKriteriaHovered] =
    useState(false);

  const tetapanKriteriaItem = SideBarMenu.find(
    (item) => item.path === "/kriteriaketidakpatuhan"
  );

  // To check when the screen is equal to or less than 768px
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const checkMobileView = () => {
    setIsMobileView(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  // To handle the dropdown of the sub-sidebar when on mobile
  const [isNavDropdownOpen, setNavDropdownOpen] = useState(false);

  const toggleNavDropdown = () => {
    setNavDropdownOpen(!isNavDropdownOpen);
  };

  // To handle the closing and collapse of the hamburger navbar
  const handleNavLinkClick = () => {
    onNavLinkClick();
  };

  return (
    <div
      className={`sidebar ${isMobileView ? "mobile-hidden" : ""} ${
        isSideBarOpen ? "open" : "closed"
      } ${isMobileView ? "" : "desktop-hover"}`}
      onClick={toggleSideBar}
    >
      <ListGroup variant="flush">
        {SideBarMenu.map((item, index) => (
          <ListGroup.Item
            key={index}
            className={`list-group-item ${
              item.path === "/kriteriaketidakpatuhan" ? "tetapan-kriteria" : ""
            }`}
            onMouseEnter={() => {
              if (
                !isMobileView &&
                item.path === "/kriteriaketidakpatuhan" &&
                isSideBarOpen
              ) {
                setIsTetapanKriteriaHovered(true);
              }
            }}
            onMouseLeave={() => {
              if (
                !isMobileView &&
                item.path === "/kriteriaketidakpatuhan" &&
                isSideBarOpen
              ) {
                setIsTetapanKriteriaHovered(false);
              }
            }}
          >
            <div>
              <div className="tetapan-kriteria-group">
                {item.path === "/kriteriaketidakpatuhan" && isMobileView ? (
                  <NavDropdown
                    title={
                      isSideBarOpen || isMobileView ? (
                        <>
                          <span>{tetapanKriteriaItem.icon}</span>
                          <span>{tetapanKriteriaItem.title}</span>
                        </>
                      ) : (
                        tetapanKriteriaItem.icon
                      )
                    }
                    id="basic-nav-dropdown"
                    show={isNavDropdownOpen}
                    onClick={toggleNavDropdown}
                  >
                    <NavDropdown.Item onClick={handleNavLinkClick}>
                      <SubSideBar />
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <NavLink
                    to={item.path}
                    className="nav-link"
                    onClick={handleNavLinkClick}
                  >
                    {isSideBarOpen || isMobileView ? (
                      <>
                        <span className="icon">{item.icon}</span>
                        <span className="title">{item.title}</span>
                      </>
                    ) : (
                      item.icon
                    )}
                  </NavLink>
                )}
                {item.path === "/kriteriaketidakpatuhan" &&
                  isMobileView &&
                  isSideBarOpen}
              </div>
              {isTetapanKriteriaHovered &&
                item.path === "/kriteriaketidakpatuhan" &&
                !isMobileView &&
                isSideBarOpen && <SubSideBar />}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default SideBar;
