import React from "react";
import { NavLink } from "react-router-dom";

import "./SubSideBar.css";

function SubSideBar() {
  return (
    <div className="sub-sidebar">
      <ul>
        <li>
          <NavLink to="/kriteriaketidakpatuhan" className="sub-nav-link">
            Kriteria Ketidakpatuhan
          </NavLink>
        </li>
        <li>
          <NavLink to="/skopkriteria" className="sub-nav-link">
            Skop Kriteria
          </NavLink>
        </li>
        <li>
          <NavLink to="/skopsemakan" className="sub-nav-link">
            Skop Semakan
          </NavLink>
        </li>
        <li>
          <NavLink to="/jenisaudit" className="sub-nav-link">
            Jenis Audit
          </NavLink>
        </li>
        <li>
          <NavLink to="/kakitangan" className="sub-nav-link">
            Kakitangan
          </NavLink>
        </li>
        <li>
          <NavLink to="/wilayah" className="sub-nav-link">
            Wilayah
          </NavLink>
        </li>
        <li>
          <NavLink to="/cawangan" className="sub-nav-link">
            Cawangan
          </NavLink>
        </li>
        <li>
          <NavLink to="/bahagian" className="sub-nav-link">
            Bahagian
          </NavLink>
        </li>
        <li>
          <NavLink to="/jabatan" className="sub-nav-link">
            Jabatan
          </NavLink>
        </li>
        <li>
          <NavLink to="/unit" className="sub-nav-link">
            Unit
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SubSideBar;
