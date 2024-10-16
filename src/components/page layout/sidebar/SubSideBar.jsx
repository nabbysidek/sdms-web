import { NavLink } from "react-router-dom";
import "../../../assets/styles/styles_layout.css";

function SubSideBar() {
  // ------------- FE -----------------
  //  Handle sub-sidebar behaviour when on mobile screen
  const isMobile = window.innerWidth <= 768; // Set your mobile breakpoint

  if (isMobile) {
    return (
      <ul className="mobile-nav-links">
        <li>
          <NavLink to="/kakitangan" className="sub-nav-link">
            Audited Staff
          </NavLink>
        </li>
        <li>
          <NavLink to="/jenisaudit" className="sub-nav-link">
            Types of Audit
          </NavLink>
        </li>
        <li>
          <NavLink to="/skopsemakan" className="sub-nav-link">
            Review Scopes
          </NavLink>
        </li>
        <li>
          <NavLink to="/skopkriteria" className="sub-nav-link">
            Noncompliance Scopes
          </NavLink>
        </li>
        <li>
          <NavLink to="/aktivitisemakan" className="sub-nav-link">
            Activity Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="/kriteriaketidakpatuhan" className="sub-nav-link">
            Noncompliances
          </NavLink>
        </li>
        <li>
          <NavLink to="/wilayah" className="sub-nav-link">
            States
          </NavLink>
        </li>
        <li>
          <NavLink to="/cawangan" className="sub-nav-link">
            Branches
          </NavLink>
        </li>
        <li>
          <NavLink to="/bahagian" className="sub-nav-link">
            Divisions
          </NavLink>
        </li>
        <li>
          <NavLink to="/jabatan" className="sub-nav-link">
            Departments
          </NavLink>
        </li>
        <li>
          <NavLink to="/unit" className="sub-nav-link">
            Units
          </NavLink>
        </li>
      </ul>
    );
  }

  // For desktop viewport
  return (
    <div className="sub-sidebar">
      <ul>
        <li>
          <NavLink to="/kakitangan" className="sub-nav-link">
            Audited Staff
          </NavLink>
        </li>
        <li>
          <NavLink to="/jenisaudit" className="sub-nav-link">
            Types of Audit
          </NavLink>
        </li>
        <li>
          <NavLink to="/skopsemakan" className="sub-nav-link">
            Review Scopes
          </NavLink>
        </li>
        <li>
          <NavLink to="/skopkriteria" className="sub-nav-link">
            Noncompliance Scopes
          </NavLink>
        </li>
        <li>
          <NavLink to="/aktivitisemakan" className="sub-nav-link">
            Activity Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="/kriteriaketidakpatuhan" className="sub-nav-link">
            Noncompliances
          </NavLink>
        </li>
        <li>
          <NavLink to="/wilayah" className="sub-nav-link">
            States
          </NavLink>
        </li>
        <li>
          <NavLink to="/cawangan" className="sub-nav-link">
            Branches
          </NavLink>
        </li>
        <li>
          <NavLink to="/bahagian" className="sub-nav-link">
            Divisions
          </NavLink>
        </li>
        <li>
          <NavLink to="/jabatan" className="sub-nav-link">
            Departments
          </NavLink>
        </li>
        <li>
          <NavLink to="/unit" className="sub-nav-link">
            Units
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SubSideBar;
