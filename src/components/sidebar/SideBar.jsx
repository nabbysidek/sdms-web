// SideBar.js
import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaSortDown } from "react-icons/fa";
import SideBarMenu from "./SideBarMenu";
import ListGroup from "react-bootstrap/ListGroup";
import SubSideBar from "./SubSideBar";

import "./SideBar.css";

function SideBar({ onNavLinkClick }) {
  const [isSideBarOpen, setSideBarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
  const [isTetapanKriteriaHovered, setIsTetapanKriteriaHovered] =
    useState(false);
  const [isNavDropdownOpen, setNavDropdownOpen] = useState(false);

  const tetapanKriteriaItem = SideBarMenu.find(
    (item) => item.path === "/kriteriaketidakpatuhan"
  );

  const toggleSideBar = () => {
    setSideBarOpen(!isSideBarOpen);
  };

  const checkMobileView = () => {
    setIsMobileView(window.innerWidth <= 767);
  };

  useEffect(() => {
    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  const toggleNavDropdown = () => {
    setNavDropdownOpen(!isNavDropdownOpen);
  };

  const handleNavLinkClick = () => {
    onNavLinkClick(); // Close mobile navbar
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
            <div className="list-item-content">
              <div className="tetapan-kriteria-group">
                {item.path === "/kriteriaketidakpatuhan" && isMobileView ? (
                  <NavDropdown
                    title={
                      isSideBarOpen || isMobileView ? (
                        <>
                          <span className="icon">
                            {tetapanKriteriaItem.icon}
                          </span>
                          <span className="title">
                            {tetapanKriteriaItem.title}
                          </span>
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
