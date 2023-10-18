import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SideBarMenu from "./SideBarMenu";
import ListGroup from "react-bootstrap/ListGroup";
import SubSideBar from "./SubSideBar";
import { FaSortDown } from "react-icons/fa";
import "./SideBar.css";

function SideBar({ isMobile }) {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
  const [isTetapanKriteriaHovered, setIsTetapanKriteriaHovered] =
    useState(false);

  // To minimize and expand sidebar
  const toggleSideBar = () => {
    setSideBarOpen(!isSideBarOpen);
  };

  // Function to check for mobile viewport
  const checkMobileView = () => {
    setIsMobileView(window.innerWidth <= 767);
  };

  useEffect(() => {
    // Add event listener to check for viewport changes
    window.addEventListener("resize", checkMobileView);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []); // Empty dependency array to run this effect only once

  return (
    <div
      className={`sidebar ${isMobileView ? "mobile-hidden" : ""} ${
        isSideBarOpen ? "open" : "closed"
      } ${isMobileView ? "" : "desktop-hover"}`}
      onClick={toggleSideBar} // Toggle sidebar when clicked
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
                <NavLink to={item.path} className="nav-link">
                  {isSideBarOpen || isMobile ? (
                    <>
                      <span className="icon">{item.icon}</span>
                      <span className="title">{item.title}</span>
                    </>
                  ) : (
                    item.icon
                  )}
                </NavLink>
                {item.path === "/kriteriaketidakpatuhan" &&
                  isMobileView &&
                  isSideBarOpen && (
                    <span className="dropdown-arrow">
                      <FaSortDown size={15} style={{ marginTop: "-5px" }} />
                    </span>
                  )}
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
