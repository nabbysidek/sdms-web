import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import SideBarMenu from "./SideBarMenu";
import ListGroup from "react-bootstrap/ListGroup";
import SubSideBar from "./SubSideBar";
import "./SideBar.css";

function SideBar() {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="sidebar">
      <ListGroup variant="flush">
        {SideBarMenu.map((item, index) => (
          <ListGroup.Item
            key={index}
            className={`list-group-item ${
              item.path === "/tambahkriteria" ? "tetapan-kriteria" : ""
            }`}
            onMouseEnter={() => setHoveredItem(item.path)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavLink to={item.path} className="nav-link">
              {item.icon} {item.title}
              {item.path === "/tambahkriteria" &&
                hoveredItem === "/tambahkriteria" && <SubSideBar />}
            </NavLink>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default SideBar;
