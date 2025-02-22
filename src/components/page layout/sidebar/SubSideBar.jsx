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
          <NavLink to="/students" className="sub-nav-link">
            Students
          </NavLink>
        </li>
        <li>
          <NavLink to="/misdemeanor-category" className="sub-nav-link">
            Misdemeanor Category
          </NavLink>
        </li>
        <li>
          <NavLink to="/misdemeanor" className="sub-nav-link">
            Misdemeanor
          </NavLink>
        </li>

        <li>
          <NavLink to="/year" className="sub-nav-link">
            Years
          </NavLink>
        </li>
        <li>
          <NavLink to="/class" className="sub-nav-link">
            Classes
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
          <NavLink to="/students" className="sub-nav-link">
            Students
          </NavLink>
        </li>

        <li>
          <NavLink to="/misdemeanor-category" className="sub-nav-link">
            Misdemeanor Category
          </NavLink>
        </li>
        <li>
          <NavLink to="/misdemeanor" className="sub-nav-link">
            Misdemeanor
          </NavLink>
        </li>

        <li>
          <NavLink to="/year" className="sub-nav-link">
            Years
          </NavLink>
        </li>
        <li>
          <NavLink to="/class" className="sub-nav-link">
            Classes
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SubSideBar;
