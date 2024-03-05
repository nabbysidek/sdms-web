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
          <NavLink to="/skopsemakan" className="sub-nav-link">
            Skop Semakan
          </NavLink>
        </li>
        <li>
          <NavLink to="/skopkriteria" className="sub-nav-link">
            Skop Kriteria Ketidakpatuhan
          </NavLink>
        </li>
        <li>
          <NavLink to="/kriteriaketidakpatuhan" className="sub-nav-link">
            Kesalahan Kriteria Ketidakpatuhan
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
    );
  }

  // For larger screens
  return (
    <div className="sub-sidebar">
      <ul>
        <li>
          <NavLink to="/skopsemakan" className="sub-nav-link">
            Skop Semakan
          </NavLink>
        </li>
        <li>
          <NavLink to="/skopkriteria" className="sub-nav-link">
            Skop Kriteria Ketidakpatuhan
          </NavLink>
        </li>
        <li>
          <NavLink to="/kriteriaketidakpatuhan" className="sub-nav-link">
            Kesalahan Kriteria Ketidakpatuhan
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
