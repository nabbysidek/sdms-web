import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./navbar/Navbar";
import SideBar from "./sidebar/SideBar";
import "../../assets/styles/styles_layout.css";

function Layout() {
  // --------- FE ------------------
  // Set the page layout for mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const checkMobileView = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    // Listener to check for viewport changes
    window.addEventListener("resize", checkMobileView);

    // Clean up after the listener
    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  return (
    <>
      <NavBar />

      <div className="main">
        {!isMobile && <SideBar />}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
